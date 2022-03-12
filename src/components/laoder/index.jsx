import React from "react";

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="containerLoader">
          <div className="dotLoader"></div>
          <div className="dotLoader"></div>
          <div className="dotLoader"></div>
          <div className="dotLoader"></div>
          <div className="dotLoader"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
