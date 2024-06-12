import React from "react";

type Props = {};

const Result: React.FC<Props> = (props) => {
  return (
    <div>
      <div
        style={{
          height: 50,
          border: "solid",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      ></div>
    </div>
  );
};

export default Result;
