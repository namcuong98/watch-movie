import React, { useEffect, useState } from "react";
import NotFound from "../../components/NotFound";
import { getDataFilmDetail, saveFilm } from "../../utils/axios";
import { useResponsiveScreen } from "../../utils/Responsive";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const [favouriteFilms, setFavouriteFilms] = useState();
  const [loading, setLoading] = useState(true);
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

  const watchMovie = (film) => {
    saveFilm(film);
    navigate(`${film}`);
  };

  useEffect(() => {
    const getFavouritesArray = JSON.parse(
      localStorage.getItem("favouritesArray")
    );
    if (getFavouritesArray && getFavouritesArray.length > 0) {
      const fetchFavourites = async () => {
        try {
          const results = await Promise.all(
            getFavouritesArray.map((item) => {
              return getDataFilmDetail({ url: `${item.film}` });
            })
          );
          setFavouriteFilms(results.map((res) => res.data.movie));
        } catch (error) {
          console.error("Error fetching favourite films", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFavourites();
    } else {
      setFavouriteFilms([]);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="mt-12">Loading...</div>;
  }

  return (
    <div className="mt-12">
      {favouriteFilms.length === 0 ? (
        <NotFound />
      ) : (
        <div className={`grid ${gridColsClass} grid-flow-row gap-4`}>
          {favouriteFilms.map((item, index) => {
            return (
              <div
                key={index}
                className=" mt-[10px] mb-10 w-full cursor-pointer "
                onClick={() => watchMovie(item.slug)}
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
      )}
    </div>
  );
};

export default Favourites;
