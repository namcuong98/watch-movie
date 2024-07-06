import React from "react";
import ShowCategorys from "./ShowCategorys";

const Category = ({ categoryRef, setIsCategory, isCategory }) => {
  return (
    <>
      <div
        ref={categoryRef}
        onClick={() => setIsCategory(!isCategory)}
        className="relative "
      >
        <div className="flex gap-2 items-center ">
          <p>Thể loại</p>
          {!isCategory ? (
            <div>
              <p className="pt-[3px]"></p>
              <i className="fa-solid fa-angle-up"></i>
            </div>
          ) : (
            <div>
              <p className="pt-[3px]"></p>
              <i className="fa-solid fa-angle-down"></i>
            </div>
          )}
        </div>
        {isCategory && <ShowCategorys />}
      </div>
    </>
  );
};

export default Category;
