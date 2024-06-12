import React from "react";
import "./Result.css";

type Props = {};

const letter = [{ label: "A" }];

const Result: React.FC<Props> = (props) => {
  return (
    <div>
      {letter.map((l) => (
        <ResultItem />
      ))}
    </div>
  );
};

export default Result;

const ResultItem: React.FC<{ index: number }> = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }} className="shape"></div>
        <div className=" shape triangle"></div>
      </div>
    </div>
  );
};
