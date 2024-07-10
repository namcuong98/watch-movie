import React, { useEffect, useState } from "react";
import Paginate from "../../components/Paginate";
import { useNavigate } from "react-router-dom";
import { useResponsiveScreen } from "../../utils/Responsive";
import { getData, saveFilm } from "../../utils/axios";
import { ListCategory } from "../../components/HardData";

const Category = () => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  // Lấy ra url hiện tại

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

  const takeCategory = sessionStorage.getItem("category");

  const nameCategory = ListCategory.filter(
    (category) => category.item === takeCategory
  );

  console.log(nameCategory[0].name);

  const handleClick = (item) => {
    saveFilm(item);
    navigate(`${item}`);
  };

  useEffect(() => {
    const fetchData = () => {
      const takeCategory = sessionStorage.getItem("category");
      console.log(takeCategory);
      getData({
        url: `the-loai/${takeCategory}?page=${page}`,
      })
        .then((res) => {
          setFilms(res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    fetchData();
  }, [page, currentPath]);

  return (
    <>
      <div className="mt-12">
        <div className="top-[50px] ">
          <div className="flex text_small mt-5 p-8">
            <p>Thể loại: </p>
            <span className="ml-2">Phim {nameCategory[0].name}</span>
          </div>
        </div>
        <div className=" min-h-[900px]">
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
                      <div>
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
                    <div className="mb-3">
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

export default Category;
