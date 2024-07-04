import React from "react";
import DetailedList from "../../components/DetailedList";

const Films = ({ data }) => {
  const urlNotPage = data.defaultPage.substring(0, data.defaultPage.length - 1);

  return (
    <>
      <DetailedList defaultPage={urlNotPage} />
    </>
  );
};

export default Films;
