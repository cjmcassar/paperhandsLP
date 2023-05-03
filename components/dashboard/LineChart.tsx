import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "./LineChart.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db, auth } from "utils/firebaseClient";
import { format, fromUnixTime } from "date-fns";
import { AssetDataContext } from "contexts/assetDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RiskLabel = ({ color, text }) => (
  <div className="flex gap-2 items-center">
    <div className={`w-4 h-4 rounded-full ${color}`}></div>
    <div>{text}</div>
  </div>
);

type RiskLevel = "high" | "medium" | "low" | "historically_safe";

interface UserAsset {
  uid: string;
  asset_name: string;
  asset_symbol: string;
  total_amount: number;
  storage_type: string;
  transaction_date: string;
  transaction_type: "buy" | "sell";
  transaction_id: string;
  risk_level: RiskLevel;
  id: string;
}

export default function LineChart() {
  const chartContainer = useRef(null);
  const [user] = useAuthState(auth);
  const assetData = useContext(AssetDataContext);
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
  const [lineChart, setLineChart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserTransactions();
    }
  }, [user]);

  const fetchUserTransactions = async () => {
    if (!user) return;

    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const userAssetsSnapshots = await getDocs(userAssetsQuery);
    const userAssets: UserAsset[] = [];
    const transactionsPromises: Promise<void>[] = [];

    userAssetsSnapshots.forEach(userAssetDoc => {
      const userAsset = userAssetDoc.data() as UserAsset;
      const transactionsPromise = getDocs(
        collection(userAssetDoc.ref, "transactions")
      ).then(transactionsSnapshots => {
        transactionsSnapshots.forEach(transactionDoc => {
          const transactionData = transactionDoc.data();
          userAssets.push({
            ...userAsset,
            ...transactionData,
            transaction_date: format(
              fromUnixTime(transactionData.transaction_date.seconds),
              "yyyy-MM-dd"
            ),
            transaction_id: transactionDoc.id
          });
        });
      });
      transactionsPromises.push(transactionsPromise);
    });

    await Promise.all(transactionsPromises);
    setUserAssets(userAssets);
    setIsLoading(false);
  };

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

    userAssets.forEach(asset => {
      const assetDetails = assetData.assetData.find(
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
      console.log("ctx:", ctx);

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
                    callback: function (value, index, ticks) {
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
  }, [isLoading, userAssets, assetData]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.chartWrapper}>
          <div className={styles.header}>
            <div>
              <h2 className={`${styles.title} md:text-3xl sm:text-lg`}>
                Types
              </h2>
            </div>
            <div className="flex gap-4 md:text-lg sm:text-xs">
              <RiskLabel color="bg-danger" text="High Risk" />
              <RiskLabel color="bg-warning" text="Medium Risk" />
              <RiskLabel color="bg-success" text="Low Risk" />
              <RiskLabel color="bg-primary" text="Historically Safe" />
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
                chart here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
