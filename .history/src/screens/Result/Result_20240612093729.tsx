import React from "react";
import "./Result.css";

type Props = {};

const letter = [{ label: "A" }, { label: "A" }, { label: "A" }, { label: "A" }];

const Result: React.FC<Props> = (props) => {
  return (
    <div>
      {letter.map((l, index) => (
        <ResultItem flex={index} />
      ))}
    </div>
  );
};

export default Result;

const ResultItem: React.FC<{ flex: number }> = ({ index }) => {
  return (
    <div>
      <div style={{ display: "flex", height: 30 }}>
        <div style={{ flex }} className="shape"></div>
        <div className=" shape triangle"></div>
      </div>
    </div>
  );
};
