import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuData } from "../components/HardData";
import { useDispatch, useSelector } from "react-redux";
import { selectPage } from "../redux/navigationSlice";

export const MenuTab = () => {
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

  const handleClick = (name) => {
    dispatch(selectPage(name));
  };

  useEffect(() => {
    if (currentPath === "/") {
      console.log("trang chủ");
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
                      handleClick(item.name);
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

export const MenuTabRps = () => {
  return (
    <>
      <ul className="fixed top-0 bottom-0 left-0 z-10 bg-black text-white pt-12">
        {MenuData.map((item) => {
          return (
            <>
              <Link to={item.path}>
                <li key={item.id} className="px-12 py-4 hover:bg-slate-700">
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
