import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectPage } from "../../redux/navigationSlice.js";

const ListMovies = ({ title, path }) => {
  const dispatch = useDispatch();
  const handleClick = (name) => {
    dispatch(selectPage(name));
  };

  return (
    <div className="flex gap-6 items-center text-xl">
      <h1>{title}</h1>
      <Link to={path}>
        <div
          onClick={() => {
            handleClick(title);
          }}
          className="listMovies hidden items-center gap-3 cursor-pointer"
        >
          <i class="fa-solid fa-angles-right"></i>
          <p>Xem tất cả</p>
        </div>
      </Link>
    </div>
  );
};

export default ListMovies;
