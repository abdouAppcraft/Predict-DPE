import React from "react";
import "./Result.css";

type Props = {};

const Result: React.FC<Props> = (props) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="shape"></div>
        <div className=" shape triangle"></div>
      </div>
    </div>
  );
};

export default Result;
