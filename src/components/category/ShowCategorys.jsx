import React from "react";
import { ListCategory } from "../HardData";
import { useNavigate } from "react-router-dom";
import { saveCategory } from "../../utils/axios";

const ShowCategorys = () => {
  const navigate = useNavigate();

  const navigatePage = (param) => {
    saveCategory(param);
    navigate(`the-loai/${param}`);
  };
  return (
    <div className="absolute right-0 bg-black w-[300px] category mt-3">
      <div className="grid grid-cols-3 grid-flow-row arrow">
        {ListCategory.map((category) => {
          return (
            <>
              <div className="pt-3 ">
                <p
                  className="text-center cursor-pointer"
                  key={category.key}
                  onClick={() => navigatePage(category.item)}
                >
                  {category.name}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCategorys;
