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
          {favouriteFilms.map((film, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={() => watchMovie(film.slug)}
                  className="cursor-pointer"
                >
                  <div className="w-full h-full">
                    <img
                      className="w-full h-full"
                      src={film.thumb_url}
                      alt=""
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favourites;
