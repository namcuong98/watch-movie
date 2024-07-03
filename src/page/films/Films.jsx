import React from "react";
import DetailedList from "../../components/DetailedList";

const Films = ({ data }) => {
  return (
    <>
      <DetailedList defaultPage={data.defaultPage} />
    </>
  );
};

export default Films;
