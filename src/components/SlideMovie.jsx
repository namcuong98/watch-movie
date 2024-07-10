import { useNavigate } from "react-router-dom";
import { saveFilm } from "../utils/axios";

const SlideMovie = ({ item, path }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    saveFilm(item);
    navigate(`${path}/${item}`);
  };

  return (
    <>
      <div
        className="m-[10px] w-full cursor-pointer top_up"
        onClick={() => handleClick(item.slug)}
      >
        <div className="w-full h-[300px] relative rounded-tr-md rounded-tl-md overflow-hidden wrap-banner">
          <p className="absolute text-xs rounded-sm top-0 right-0 bg-[#f2bf83] text-[#333] font-bold p-1">
            Chỉ có trên IQTV
          </p>
          <div classname="mt-3 ">
            <img
              title={item.name}
              className="w-full h-[300px] object-cover"
              src={item.thumb_url}
              alt="Loading"
            />
            <div className="absolute bottom-[20px] left-[6px] text-[#fff] z-10 flex items-center gap-2">
              <i className="fa-solid fa-star"></i>
              <p>{(8 + Math.random() * 2).toFixed(1)}</p>
            </div>
          </div>
        </div>
        <p className="text-base text-[#cbcbcc] line-clamp-2 h-[48px]">
          {item.name}
        </p>
      </div>
    </>
  );
};

export default SlideMovie;
