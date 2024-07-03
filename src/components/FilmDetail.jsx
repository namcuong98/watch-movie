import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataFilmDetail } from "../utils/axios";

const FilmDetail = () => {
  const navigate = useNavigate();
  const [filmDetail, setFilmDetail] = useState([]);

  const handleClick = () => {
    navigate("xem-phim");
  };

  let infoSeries = false;
  if (filmDetail.time) {
    const result = filmDetail.time.includes("Tập");
    infoSeries = result;
  }

  useEffect(() => {
    const fetchFilmDetail = () => {
      const takeFilm = sessionStorage.getItem("infoFilm");

      getDataFilmDetail({
        url: takeFilm,
      })
        .then((res) => {
          setFilmDetail(res.data.movie);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchFilmDetail();
  }, []);

  return (
    <>
      <div>
        <div className="relative z-10 h-full">
          <div className="w-[500px] h-[450px] flex flex-col gap-2 justify-center text-[16px] ml-8">
            <h1 className="text-3xl font-bold mb-2">{filmDetail.name}</h1>
            <ul className="flex gap-2">
              {filmDetail.category &&
              filmDetail.category[2] &&
              filmDetail.category[2].list ? (
                filmDetail.category[2].list.map((item, index) => (
                  <li key={index} className="bg-[#ffffff14] p-1">
                    {item.name}
                  </li>
                ))
              ) : (
                <li>Loading...</li>
              )}
            </ul>
            <div className="text-[#a9a9ac] flex gap-1">
              <span>{filmDetail.quality}</span>
              <span>|</span>
              <span>{filmDetail.language}</span>
              <span>|</span>
              <span>{filmDetail.time}</span>
            </div>
            {infoSeries && (
              <div className="text-[#a9a9ac] flex gap-1">
                <span>
                  Danh sách:
                  {` ${filmDetail.current_episode}/${filmDetail.total_episodes}`}
                </span>
              </div>
            )}
            <div>
              <span className="text-[#a9a9ac]">Đạo diễn: </span>
              <span>
                {filmDetail.director !== null
                  ? filmDetail.director
                  : "Đang cập nhật"}
              </span>
            </div>
            <div>
              <span className="text-[#a9a9ac]">Diễn viên chính: </span>
              <span>
                {filmDetail.casts !== null ? filmDetail.casts : "Đang cập nhật"}
              </span>
            </div>
            <div>
              <span className="text-[#a9a9ac]">Miêu tả: </span>
              <span className="line-clamp-2 ">
                {filmDetail.description !== null
                  ? filmDetail.description
                  : "Đang cập nhật"}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleClick}
                className="m-3 font-bold bg-[#1cc749] cursor-pointer py-2 px-4 rounded flex gap-2 items-center justify-center hover:bg-[#49d26d] "
              >
                <i class="fa-solid fa-play"></i>
                <span>Xem Phim</span>
              </button>
              <button className="m-3 font-bold bg-[#2d2f34] cursor-pointer py-2 px-4 rounded flex gap-2 items-center justify-center hover:bg-[#56575b]">
                <i class="fa-regular fa-heart"></i>
                <span>Yêu thích</span>
              </button>
            </div>
          </div>
        </div>
        <div className="h-full w-full absolute top-0 left-[30%] ">
          <div className="relative">
            <img
              className="max-h-[500px] w-[70%]"
              src={filmDetail.poster_url}
              alt="Poster"
            />
            <div className="w-[30%] absolute top-0 h-full darken_left"></div>
            <div className="w-[70%] absolute top-0 left-0 h-full darken_bottom"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmDetail;
