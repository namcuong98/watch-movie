import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuData } from "../components/HardData";
import { useDispatch, useSelector } from "react-redux";
import { selectPage } from "../redux/navigationSlice";
import { saveWordSearch } from "./axios";
import { searchWord } from "../redux/findFilmSlice";

export const MenuTab = ({ isSearch, setIsSearch }) => {
  const dispatch = useDispatch();
  const selectedPage = useSelector((state) => state.navigation.selected);
  const currentPath = window.location.pathname;
  // Lấy ra url hiện tại

  const handleClickScroll = (name, id) => {
    dispatch(selectPage(name));
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (item) => {
    saveWordSearch(null);
    dispatch(selectPage(item.name));
    if (isSearch) {
      setIsSearch(false);
      dispatch(searchWord(""));
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
                <Link to={item.path}>
                  <li
                    className={selectedPage === item.name ? "selected" : ""}
                    onClick={() => {
                      handleClick(item);
                    }}
                    key={item.id}
                  >
                    {item.name}
                  </li>
                </Link>
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
  const handleClick = (item) => {
    saveWordSearch(null);
    dispatch(selectPage(item.name));
    if (isSearch) {
      setIsSearch(false);
      dispatch(searchWord(""));
    }
  };
  return (
    <>
      <ul className="fixed top-0 bottom-0 left-0 z-10 bg-black text-white pt-12">
        {MenuData.map((item) => {
          return (
            <>
              <Link to={item.path}>
                <li
                  key={item.id}
                  className="px-12 py-4 hover:bg-slate-700"
                  onClick={() => handleClick(item)}
                >
                  {item.name}
                </li>
              </Link>
            </>
          );
        })}
      </ul>
    </>
  );
};
