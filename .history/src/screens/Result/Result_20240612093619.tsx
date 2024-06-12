import React from "react";
import "./Result.css";

type Props = {};

const letter = [{ label: "A" }, { label: "A" }, { label: "A" }, { label: "A" }];

const Result: React.FC<Props> = (props) => {
  return (
    <div>
      {letter.map((l, index) => (
        <ResultItem index={index + 1} />
      ))}
    </div>
  );
};

export default Result;

const ResultItem: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div>
      <div style={{ display: "flex", height: 30 }}>
        <div style={{ flex: 1 / index }} className="shape"></div>
        <div className=" shape triangle"></div>
      </div>
    </div>
  );
};
