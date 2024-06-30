import React, { useState } from "react";
import NotFound from "./NotFound";

const Notication = () => {
  const [isNotify, setNotify] = useState(false);
  return (
    <>
      <div
        className="relative notication"
        onMouseLeave={() => setNotify(false)}
        onMouseEnter={() => setNotify(true)}
      >
        <i className="fa-regular fa-bell"></i>
        {isNotify && <NotFound />}
      </div>
    </>
  );
};

export default Notication;
