import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchWord } from "../../redux/findFilmSlice";
import { useNavigate } from "react-router-dom";
import { saveWordSearch } from "../../utils/axios";
// import { debounce } from "../../utils/Other";

const Seaching = ({ setIsSearch }) => {
  const navigate = useNavigate();
  // const [word, setWord] = useState();
  const dispatch = useDispatch();
  const word = useSelector((state) => state.findFilm.word);

  // const debouncedHandleChange = useCallback(
  //   debounce((value) => {
  //     dispatch(searchWord(value));
  //     saveWordSearch(value);
  //     navigate("/tim-kiem");
  //   }, 300),
  //   []
  // );

  const handleChange = (e) => {
    // debouncedHandleChange(e.target.value);
    dispatch(searchWord(e.target.value));
    // setWord(e.target.value);
    saveWordSearch(e.target.value);
    navigate("/tim-kiem");
  };

  const handleClick = () => {
    setIsSearch(false);
    saveWordSearch(null);
    dispatch(searchWord(""));
    navigate("/");
  };

  return (
    <form
      className="border border-white bg-black text-white p-1 flex"
      action=""
    >
      <label htmlFor="">
        <i className="p-1 fa-solid fa-magnifying-glass"></i>
      </label>
      <input
        autoFocus
        className="bg-black pl-1 outline-none"
        type="text"
        placeholder="Tìm kiếm tên phim"
        value={word}
        onChange={(e) => handleChange(e)}
      />
      <p onClick={handleClick}>X</p>
    </form>
  );
};

export default Seaching;
