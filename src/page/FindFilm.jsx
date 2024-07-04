import React, { useEffect, useState } from "react";
import { getData, saveFilm } from "../utils/axios";
import { useResponsiveScreen } from "../utils/Responsive";
import { useNavigate } from "react-router-dom";
import Paginate from "../components/Paginate";
import NotFound from "../components/NotFound";

const FindFilm = () => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const word = sessionStorage.getItem("wordSearch");

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
    navigate(`/new-movies/${item}`);
  };

  useEffect(() => {
    const fetchDataFind = () => {
      const urlFindFilm = sessionStorage.getItem("wordSearch");
      getData({
        url: `search?keyword=${urlFindFilm}`,
      })
        .then((res) => {
          setFilms(res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    fetchDataFind();
  }, [page, word]);

  return (
    <>
      <div>
        {films.items && films.items.length === 0 ? (
          <NotFound />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default FindFilm;
