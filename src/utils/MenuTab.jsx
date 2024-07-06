import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuData } from "../components/HardData";
import { useDispatch, useSelector } from "react-redux";
import { selectPage } from "../redux/navigationSlice";
import { saveWordSearch } from "./axios";
import { searchWord } from "../redux/findFilmSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useResponsivenessOverall } from "./Responsive";

export const MenuTab = ({ isSearch, setIsSearch }) => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPage = useSelector((state) => state.navigation.selected);
  const currentPath = window.location.pathname;
  // Lấy ra url hiện tại

  const handleClickScroll = (name, id) => {
    dispatch(selectPage(name));
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    if (name === "Danh sách của tôi") {
      if (!isAuthenticated) {
        console.log("id", isAuthenticated);
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        const element = document.getElementById("/");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("favourites");
      }
    }
  };

  const handleClick = (item) => {
    saveWordSearch(null);
    dispatch(selectPage(item.name));
    if (isSearch) {
      setIsSearch(false);
      dispatch(searchWord(""));
    }
    if (item.name === "Danh sách của tôi") {
      if (!isAuthenticated) {
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
      } else {
        navigate("favourites");
      }
    } else {
      navigate(`${item.path}`);
    }
  };

  useEffect(() => {
    if (currentPath === "/") {
      dispatch(selectPage("Trang Chủ"));
    }
  }, [currentPath, dispatch]);

  return (
    <>
      <ul className="flex gap-5 ml-6">
        {MenuData.map((item) => {
          return (
            <>
              {currentPath === "/" ? (
                <li
                  className={selectedPage === item.name ? "selected" : ""}
                  onClick={() => {
                    handleClickScroll(item.name, item.path);
                  }}
                  key={item.id}
                >
                  {item.name}
                </li>
              ) : (
                <li
                  className={selectedPage === item.name ? "selected" : ""}
                  onClick={() => {
                    handleClick(item);
                  }}
                  key={item.id}
                >
                  {item.name}
                </li>
              )}
            </>
          );
        })}
      </ul>
    </>
  );
};

export const MenuTabRps = ({ isSearch, setIsSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const { rpsSearch } = useResponsivenessOverall();

  const handleClick = (item) => {
    saveWordSearch(null);
    dispatch(selectPage(item.name));
    if (isSearch) {
      setIsSearch(false);
      dispatch(searchWord(""));
    }
    if (item.name === "Danh sách của tôi") {
      if (!isAuthenticated) {
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        navigate("/");
      } else {
        navigate("favourites");
      }
    } else {
      navigate(`${item.path}`);
    }
  };

  return (
    <>
      <ul className="fixed top-0 bottom-0 left-0 z-10 bg-black text-white pt-12">
        {MenuData.map((item) => {
          return (
            <>
              <li
                key={item.id}
                className="px-12 py-4 hover:bg-slate-700"
                onClick={() => handleClick(item)}
              >
                {item.name}
              </li>
            </>
          );
        })}
        {!rpsSearch && (
          <li
            className="px-12 py-4 hover:bg-slate-700"
            onClick={() => navigate("rps-category")}
          >
            Thể Loại
          </li>
        )}
      </ul>
    </>
  );
};
