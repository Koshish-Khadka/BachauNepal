"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Active Volunteers", "Pending Requests", "Completed Tasks"],
    datasets: [
      {
        data: [120, 45, 80],
        backgroundColor: ["#0ea5e9", "#facc15", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
