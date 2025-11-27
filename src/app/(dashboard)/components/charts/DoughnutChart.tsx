"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Earthquakes", "Floods", "Landslides"],
    datasets: [
      {
        data: [40, 25, 35],
        backgroundColor: ["#2563eb", "#16a34a", "#f97316"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;
