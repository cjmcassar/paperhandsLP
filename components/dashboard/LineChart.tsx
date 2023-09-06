import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "./LineChart.module.css";
import { AssetDataContext } from "contexts/apiAssetDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { UserTransactionsDataContext } from "contexts/userTransactionDataContext";
import { UserAssetsDataContext } from "contexts/userAssetDataContext";

interface RiskLabelProps {
  color: string;
  text: string;
}

const RiskLabel = ({ color, text }: RiskLabelProps) => (
  <div className="flex  gap-2 items-center">
    <div className={`w-4 h-4 rounded-full ${color}`}></div>
    <div>{text}</div>
  </div>
);

export default function LineChart(): JSX.Element {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const assetData = useContext(AssetDataContext);
  const [lineChart, setLineChart] = useState<Chart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const [transactionState] = useContext(UserTransactionsDataContext);
  const [userAssetsState] = useContext(UserAssetsDataContext);
  const { userAssets } = userAssetsState;
  const { userTransactions } = transactionState;

  useEffect(() => {
    const combinedData = userTransactions
      .map(transaction => {
        const asset = userAssets.find(
          asset => asset.id === transaction.parent_id
        );
        return {
          ...transaction,
          asset_name: asset?.asset_name,
          asset_symbol: asset?.asset_symbol,
          total_amount: asset?.total_amount
        };
      })
      .filter(data => {
        return userAssets.find(asset => asset.id === data.parent_id);
      });

    setCombinedData(combinedData);
  }, [userAssetsState, transactionState]);

  const processData = (): number[][] => {
    // Initialize empty data arrays
    const highRiskData: number[] = new Array(12).fill(0);
    const mediumRiskData: number[] = new Array(12).fill(0);
    const lowRiskData: number[] = new Array(12).fill(0);
    const historicallySafeData: number[] = new Array(12).fill(0);

    const getRiskLabel = rating => {
      const ratingMap = {
        "1 - Historically Safe": "Historically Safe",
        "2 - Low Risk": "Low Risk",
        "3 - Medium Risk": "Medium Risk",
        "4 - High Risk": "High Risk"
      };

      return ratingMap[rating] || "Unknown";
    };

    combinedData.forEach(asset => {
      const assetDetails = assetData?.assetData?.find(
        assetData => assetData.Symbol === asset.asset_symbol
      );

      if (assetDetails) {
        const price = parseFloat(assetDetails?.Price.replace(/[$,]/g, ""));
        const assetValue = asset.total_amount * price;
        const riskLabel = getRiskLabel(assetDetails.Rating);
        const transactionMonth = new Date(
          `${asset.transaction_date}T00:00:00`
        ).getMonth();

        if (riskLabel === "High Risk") {
          highRiskData[transactionMonth] += assetValue;
        } else if (riskLabel === "Medium Risk") {
          mediumRiskData[transactionMonth] += assetValue;
        } else if (riskLabel === "Low Risk") {
          lowRiskData[transactionMonth] += assetValue;
        } else if (riskLabel === "Historically Safe") {
          historicallySafeData[transactionMonth] += assetValue;
        }
      }
    });

    return [highRiskData, mediumRiskData, lowRiskData, historicallySafeData];
  };

  useEffect(() => {
    if (!isLoading) {
      const [highRiskData, mediumRiskData, lowRiskData, historicallySafeData] =
        processData();
      let ctx = chartContainer.current.getContext("2d");

      if (lineChart) {
        lineChart.destroy();
      }

      if (chartContainer.current) {
        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(94, 114, 228, 0.2)");
        gradientStroke.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
        gradientStroke.addColorStop(0, "rgba(94, 114, 228, 0)");

        if (ctx) {
          const chartInstance = new Chart(ctx, {
            type: "line",
            data: {
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ],
              datasets: [
                {
                  label: "High Risk",
                  tension: 0.4,
                  pointRadius: 0,
                  borderColor: "#FF6262",
                  fill: true,
                  // backgroundColor: gradientStroke,
                  borderWidth: 2,
                  data: highRiskData
                },
                {
                  label: "Medium Risk",
                  tension: 0.4,
                  pointRadius: 0,
                  borderColor: "#FFF962",
                  fill: true,
                  // backgroundColor: gradientStroke,
                  borderWidth: 2,
                  data: mediumRiskData
                },
                {
                  label: "Low Risk",
                  tension: 0.4,
                  pointRadius: 0,
                  borderColor: "#62FF97",
                  fill: true,
                  // backgroundColor: gradientStroke,
                  borderWidth: 2,
                  data: lowRiskData
                },
                {
                  label: "Historically Safe",
                  tension: 0.4,
                  pointRadius: 0,
                  borderColor: "#7B62FF",
                  fill: true,
                  // backgroundColor: gradientStroke,
                  borderWidth: 2,
                  data: historicallySafeData
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              interaction: {
                intersect: false,
                mode: "index"
              },
              scales: {
                y: {
                  grid: {
                    display: true,
                    color: "#1e293b",
                    drawOnChartArea: true,
                    drawTicks: false,
                    tickBorderDashOffset: 5
                  },
                  ticks: {
                    display: true,
                    padding: 10,
                    color: "#64748b",
                    font: {
                      size: 12,
                      family: "Inter",
                      style: "normal",
                      lineHeight: 2
                    },
                    callback: function (value: number) {
                      const numValue = Number(value);
                      if (numValue >= 1000000) {
                        return `$${(numValue / 1000000).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          }
                        )}M`;
                      } else if (numValue >= 1000) {
                        return `$${(numValue / 1000).toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        })}K`;
                      } else {
                        return numValue.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        });
                      }
                    }
                  }
                },
                x: {
                  grid: {
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                    tickBorderDashOffset: 5
                  },
                  ticks: {
                    display: true,
                    color: "#64748b",
                    padding: 20,
                    font: {
                      size: 12,
                      family: "Inter",
                      style: "normal",
                      lineHeight: 2
                    }
                  }
                }
              }
            }
          });

          setLineChart(chartInstance);
          chartInstance.data.datasets[0].data = highRiskData;
          chartInstance.data.datasets[1].data = mediumRiskData;
          chartInstance.data.datasets[2].data = lowRiskData;
          chartInstance.data.datasets[3].data = historicallySafeData;
          chartInstance.update();
        } else {
          console.log("ctx is null");
        }
      }
    }
  }, [isLoading, userAssets, assetData, combinedData]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={`${styles.chartWrapper}`}>
          <div className={`${styles.header} flex-col  justify-between`}>
            <div>
              <h2 className={`${styles.title} text-3xl pb-4 w-full`}>Types</h2>
            </div>
            <div className="w-full sm:justify-center justify-between flex sm:gap-4 md:text-sm sm:text-xs  ">
              <div className="flex sm:flex-row flex-col sm:gap-4 justify-between">
                <RiskLabel color="bg-danger" text="High Risk" />
                <RiskLabel color="bg-warning" text="Medium Risk" />
              </div>

              <div className="flex sm:flex-row sm:gap-4 flex-col justify-between">
                <RiskLabel color="bg-success" text="Low Risk" />
                <RiskLabel color="bg-primary" text="Historically Safe" />
              </div>
            </div>
          </div>
          <div className={styles.canvasContainer}>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="fa-spin text-gray-500 text-xl"
                />
              </div>
            ) : (
              <div className="h-96">
                <canvas id="chart-line" ref={chartContainer}></canvas>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
