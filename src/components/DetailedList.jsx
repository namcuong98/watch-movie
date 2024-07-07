import React, { useEffect, useState } from "react";
import {
  getData,
  saveFilm,
  saveWordSearch,
  takeWordSearch,
} from "../utils/axios";
import { useResponsiveScreen } from "../utils/Responsive";
import { useNavigate } from "react-router-dom";
import Paginate from "./Paginate";

const DetailedList = ({ defaultPage }) => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { isDesktop, isTablet, isMobile, isSmallMobile } =
    useResponsiveScreen();

  const getGridColsClass = () => {
    if (isDesktop) {
      return `grid-cols-4`;
    } else if (isTablet || isMobile) {
      return `grid-cols-3`;
    } else if (isSmallMobile) {
      return `grid-cols-2`;
    }
    return `grid-cols-1`;
  };
  const gridColsClass = getGridColsClass();

  const handleClick = (item) => {
    saveFilm(item);
    if (takeWordSearch) {
      navigate(`/new-movies/${item}`);
      saveWordSearch(null);
    } else {
      navigate(`${item}`);
    }
  };

  useEffect(() => {
    getData({
      url: `${defaultPage}${page}`,
    })
      .then((res) => {
        setFilms(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [page, defaultPage]);

  return (
    <>
      <div className="mt-12">
        <div className="my-[100px] min-h-[900px]">
          <div className={`grid ${gridColsClass} grid-flow-row gap-4 `}>
            {films.items &&
              films.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" mt-[10px] mb-10 w-full cursor-pointer "
                    onClick={() => handleClick(item.slug)}
                  >
                    <div className="w-full h-[300px] relative rounded-tr-md rounded-tl-md overflow-hidden wrap-img">
                      <p className="absolute text-xs rounded-sm top-0 right-0 bg-[#f2bf83] text-[#333] font-bold p-1 z-10">
                        Chỉ có trên IQTV
                      </p>
                      <div className="mb-3 ">
                        <div className="relative img_play top_up">
                          <img
                            title={item.name}
                            className="w-full h-[300px] object-cover "
                            src={item.thumb_url}
                            alt="Loading"
                          />
                          <div className="w-full h-full absolute top-0 left-0 hidden z-30">
                            <i className="fa-solid fa-play play"></i>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="absolute bottom-[20px] left-[6px] text-[#fff] z-10 flex items-center gap-2">
                            <i className="fa-solid fa-star"></i>
                            <p>{(8 + Math.random() * 2).toFixed(1)}</p>
                          </div>
                          <div className="absolute bottom-[20px] right-[6px] rounded-sm p-1 text-xs font-bold bg-[#e66f20] z-10 flex items-center gap-2">
                            <p className="">{item.current_episode}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <span>
                          Tên phim:
                          <span className="text-base text-[#cbcbcc] ml-2">
                            {item.name}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {films.paginate && films.paginate.total_page === 1 ? null : (
          <div className="flex items-center justify-center mt-14">
            <Paginate
              pagination={films.paginate}
              setPaginate={setPage}
              paginate={page}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailedList;
