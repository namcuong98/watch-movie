import React, { useState } from "react";
import { useResponsiveScreen } from "../../utils/Responsive";
import SlideMovie from "../../components/SlideMovie";

const ContentSlide = ({ contentSlide, path }) => {
  const [startIndex, setStartIndex] = useState(0);
  const { isDesktop, isTablet, isMobile, isSmallMobile } =
    useResponsiveScreen();

  let itemsPerPage;
  if (isDesktop) {
    itemsPerPage = 5;
  } else if (isTablet) {
    itemsPerPage = 4;
  } else if (isMobile) {
    itemsPerPage = 3;
  } else if (isSmallMobile) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 5;
  }

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, contentSlide.length - itemsPerPage)
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <>
      <div className="relative flex justify-center items-center w-full">
        <button
          className="button_slide left-0 cursor-pointer hover:text-gray-400"
          onClick={prevSlide}
          disabled={startIndex === 0}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex w-full">
          {contentSlide
            .slice(startIndex, startIndex + itemsPerPage)
            .map((item) => {
              return <SlideMovie item={item} path={path} />;
            })}
        </div>
        <button
          className=" button_slide right-0 cursor-pointer hover:text-gray-400"
          onClick={nextSlide}
          disabled={startIndex === contentSlide.length - itemsPerPage}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
};

export default ContentSlide;
