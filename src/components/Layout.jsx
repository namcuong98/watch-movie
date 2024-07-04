import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MenuTab, MenuTabRps } from "../utils/MenuTab";
import ActiveSearch from "./search/ActiveSearch";
import Notication from "./notication/Notication";
import { useResponsive } from "../utils/Responsive";
import { useDispatch } from "react-redux";
import { searchWord } from "../redux/findFilmSlice";

const Layout = () => {
  const [horizontalMenu, setHorizontalMenu] = useState(false);
  const [bgColor, setBgColor] = useState("transparent");
  const [isSearch, setIsSearch] = useState(false);
  const horizontalMenuRef = useRef(null);
  const { isRpsMenuDesktop, isRpsMenuMobile } = useResponsive();
  const dispatch = useDispatch();

  const openHorizontalMenu = (e) => {
    if (
      horizontalMenuRef.current &&
      !horizontalMenuRef.current.contains(e.target)
    ) {
      setHorizontalMenu(false);
    } else {
      setHorizontalMenu(true);
    }
  };

  const handleScroll = () => {
    if (window.scrollY >= 60) {
      setBgColor("black");
    } else {
      setBgColor("transparent");
    }
  };

  const handleClick = () => {
    dispatch(searchWord(""));
    setIsSearch(false);
  };

  useEffect(() => {
    document.addEventListener("click", openHorizontalMenu);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", openHorizontalMenu);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="bg-[#111319] text-[#fff] ">
        <header
          style={{ backgroundColor: bgColor }}
          className="fixed header h-[60px] w-full px-12 z-30"
        >
          <div className="flex justify-between items-center h-full">
            <div className="flex gap-3 items-center">
              <div ref={horizontalMenuRef}>
                {isRpsMenuDesktop && (
                  <i
                    onClick={openHorizontalMenu}
                    className="fa-solid fa-bars font-black text-2xl cursor-pointer"
                  ></i>
                )}
              </div>
              {horizontalMenu && (
                <MenuTabRps isSearch={isSearch} setIsSearch={setIsSearch} />
              )}
              {isRpsMenuMobile && (
                <Link to={"/"}>
                  <h1
                    className="font-black text-3xl text-red-600"
                    onClick={handleClick}
                  >
                    Moviez
                  </h1>
                </Link>
              )}
              {!isRpsMenuDesktop && (
                <MenuTab isSearch={isSearch} setIsSearch={setIsSearch} />
              )}
            </div>
            <div className="flex gap-3 items-center">
              <ActiveSearch isSearch={isSearch} setIsSearch={setIsSearch} />
              <Notication />
              <button className=" px-4 py-1 rounded-md border border-red-500">
                Register
              </button>
              <button className=" px-4 py-1 rounded-md border border-red-500">
                Login
              </button>
            </div>
          </div>
        </header>
        <div className="relative overflow-hidden">
          <div className="px-12">
            <Outlet />
          </div>
        </div>
        <footer className="flex flex-col justify-center items-center pt-20">
          <div className="flex items-center gap-6">
            <i className="fa-brands fa-facebook cursor-pointer text-3xl"></i>
            <i className="fa-brands fa-linkedin cursor-pointer text-3xl"></i>
            <i className="fa-brands fa-youtube cursor-pointer text-3xl"></i>
          </div>
          <div className="flex justify-center items-center gap-9">
            <ul className="mt-9">
              <li>
                <a href="/">Mô tả âm thanh</a>
              </li>
              <li>
                <a href="/">Quan hệ với nhà đầu tư</a>
              </li>
              <li>
                <a href="/">Thông báo pháp lý</a>
              </li>
            </ul>
            <ul className="mt-9">
              <li>
                <a href="/">Trung tâm trợ giúp</a>
              </li>
              <li>
                <a href="/">Việc làm</a>
              </li>
              <li>
                <a href="/">Tùy chọn cookie</a>
              </li>
            </ul>
            <ul className="mt-9">
              <li>
                <a href="/">Thẻ quà tặng</a>
              </li>
              <li>
                <a href="/">Điều khoản sử dụng</a>
              </li>
              <li>
                <a href="/">Thông tin doanh nghiệp</a>
              </li>
            </ul>
            <ul className="mt-9">
              <li>
                <a href="/">Trung tâm đa phương tiện</a>
              </li>
              <li>
                <a href="/">Quyền riêng tư</a>
              </li>
              <li>
                <a href="/">Liên hệ với chúng tôi</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
