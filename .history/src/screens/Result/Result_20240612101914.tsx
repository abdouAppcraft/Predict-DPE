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
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "space-between",
        }}
      >
        {letter.map((l) => {
          return (
            <div
              style={{
                height: 50,
                border: "solid",
                boxSizing: "border-box",
                width: 70,
                borderTopLeftRadius: "1rem",
              }}
            >
              {l.label}
            </div>
          );
        })}
      </div>
      <div
        style={{
          flex: 1,
          maxWidth: 500,
          display: "flex",
          flexDirection: "column-reverse",
          margin: "auto",
          gap: "1rem",
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
      <div style={{ display: "flex", height: 50 }}>
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
