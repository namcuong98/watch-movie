import React from "react";
import { useResponsiveScreen } from "../utils/Responsive";

const SlideMovies = ({ item }) => {
  const { isDesktop, isTablet, isMobile, isSmallMobile } =
    useResponsiveScreen();
  return (
    <>
      {isDesktop && (
        <div className="m-[10px] w-full rounded-md overflow-hidden">
          <div className="w-full h-full">
            <img
              title={item.name}
              className="w-full h-full"
              src={item.thumb_url}
              alt="Loading"
            />
          </div>
        </div>
      )}
      {isTablet && (
        <div className="m-[10px] w-full rounded-md overflow-hidden">
          <div className="w-full h-full">
            <img
              title={item.name}
              className="w-full h-full"
              src={item.thumb_url}
              alt="Loading"
            />
          </div>
        </div>
      )}
      {isMobile && (
        <div className="m-[10px] w-full rounded-md overflow-hidden">
          <div className="w-full h-full">
            <img
              title={item.name}
              className="w-full h-full"
              src={item.thumb_url}
              alt="Loading"
            />
          </div>
        </div>
      )}
      {isSmallMobile && (
        <div className="m-[10px] w-full rounded-md overflow-hidden">
          <div className="w-full h-full">
            <img
              title={item.name}
              className="w-full h-full"
              src={item.thumb_url}
              alt="Loading"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SlideMovies;
