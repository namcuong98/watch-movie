import React from "react";

const Seaching = () => {
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
      />
    </form>
  );
};

export default Seaching;
