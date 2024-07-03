import React, { useEffect, useState } from "react";
import { getData } from "../../utils/axios";
import ContentSlide from "./ContentSlide";
import ListMovies from "./ListMovies";
import { useDispatch } from "react-redux";
import { selectPage } from "../../redux/navigationSlice";

const Home = () => {
  const [newMovies, setNewMovies] = useState([]);
  const [isShowing, setIsShowing] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const dispatch = useDispatch();

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

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 1, // 100% của phần phải nằm trong viewport để được coi là nhìn thấy
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

  // if (newMovies.length !== 0 && isShowing.length !== 0 && movies.length !== 0 &&series.length !== 0 && tvShows.length !==0) {

  // }

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
        <div className="mt-9 wrap-listMovie" id="new-movies">
          {<ListMovies path={"new-movies"} title={"Mới & Phổ biến"} />}
          <div className="flex">
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
    </>
  );
};

export default Home;
