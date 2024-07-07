import React, { useEffect, useState } from "react";
import { getData, getDataFilmDetail, saveFilm } from "../utils/axios";
import Paginate from "./Paginate";
import { useNavigate } from "react-router-dom";
import { useResponsivenessOverall } from "../utils/Responsive";
import SuggestFilms from "./SuggestFilms";
import { useMediaQuery } from "react-responsive";

const WatchMovie = () => {
  const [episodes, setEpisodes] = useState([]);
  const [infoFilm, setInfoFilm] = useState({});
  const [suggestFims, setSuggestFilms] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const navigate = useNavigate();
  const { rpsBannerInfoLogo } = useResponsivenessOverall();
  const rpsIs1400 = useMediaQuery({ minWidth: 1400 });
  const rpsIs1300 = useMediaQuery({ minWidth: 1300 });
  const rpsIs1200 = useMediaQuery({ minWidth: 1200 });
  const rpsIs1100 = useMediaQuery({ minWidth: 1100 });

  const getGridColsClass = () => {
    if (rpsIs1400) {
      return `p-[200px]`;
    } else if (rpsIs1300) {
      return `p-[100px]`;
    } else if (rpsIs1200) {
      return `p-[50px]`;
    } else if (rpsIs1100) {
      return `p-[20px]`;
    }
  };
  const gridColsClass = getGridColsClass();

  const changeFilm = (film) => {
    saveFilm(film);
    navigate(`/now-showing/${film}`);
  };

  useEffect(() => {
    const fetchEpisodes = () => {
      const takeFilm = sessionStorage.getItem("infoFilm");

      getDataFilmDetail({
        url: takeFilm,
      })
        .then((res) => {
          setEpisodes(res.data.movie.episodes[0].items);
          setInfoFilm(res.data.movie);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchEpisodes();
  }, []);

  useEffect(() => {
    getData({
      url: "phim-moi-cap-nhat?page=1",
    })
      .then((res) => {
        setSuggestFilms(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="mt-12">
        <div className={`flex w-full ${gridColsClass} justify-center`}>
          <div className="w-full">
            {episodes[currentEpisode - 1] &&
              episodes[currentEpisode - 1].embed && (
                <div
                  className=" bg-black relative pb-[56.25%]"
                  style={{ width: rpsBannerInfoLogo ? "80%" : "100%" }}
                >
                  <iframe
                    src={episodes[currentEpisode - 1].embed}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen=""
                    title="WatchMovie"
                  ></iframe>
                  {rpsBannerInfoLogo && (
                    <div
                      className="bg-[#1a1c22] absolute right-[-230px] h-full your-container"
                      style={{ overflowY: "scroll" }}
                    >
                      <div className="w-[213px]">
                        <div className="px-3">
                          <p className="py-3 text-base font-bold">
                            {infoFilm.name}
                          </p>
                          <div className="max-w-[200px]  flex items-center gap-2 pb-2">
                            <div className="max-w-[100px] max-h-[100px] rounded overflow-hidden">
                              <img src={infoFilm.poster_url} alt="" />
                            </div>

                            {infoFilm.total_episodes > 1 ? (
                              <p className="text-[#1cc749]">
                                Tập: {currentEpisode}
                              </p>
                            ) : (
                              <p className="text-[#1cc749] text-xs">
                                {infoFilm.current_episode} {infoFilm.quality}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className=" flex flex-col ">
                        <p className="p-2">Phim đề xuất</p>
                        {suggestFims.map((film) => {
                          return (
                            <>
                              <div
                                onClick={() => changeFilm(film.slug)}
                                className="w-[213px] cursor-pointer flex items-center text-xs py-2 px-3 hover:bg-[#23252b] hover:text-[#1cc749]"
                              >
                                <div className="w-[100px] max-h-[60px] rounded overflow-hidden">
                                  <img
                                    title={film.name}
                                    className="w-[100px]"
                                    src={film.poster_url}
                                    alt=""
                                  />
                                </div>
                                <p className="w-[113px] pl-2">{film.name}</p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            <div>
              <p className="pt-10 text_title">{infoFilm.name}</p>
              {infoFilm.total_episodes > 1 ? (
                <p className="text_big">Tập: {currentEpisode}</p>
              ) : (
                <p className="text_big">
                  {infoFilm.current_episode} {infoFilm.quality}
                </p>
              )}
            </div>
          </div>
        </div>
        {infoFilm.total_episodes > 1 && (
          <div className="flex justify-center">
            <Paginate
              pagination={infoFilm.total_episodes}
              paginate={currentEpisode}
              setPaginate={setCurrentEpisode}
            />
          </div>
        )}
        {!rpsBannerInfoLogo && <SuggestFilms films={suggestFims} />}
      </div>
    </>
  );
};

export default WatchMovie;
