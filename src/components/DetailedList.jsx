import React, { useEffect, useState } from "react";
import { getData } from "../utils/axios";
import { useResponsiveScreen } from "../utils/Responsive";

const DetailedList = ({ url }) => {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [totalPage, setTotalPage] = useState("");

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

  useEffect(() => {
    getData({
      url: url,
    })
      .then((res) => {
        setFilms(res.data.items);
        setCurrentPage(res.data.paginate.current_page);
        setTotalPage(res.data.paginate.total_page);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <>
      <div className={`grid ${gridColsClass} grid-flow-row gap-4`}>
        {films.map((item) => {
          return (
            <>
              <div>
                <div className="w-full h-full">
                  <img className="w-full h-full" src={item.thumb_url} alt="" />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default DetailedList;
