import React from "react";
import DetailedList from "../../components/DetailedList";

const Movies = () => {
  return (
    <>
      <div>
        <div>Movies</div>
        <DetailedList url={"phim-moi-cap-nhat?page=1"} />
      </div>
    </>
  );
};

export default Movies;
