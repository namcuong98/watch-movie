import React from "react";
import { saveFilm } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeFlag } from "../redux/flagSlice";
import useSelection from "antd/es/table/hooks/useSelection";
import {
  useResponsivenessOverall,
  useResponsiveScreen,
} from "../utils/Responsive";

const SuggestFilms = ({ films }) => {
  const { rpsBannerInfoBtn } = useResponsivenessOverall();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flag = useSelection((state) => state.flag.selected);

  const { isDesktop, isTablet, isMobile, isSmallMobile } =
    useResponsiveScreen();

  const getGridColsClass = () => {
    if (isDesktop) {
      return `grid-cols-5`;
    } else if (isTablet || isMobile) {
      return `grid-cols-2`;
    } else if (isSmallMobile) {
      return `grid-cols-1`;
    }
    return `grid-cols-1`;
  };
  const gridColsClass = getGridColsClass();

  const handleClick = (item) => {
    saveFilm(item);
    dispatch(changeFlag(flag + 1));
    navigate(`/new-movies/${item}`);
  };

  return (
    <div>
      <p className="text_big p-6">Phim đề xuất:</p>
      <div className={`grid ${gridColsClass} grid-flow-row gap-4`}>
        {films.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="mx-[10px] mt-[10px] mb-10 w-full cursor-pointer "
                onClick={() => handleClick(item.slug)}
              >
                <div className="w-full h-[300px] relative rounded-tr-md rounded-tl-md overflow-hidden wrap-banner">
                  <p className="absolute text-xs rounded-sm top-0 right-0 bg-[#f2bf83] text-[#333] font-bold p-1">
                    Chỉ có trên IQTV
                  </p>
                  <div className="mb-3 ">
                    <img
                      title={item.name}
                      className="w-full h-[300px] object-cover"
                      src={item.thumb_url}
                      alt="Loading"
                    />
                    <div className="flex">
                      <div className="absolute bottom-[20px] left-[6px] text-[#fff] z-10 flex items-center gap-2">
                        <i className="fa-solid fa-star"></i>
                        <p>{(8 + Math.random() * 2).toFixed(1)}</p>
                      </div>
                      <div className="absolute bottom-[20px] right-[6px] rounded-sm p-1 text-xs font-bold bg-[#e66f20] z-10 flex items-center gap-2">
                        <p className="">{item.current_episode}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="flex items-start"
                    style={{
                      flexDirection: !rpsBannerInfoBtn ? "column" : null,
                    }}
                  >
                    <span className="w-full">
                      Tên phim:
                      {rpsBannerInfoBtn && (
                        <span className="text-base text-[#cbcbcc] ml-2 w-full">
                          {item.name}
                        </span>
                      )}
                    </span>
                    {!rpsBannerInfoBtn && (
                      <p className="text-base text-[#cbcbcc] ml-2 w-full">
                        {item.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestFilms;
