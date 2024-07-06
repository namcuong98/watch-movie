import React, { useEffect, useState } from "react";
import { getData, getDataFilmDetail, saveFilm } from "../utils/axios";
import Paginate from "./Paginate";
import { useNavigate } from "react-router-dom";
import { useResponsivenessOverall } from "../utils/Responsive";
import SuggestFilms from "./SuggestFilms";

const WatchMovie = () => {
  const [episodes, setEpisodes] = useState([]);
  const [infoFilm, setInfoFilm] = useState({});
  const [suggestFims, setSuggestFilms] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const navigate = useNavigate();
  const { rpsBannerInfoLogo } = useResponsivenessOverall();

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
        <div
          className="flex w-full justify-center p-[80px]"
          style={{ padding: rpsBannerInfoLogo ? "80px" : "0" }}
        >
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
                    <div className="bg-[#1a1c22] absolute right-[-180px] h-full overflow-y-auto">
                      <div className="w-[180px]">
                        <div className="px-3">
                          <p className="py-3 text-base font-bold">
                            {infoFilm.name}
                          </p>
                          <div className="max-w-[170px] flex items-center gap-2 pb-2">
                            <div className="max-w-[100px] rounded overflow-hidden">
                              <img src={infoFilm.poster_url} alt="" />
                            </div>
                            <p className="text-[#1cc749]">
                              Tập: {currentEpisode}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 flex flex-col gap-2">
                        <p>Phim đề xuất</p>
                        {suggestFims.map((film) => {
                          return (
                            <>
                              <div>
                                <div
                                  onClick={() => changeFilm(film.slug)}
                                  className="w-[150px] h-[150px] cursor-pointer rounded overflow-hidden"
                                >
                                  <img
                                    title={film.name}
                                    className="w-[150px] h-[150px]"
                                    src={film.poster_url}
                                    alt=""
                                  />
                                </div>
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
              <p className="text_big">Tập: {currentEpisode}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Paginate
            pagination={infoFilm.total_episodes}
            paginate={currentEpisode}
            setPaginate={setCurrentEpisode}
          />
        </div>
        {!rpsBannerInfoLogo && <SuggestFilms films={suggestFims} />}
      </div>
    </>
  );
};

export default WatchMovie;
