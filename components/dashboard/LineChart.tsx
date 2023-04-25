import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "./LineChart.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "utils/firebaseClient";
import { format, fromUnixTime } from "date-fns";

const RiskLabel = ({ color, text }) => (
  <div className="flex gap-2 items-center">
    <div className={`w-4 h-4 rounded-full ${color}`}></div>
    <div>{text}</div>
  </div>
);

interface UserAsset {
  uid: string;
  asset_name: string;
  asset_symbol: string;
  total_amount: number;
  storage_type: string;
  transaction_date: string;
  transaction_type: "buy" | "sell";
  id: string;
}

// TODO: get user data from firebase user_assets collection

export default function LineChart() {
  const chartContainer = useRef(null);
  const [user] = useAuthState(auth);
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
  const [lineChart, setLineChart] = useState(null);

  useEffect(() => {
    if (user) {
      const unsubscribe = fetchUserAssets();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user]);

  const fetchUserAssets = () => {
    if (!user) return;

    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(userAssetsQuery, querySnapshot => {
      const userAssets: UserAsset[] = [];
      querySnapshot.forEach(doc => {
        const docData = doc.data();
        const transactionDateSeconds = docData.transaction_date?.seconds;

        const data = {
          ...docData,
          transaction_date: transactionDateSeconds
            ? format(fromUnixTime(transactionDateSeconds), "yyyy-MM-dd")
            : "",
          id: doc.id
        };
        userAssets.push(data as UserAsset);
      });
      setUserAssets(userAssets);
    });

    return unsubscribe;
  };

  // Process user assets to get data for the line chart
  const processData = (): number[][] => {
    // Initialize empty data arrays
    const highRiskData: number[] = new Array(12).fill(0);
    const mediumRiskData: number[] = new Array(12).fill(0);
    const lowRiskData: number[] = new Array(12).fill(0);

    return [highRiskData, mediumRiskData, lowRiskData];
  };

  const [highRiskData, mediumRiskData, lowRiskData] = processData();

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");
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
                // fill: true,
                // backgroundColor: gradientStroke,
                borderWidth: 2,
                data: highRiskData
              },
              {
                label: "Medium Risk",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#FFF962",
                // fill: true,
                // backgroundColor: gradientStroke,
                borderWidth: 2,
                data: mediumRiskData
              },
              {
                label: "Low Risk",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#62FF97",
                // fill: true,
                // backgroundColor: gradientStroke,
                borderWidth: 2,
                data: lowRiskData
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
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2
                  },
                  callback: function (value, index, ticks) {
                    return `${value}k`;
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
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2
                  }
                }
              }
            }
          }
        });

        setLineChart(chartInstance);
      }
    }
  }, []);

  useEffect(() => {
    if (lineChart) {
      lineChart.data.datasets[0].data = highRiskData;
      lineChart.data.datasets[1].data = mediumRiskData;
      lineChart.data.datasets[2].data = lowRiskData;
      lineChart.update();
    }
  }, [lineChart, userAssets]);

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
            </div>
            <div className="md:text-lg sm:text-xs">Last 7 Days</div>
          </div>
          <div className={styles.canvasContainer}>
            <div>
              <canvas
                id="chart-line"
                ref={chartContainer}
                height="300"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
