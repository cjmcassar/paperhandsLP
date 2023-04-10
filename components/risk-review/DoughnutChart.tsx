import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const riskLevelData = [
  {
    id: 1,
    riskLevel: "High Risk",
    share: 27.3,
    color: "#FC62FF",
  },
  {
    id: 2,
    riskLevel: "Medium Risk",
    share: 4.8,
    color: "#FFF507",
  },
  {
    id: 3,
    riskLevel: "Low Risk",
    share: 0.7,
    color: "#62FF97",
  },
  {
    id: 4,
    riskLevel: "Safe",
    share: 48.2,
    color: "#8DAAF5",
  },
];

export default function DoughnutChart() {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      if (ctx) {
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: riskLevelData.map((data) => data.riskLevel),
            datasets: [
              {
                label: "High Risk",
                borderWidth: 0,
                backgroundColor: ["#FC62FF", "#FFF507", "#62FF97", "#8DAAF5"],
                data: riskLevelData.map((data) => data.share),

                hoverBorderWidth: 2,
                hoverBorderColor: "#7B62FF",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
                backgroundColor: "#1a1c24",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#fff",
                borderWidth: 1,
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    return context.label + ": " + context.parsed + "%";
                  },
                },
              },
            },
          },
        });
      }
    }
  }, []);

  return (
    <div
      className={` gap-6 flex align-center bg-[#1a1c24] rounded-lg p-5 w-6/12 font-bold`}
    >
      <div className="w-6/12">
        <div className="bg-[#404040] rounded-2xl overflow-hidden">
          <div className="flex text-center text-white border-b-2 border-[#5B5B5B] uppercase">
            <span className=" w-6/12 border-r-2 border-[#5B5B5B] px-3 py-2">
              Risk Level
            </span>
            <span className=" w-6/12 px-3 py-2">Share</span>
          </div>

          {riskLevelData.map((data) => (
            <div
              key={data.id}
              className="flex text-center border-b-2 last:border-b-0 border-[#5B5B5B] bg-[#363636]"
              style={{ color: data.color }}
            >
              <span className="w-6/12 border-r-2 border-[#5B5B5B] px-3 py-2 ">
                {data.riskLevel}
              </span>
              <span className="w-6/12 px-3 py-2">{data.share}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-6/12">
        <canvas id="char-doughnut" ref={chartContainer} height="200"></canvas>
      </div>
    </div>
  );
}
