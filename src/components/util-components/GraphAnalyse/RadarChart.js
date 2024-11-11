import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";

import { Radar } from "react-chartjs-2";

const RadarChart = ({ data }) => {
  return <Radar data={data} />;
};

export default RadarChart;
