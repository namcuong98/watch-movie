import React, { useEffect, useState } from "react";
import { getData, saveFilm } from "../utils/axios";
import { useResponsiveScreen } from "../utils/Responsive";
import { Link } from "react-router-dom";
import Paginate from "./Paginate";

const DetailedList = ({ defaultPage }) => {
  const [films, setFilms] = useState([]);
  const urlNotPage = defaultPage.substring(0, defaultPage.length - 1);
  const [page, setPage] = useState(1);

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
  };

  useEffect(() => {
    getData({
      url: `${urlNotPage}${page}`,
    })
      .then((res) => {
        setFilms(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [page, urlNotPage]);

  return (
    <>
      <div>
        <div className={`grid ${gridColsClass} grid-flow-row gap-4`}>
          {films.items &&
            films.items.map((item) => {
              return (
                <>
                  <Link to={`${item.slug}`}>
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
                  </Link>
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
