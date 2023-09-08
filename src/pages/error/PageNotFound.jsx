import React from "react";

const PageNotFound = () => {
  return (
    <div className="">
      <div className="">
        <h1 className="">
          ERROR
        </h1>
        <div className="">
          <span className="">
            Xin lỗi, đường dẫn hông được tìm thấy.
          </span>
        </div>
        <div className="">
          <a href='/main'>
            <button
              type="submit"
              className=""
            >
              Go Home
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
