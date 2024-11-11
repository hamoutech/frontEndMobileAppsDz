import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
const HalfDonut = ({ data, title, content, key }) => {
  // const [gaugeText, setGaugeText] = useState({
  //   id: "gaugeText",
  //   beforeDatasetsDraw(chart, args, pluginOptions) {
  //     const {
  //       ctx,
  //       chartArea: { top, bottom, left, right, width, height },
  //     } = chart;
  //     const xCenter = chart.getDatasetMeta(0).data[0].x;
  //     const yCenter = chart.getDatasetMeta(0).data[0].y;
  //     ctx.save();
  //     ctx.font = "bold 15px sans-serif";
  //     ctx.textAlign = "center";
  //     ctx.textBaseLine = "bottom";
  //     ctx.fillText("title", xCenter, yCenter);
  //   },
  // });
  // useEffect(() => {
  //   if (content) {
  //     console.log(content);
  //     const gauge = {
  //       id: content.title,
  //       beforeDatasetsDraw(chart, args, pluginOptions) {
  //         const {
  //           ctx,
  //           chartArea: { top, bottom, left, right, width, height },
  //         } = chart;
  //         const xCenter = chart.getDatasetMeta(0).data[0].x;
  //         const yCenter = chart.getDatasetMeta(0).data[0].y;
  //         ctx.save();
  //         ctx.font = "bold 15px sans-serif";
  //         ctx.textAlign = "center";
  //         ctx.textBaseLine = "bottom";
  //         console.log(content);
  //         ctx.fillText(content.title, xCenter, yCenter);
  //       },
  //     };
  //     setGaugeText(gauge);
  //   }
  // }, [content]);
  return (
    <Doughnut
      data={data}
      style={{
        width: "100%",
        height: "100%",
      }}
      key={key}
      // plugins={[gaugeText]}
    />
  );
};
export default HalfDonut;
