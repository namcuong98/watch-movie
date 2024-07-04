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
      console.log("first");
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
      <div>
        <div className={`grid ${gridColsClass} grid-flow-row gap-4`}>
          {films.items &&
            films.items.map((item) => {
              return (
                <>
                  <div
                    onClick={() => handleClick(item.slug)}
                    className="cursor-pointer"
                  >
                    <div className="w-full h-full">
                      <img
                        className="w-full h-full"
                        src={item.thumb_url}
                        alt=""
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="flex items-center justify-center mt-14">
          <Paginate
            pagination={films.paginate}
            setPaginate={setPage}
            paginate={page}
          />
        </div>
      </div>
    </>
  );
};

export default DetailedList;
