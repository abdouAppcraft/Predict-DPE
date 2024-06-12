import React from "react";
import "./Result.css";
import { DpeGesType } from "../PredictForm/PredictForm";

interface Props extends Partial<DpeGesType> {}

const letter = [
  { label: "G" },
  { label: "F" },
  { label: "E" },
  { label: "D" },
  { label: "C" },
  { label: "B" },
  { label: "A" },
];

const ResultGES: React.FC<Props> = (props) => {
  const currentResult =
    letter.reverse().findIndex((l) => l.label === (props.Etiquette_GES || 0)) ||
    0;
  return (
    <div style={{ display: "flex", justifyItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "space-between",
        }}
      >
        {letter.map((l, index) => {
          return (
            <div
              style={{
                height: 50,
                border: currentResult ? "2px solid silver" : "",
                boxSizing: "border-box",
                width: 70,
                borderTopLeftRadius: "1rem",
                borderBottomLeftRadius: "1rem",
                alignContent: "center",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: currentResult ? "white" : "",
              }}
            >
              {currentResult && l.label}
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
          gap: "1rem",
        }}
      >
        {letter.map((l, index) => (
          <ResultItem
            {...l}
            opacity={(letter.length - index) / letter.length}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultGES;

const ResultItem: React.FC<{ opacity: number }> = ({ opacity }) => {
  return (
    <div>
      <div style={{ display: "flex", height: 50 }}>
        <div
          style={{
            opacity,
            flex: opacity,
            backgroundColor: "purple",
            placeContent: "center",
            fontWeight: "bold",
            color: "white",
            padding: ".5rem",
          }}
        ></div>
        <div style={{ backgroundColor: "purple" }} className=" triangle"></div>
      </div>
    </div>
  );
};
