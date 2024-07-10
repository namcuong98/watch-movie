import React, { useEffect, useState } from "react";
import { getData, saveFilm } from "../../utils/axios";
import ContentSlide from "./ContentSlide";
import ListMovies from "./ListMovies";
import { useDispatch } from "react-redux";
import { selectPage } from "../../redux/navigationSlice";
import { getRandomBanner } from "./Banner";
import { useNavigate } from "react-router-dom";
import { useResponsivenessOverall } from "../../utils/Responsive";

const Home = () => {
  const [newMovies, setNewMovies] = useState([]);
  const [isShowing, setIsShowing] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [banner, setBanner] = useState({});
  const { rpsBannerInfoLogo, rpsButtonBanner } = useResponsivenessOverall();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWatchMovie = (banner) => {
    saveFilm(banner.name);
    navigate(`new-movies/${banner.name}/xem-phim`);
  };

  const handleDetail = (banner) => {
    saveFilm(banner.name);
    navigate(`new-movies/${banner.name}`);
  };

  useEffect(() => {
    const sections = [
      { id: "new-movies", name: "Mới & Phổ biến" },
      { id: "now-showing", name: "Phim đang chiếu" },
      { id: "movies", name: "Phim lẻ" },
      { id: "series", name: "Phim bộ" },
      { id: "tv-shows", name: "TV Shows" },
    ];

    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((sec) => sec.id === entry.target.id);
          if (section) {
            dispatch(selectPage(section.name));
          }
        }
      });
    };

    // if (newMovies.length !== 0 && isShowing.length !== 0 && movies.length !== 0 &&series.length !== 0 && tvShows.length !==0) {

    // }
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 1, // 100% của phần phải nằm trong viewport để được coi là nhìn thấy
      rootMargin: "50px",
    });

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [dispatch]);

  useEffect(() => {
    const infoBanner = getRandomBanner();
    setBanner(infoBanner);
  }, []);

  useEffect(() => {
    getData({
      url: "phim-moi-cap-nhat?page=1",
    })
      .then((res) => {
        setNewMovies(res.data.items);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    getData({
      url: "danh-sach/phim-dang-chieu?page=1",
    })
      .then((res) => {
        setIsShowing(res.data.items);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    getData({
      url: "danh-sach/phim-le?page=1",
    })
      .then((res) => {
        setMovies(res.data.items);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    getData({
      url: "danh-sach/phim-bo?page=1",
    })
      .then((res) => {
        setSeries(res.data.items);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    getData({
      url: "danh-sach/tv-shows?page=1",
    })
      .then((res) => {
        setTvShows(res.data.items);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <>
      <div>
        <div className="h-[75vh] w-full overflow-hidden" id="/">
          {/* responsive ở h-[75vh] chỉnh theo chế độ màn hình sửa đen 2 đầu video */}
          <div
            className="absolute left-[-48px] h-[845px] top-[-126px] object-cover wrap-banner"
            style={{ width: `calc(100% + 48px)` }}
          >
            {banner.trailer && (
              <>
                <div
                  className="absolute top-[22%] left-[48px] h-[500px] z-10 ml-[48px]"
                  style={{ left: rpsBannerInfoLogo ? "48px" : "-48px" }}
                >
                  {rpsBannerInfoLogo ? (
                    <div className="w-[500px] h-[300px]">
                      <img className="w-full h-full" src={banner.logo} alt="" />
                      <p className="line-clamp-4">{banner.describe}</p>
                    </div>
                  ) : (
                    <div className="w-[500px] h-[300px]"></div>
                  )}

                  <div
                    className=" items-center mt-[100px] justify-center"
                    style={
                      rpsButtonBanner
                        ? {
                            display: "block",
                            marginLeft: "80px",
                          }
                        : {
                            display: "flex",
                            marginLeft: "0",
                          }
                    }
                  >
                    <button
                      onClick={() => handleWatchMovie(banner)}
                      className="m-3 font-bold bg-[#1cc749] cursor-pointer w-[132px] h-[40px] py-2 px-4 rounded flex gap-2 items-center justify-center hover:bg-[#49d26d] "
                    >
                      <i class="fa-solid fa-play"></i>
                      <span>Xem Phim</span>
                    </button>
                    <button
                      onClick={() => handleDetail(banner)}
                      className="m-3 font-bold bg-[#2d2f34] cursor-pointer w-[132px] h-[40px] py-2 px-4 rounded flex gap-2 items-center justify-center hover:bg-[#56575b]"
                    >
                      <i class="fa-solid fa-play"></i>
                      <span>Chi tiết</span>
                    </button>
                  </div>
                </div>
                <video
                  className="banner absolute h-[845px] object-cover"
                  autoPlay
                  muted
                  loop
                >
                  <source src={banner.trailer} type="video/mp4" />
                </video>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="mt-9 wrap-listMovie" id="new-movies">
            {<ListMovies path={"new-movies"} title={"Mới & Phổ biến"} />}
            <div className="flex ">
              <ContentSlide path={"new-movies"} contentSlide={newMovies} />
            </div>
          </div>
          <div className="mt-9 wrap-listMovie" id="now-showing">
            {<ListMovies path={"now-showing"} title={"Phim đang chiếu"} />}
            <div className="flex">
              <ContentSlide path={"now-showing"} contentSlide={isShowing} />
            </div>
          </div>
          <div className="mt-9 wrap-listMovie" id="movies">
            {<ListMovies path={"movies"} title={"Phim lẻ"} />}
            <div className="flex">
              <ContentSlide path={"movies"} contentSlide={movies} />
            </div>
          </div>
          <div className="mt-9 wrap-listMovie" id="series">
            {<ListMovies path={"series"} title={"Phim bộ"} />}
            <div className="flex">
              <ContentSlide path={"series"} contentSlide={series} />
            </div>
          </div>
          <div className="mt-9 wrap-listMovie" id="tv-shows">
            {<ListMovies path={"tv-shows"} title={"TV Shows"} />}
            <div className="flex">
              <ContentSlide path={"tv-shows"} contentSlide={tvShows} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
