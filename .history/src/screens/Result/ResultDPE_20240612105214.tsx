import React from "react";
import "./Result.css";
import { DpeGesType } from "../PredictForm/PredictForm";

interface Props extends Partial<DpeGesType> {}

const letter = [
  { label: "A", color: "#d90429" },
  { label: "B", color: "#f3722c" },
  { label: "G", color: "#f8961e" },
  { label: "C", color: "#ffd60a" },
  { label: "D", color: "#ACD793" },
  { label: "E", color: "#06D001" },
  { label: "F", color: "#059212" },
];
const height = 40;

const ResultGES: React.FC<Props> = (props) => {
  const currentResult = letter[props.Etiquette_DPE || 0];
  return (
    <div style={{ display: "flex", justifyItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {letter.map((l) => {
          const isCurrent = currentResult === l;
          return (
            <div
              style={{
                height: height,
                border: isCurrent ? "2px solid silver" : "",
                boxSizing: "border-box",
                width: 70,
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                alignContent: "center",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: isCurrent ? "white" : "",
              }}
            >
              {isCurrent && l.label}
            </div>
          );
        })}
      </div>
      <div
        style={{
          flex: 1,
          maxWidth: height * 10,
          display: "flex",
          flexDirection: "column-reverse",
          gap: height / 4,
        }}
      >
        {letter.map((l, index) => (
          <ResultItem {...l} flex={(letter.length - index) / letter.length} />
        ))}
      </div>
    </div>
  );
};

export default ResultGES;

const ResultItem: React.FC<{ flex: number; color: string }> = ({
  flex,
  color,
}) => {
  return (
    <div>
      <div style={{ display: "flex", height }}>
        <div
          style={{
            flex,
            backgroundColor: color,
            placeContent: "center",
            fontWeight: "bold",
            color: "white",
            padding: ".5rem",
          }}
        ></div>
        <div style={{ backgroundColor: color }} className=" triangle"></div>
      </div>
    </div>
  );
};
