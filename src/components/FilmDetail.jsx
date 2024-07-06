import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, getDataFilmDetail, saveCategory } from "../utils/axios";
import { convertToSlug } from "../utils/ReplaceMents";
import SuggestFilms from "./SuggestFilms";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useResponsivenessOverall } from "../utils/Responsive";
import { useAuth0 } from "@auth0/auth0-react";

const FilmDetail = () => {
  const navigate = useNavigate();
  const [filmDetail, setFilmDetail] = useState([]);
  const [suggest, setSuggest] = useState([]);
  const { rpsBannerInfoBtn } = useResponsivenessOverall();
  const { isAuthenticated } = useAuth0();
  const flag = useSelector((state) => state.flag.selected);

  const watchMovie = () => {
    navigate("xem-phim");
  };

  const handleCategory = (category) => {
    const result = convertToSlug(category.name);
    saveCategory(result);
    navigate(`/the-loai/${result}`);
  };

  const favourite = () => {
    const takeFilm = sessionStorage.getItem("infoFilm");
    // Lấy mảng hiện tại từ localStorage, nếu chưa có thì khởi tạo mảng rỗng
    const currentArray =
      JSON.parse(localStorage.getItem("favouritesArray")) || [];
    // some duyệt qua mảng trả về giá trị true false nếu thoả mãn điều kiện
    const filmExists = currentArray.some((item) => item.film === takeFilm);
    if (!filmExists && isAuthenticated) {
      const newItem = {
        id: uuidv4(),
        film: takeFilm,
      };
      currentArray.push(newItem);
      alert("Đã thêm phim vào danh sách");
    } else if (!filmExists && !isAuthenticated) {
      alert("Bạn cần phải đăng nhập trước");
    } else {
      alert("Phim đã có trong danh sách trước đó");
    }
    // Lưu mảng mới vào localStorage
    localStorage.setItem("favouritesArray", JSON.stringify(currentArray));
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
  }, [flag]);

  useEffect(() => {
    if (
      filmDetail.category &&
      filmDetail.category[2] &&
      filmDetail.category[2].list &&
      filmDetail.category[2].list[0].name
    ) {
      const categoryVietnamese = filmDetail.category[2].list[0].name;
      const category = convertToSlug(categoryVietnamese);
      getData({
        url: `the-loai/${category}?page=1`,
      })
        .then((res) => {
          setSuggest(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [filmDetail]);

  return (
    <>
      <div className="">
        <div className=" mt-[48px]">
          <div className="relative z-10 h-full ">
            <div
              className="max-w-[500px] h-[450px] flex flex-col text-[16px] ml-8"
              style={{
                justifyContent: rpsBannerInfoBtn ? "center" : "flex-end",
              }}
            >
              <h1 className="text-3xl font-bold mb-2">{filmDetail.name}</h1>
              {rpsBannerInfoBtn && (
                <div className="flex flex-col gap-2">
                  <ul className="flex gap-2">
                    {filmDetail.category &&
                    filmDetail.category[2] &&
                    filmDetail.category[2].list ? (
                      filmDetail.category[2].list.map((item, index) => (
                        <li
                          onClick={() => handleCategory(item)}
                          key={index}
                          className="bg-[#ffffff14] p-1 hover:bg-[#ffffff33] cursor-pointer"
                        >
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
                      {filmDetail.casts !== null
                        ? filmDetail.casts
                        : "Đang cập nhật"}
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
                </div>
              )}
              <div className="flex items-center top-2">
                <button
                  onClick={watchMovie}
                  className="m-3 font-bold bg-[#1cc749] cursor-pointer py-2 px-4 rounded flex gap-2 items-center justify-center hover:bg-[#49d26d] "
                >
                  <i class="fa-solid fa-play"></i>
                  <span>Xem Phim</span>
                </button>
                <button
                  onClick={favourite}
                  className="m-3 font-bold bg-[#2d2f34] cursor-pointer py-2 px-4 rounded flex gap-2 items-center justify-center hover:bg-[#56575b]"
                >
                  <i class="fa-regular fa-heart"></i>
                  <span>Yêu thích</span>
                </button>
              </div>
            </div>
          </div>
          <div className="h-[500px] w-full absolute top-0 left-[30%] ">
            <div className="relative">
              <img
                className="h-[500px] w-[70%] object-cover"
                src={filmDetail.poster_url}
                alt="Poster"
              />
              <div className="w-[30%] absolute top-0 h-full darken_left"></div>
              <div className="w-[70%] absolute top-0 left-0 h-full darken_bottom"></div>
            </div>
          </div>
        </div>
        <SuggestFilms films={suggest} />
      </div>
    </>
  );
};

export default FilmDetail;
