import React, { useEffect, useState } from "react";
import { getDataFilmDetail } from "../utils/axios";
import Paginate from "./Paginate";

const WatchMovie = () => {
  const [episodes, setEpisodes] = useState([]);
  const [totalEpisodes, setTotalEpisodes] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);

  useEffect(() => {
    const fetchEpisodes = () => {
      const takeFilm = sessionStorage.getItem("infoFilm");

      getDataFilmDetail({
        url: takeFilm,
      })
        .then((res) => {
          console.log(res.data.movie.episodes[0].items);
          setEpisodes(res.data.movie.episodes[0].items);
          setTotalEpisodes(res.data.movie.episodes[0].items.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchEpisodes();
  }, []);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className=" flex items-center justify-center flex-col gap-16">
          {episodes[currentEpisode - 1] &&
            episodes[currentEpisode - 1].embed && (
              <iframe
                src={`${episodes[currentEpisode - 1].embed}`}
                width="800"
                height="450"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="WatchMovie"
              ></iframe>
            )}
          <Paginate
            pagination={totalEpisodes}
            paginate={currentEpisode}
            setPaginate={setCurrentEpisode}
          />
        </div>
        <div className="bg-slate-300">Phim đề xuất</div>
      </div>
    </>
  );
};

export default WatchMovie;
