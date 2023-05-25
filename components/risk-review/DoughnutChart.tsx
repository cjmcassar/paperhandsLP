import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { AssetDataContext } from "contexts/apiAssetDataContext";
import { UserAssetsDataContext } from "contexts/userAssetDataContext";

interface DonutChartData {
  risk: string;
  color: string;
  percentage: number;
}
interface DonutChartCanvasProps {
  chartContainer: React.RefObject<HTMLCanvasElement>;
  dataChart: Chart | null;
  donutData: DonutChartData[];
}

interface RiskLevelRowProps {
  risk: string;
  percentage: number;
  color: string;
}

interface RiskLevelTableProps {
  donutData: DonutChartData[];
}

const DonutChartCanvas: React.FC<DonutChartCanvasProps> = ({
  chartContainer,
  dataChart,
  donutData
}) => {
  useEffect(() => {
    if (!dataChart) return;

    dataChart.data.labels = donutData.map(data => data.risk);
    dataChart.data.datasets[0].backgroundColor = donutData.map(
      data => data.color
    );
    dataChart.data.datasets[0].data = donutData.map(data => data.percentage);
    dataChart.update();
  }, [dataChart, donutData]);

  return <canvas id="char-doughnut" ref={chartContainer} height="200"></canvas>;
};

const RiskLevelRow: React.FC<RiskLevelRowProps> = ({
  risk,
  percentage,
  color
}) => (
  <div
    className="flex text-center border-b-2 last:border-b-0 border-[#5B5B5B] bg-[#363636]"
    style={{ color }}
  >
    <span className="w-6/12 border-r-2 border-[#5B5B5B] px-3 py-2">{risk}</span>
    <span className="w-6/12 px-3 py-2">{percentage}%</span>
  </div>
);

const RiskLevelTable: React.FC<RiskLevelTableProps> = ({ donutData }) => (
  <div className="flex h-full items-center">
    <div className="bg-[#404040] rounded-2xl overflow-hidden w-full">
      <div className="flex text-center text-white border-b-2 border-[#5B5B5B] uppercase">
        <span className="w-6/12 border-r-2 border-[#5B5B5B] px-3 py-2">
          Risk Level
        </span>
        <span className="w-6/12 px-3 py-2">Share</span>
      </div>

      {donutData.map((data, index) => (
        <RiskLevelRow
          key={index}
          risk={data.risk}
          percentage={data.percentage}
          color={data.color}
        />
      ))}
    </div>
  </div>
);

export default function DoughnutChart() {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const assetData = useContext(AssetDataContext);
  const [donutInitialized, setDonutInitialized] = useState<boolean>(false);
  const [dataChart, setDataChart] = useState(null);
  const [donutData, setDonutData] = useState<DonutChartData[]>([
    { risk: "High Risk", percentage: 50, color: "#FC62FF" },
    { risk: "Medium Risk", percentage: 20, color: "#FFF507" },
    { risk: "Low Risk", percentage: 15, color: "#62FF97" },
    { risk: "Historically Safe", percentage: 15, color: "#8DAAF5" }
  ]);

  const [UserAssetsData] = useContext(UserAssetsDataContext);
  const { userAssets } = UserAssetsData;

  useEffect(() => {
    if (!donutInitialized) {
      initializeDonutChart();
    } else {
      populateDonutChart();
    }
  }, [assetData, userAssets, dataChart]);

  function initializeDonutChart() {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      if (ctx) {
        const donutChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: donutData.map(data => data.risk),
            datasets: [
              {
                label: "High Risk",
                borderWidth: 0,
                backgroundColor: donutData.map(data => data.color),
                data: donutData.map(data => data.percentage),

                hoverBorderWidth: 2,
                hoverBorderColor: "#7B62FF"
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
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
                  }
                }
              }
            }
          }
        });
        setDataChart(donutChart);
      }
    }

    setDonutInitialized(true);
  }

  function populateDonutChart() {
    const riskLevels: { [riskLevel: string]: number } = {};
    let totalValue = 0;

    userAssets.forEach(review => {
      const assetDetails = assetData.assetData?.find(
        asset => asset.Symbol === review.asset_symbol
      );

      if (assetDetails) {
        const price = parseFloat(assetDetails.Price.replace(/[$,]/g, ""));

        const assetValue = price * review.total_amount;
        const risk = assetDetails.Rating.replace(/^[\d\s-]+/, "");

        totalValue += assetValue;

        if (risk in riskLevels) {
          riskLevels[risk] += assetValue;
        } else {
          riskLevels[risk] = assetValue;
        }
      }
    });

    const riskLevelPercents: { [riskLevel: string]: number } = {};

    Object.entries(riskLevels).forEach(([riskLevel, value]) => {
      riskLevelPercents[riskLevel] = (value / totalValue) * 100;
    });

    const data: DonutChartData[] = [];

    Object.entries(riskLevelPercents).forEach(([risk, percentage]) => {
      let color = "";

      switch (risk) {
        case "High Risk":
          color = "#FF6262";
          break;
        case "Medium Risk":
          color = "#FFF962";
          break;
        case "Low Risk":
          color = "#62FF97";
          break;
        case "Historically Safe":
          color = "#7B62FF";
          break;
        default:
          color = "gray";
          break;
      }

      data.push({
        risk: risk,
        color: color,
        percentage: parseFloat(percentage.toFixed(2))
      });
    });

    setDonutData(data);

    if (dataChart) {
      dataChart.data.labels = data.map(data => data.risk);
      dataChart.data.datasets[0].backgroundColor = data.map(data => data.color);
      dataChart.data.datasets[0].data = data.map(data => data.percentage);
      dataChart.update();
    }
  }

  return (
    <div className="gap-6 flex align-center bg-[#1a1c24] rounded-lg p-5 w-full font-bold">
      <div className="w-6/12">
        <RiskLevelTable donutData={donutData} />
      </div>
      <div className="w-6/12">
        <DonutChartCanvas
          chartContainer={chartContainer}
          dataChart={dataChart}
          donutData={donutData}
        />
      </div>
    </div>
  );
}
