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
        className="m-[10px] w-full rounded-md overflow-hidden cursor-pointer"
        onClick={() => handleClick(item.slug)}
      >
        <div className="w-full h-full">
          <img
            title={item.name}
            className="w-full h-full"
            src={item.thumb_url}
            alt="Loading"
          />
        </div>
      </div>
    </>
  );
};

export default SlideMovie;
