import React from "react";
import { Line } from "react-chartjs-2";
function LineChar({ data }) {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10, // Ensuring the y-axis range is from 0 to 10
      },
    },
  };
  return (
    <Line
      data={data}
      style={{ height: "400px", width: "400px" }}
      options={options}
    />
  );
}

export default LineChar;
