import React, { useState } from "react";

const Seaching = () => {
  const [nameFilm, setNameFilm] = useState("");

  const handleChange = (e) => {
    setNameFilm(e.target.value);
    console.log("nameFilm", nameFilm);
  };

  return (
    <form className="border border-white bg-black text-white p-1" action="">
      <label htmlFor="">
        <i className="p-1 fa-solid fa-magnifying-glass"></i>
      </label>
      <input
        autoFocus
        className="bg-black pl-1 outline-none"
        type="text"
        placeholder="Tìm kiếm tên phim"
        value={nameFilm}
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
};

export default Seaching;
