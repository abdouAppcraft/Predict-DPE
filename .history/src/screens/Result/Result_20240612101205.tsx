import React from "react";
import "./Result.css";
import { DpeGesType } from "../PredictForm/PredictForm";

interface Props extends Partial<DpeGesType> {}

const letter = [
  { label: "G", color: "#d90429" },
  { label: "F", color: "#f3722c" },
  { label: "E", color: "#f8961e" },
  { label: "D", color: "#ffd60a" },
  { label: "C", color: "#ACD793" },
  { label: "B", color: "#06D001" },
  { label: "A", color: "#059212" },
];

const Result: React.FC<Props> = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        {letter.reverse().map((l) => {
          return <div>{l.label}</div>;
        })}
      </div>
      <div
        style={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column-reverse",
          margin: "auto",
        }}
      >
        {letter.map((l, index) => (
          <ResultItem {...l} flex={(letter.length - index) / letter.length} />
        ))}
      </div>
    </div>
  );
};

export default Result;

const ResultItem: React.FC<{ flex: number; label: string; color: string }> = ({
  flex,
  label,
  color,
}) => {
  return (
    <div>
      <div style={{ display: "flex", height: 50, marginBottom: "1rem" }}>
        <div
          style={{
            flex,
            backgroundColor: color,
            placeContent: "center",
            fontWeight: "bold",
            color: "white",
            padding: ".5rem",
          }}
        >
          {label}
        </div>
        <div style={{ backgroundColor: color }} className=" triangle"></div>
      </div>
    </div>
  );
};
