import React, { useContext, useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../../utils/firebaseClient";
import { AssetDataContext } from "../../contexts/assetDataContext";
import styles from "./RiskReviewTable.module.css";

// 2. Update firebase rules to allows users to only read their own data

// TODO: Refactor code to seperate into smaller components

interface UserAsset {
  uid: string;
  asset_name: string;
  asset_symbol: string;
  amount: number;
  storage_type: string;
}

function RiskReviewTable() {
  const [user] = useAuthState(auth);
  const assetData = useContext(AssetDataContext);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
  const [tableInitialised, setTableInitialised] = useState(false);
  const [dataTable, setDataTable] = useState<DataTable | null>(null);

  // Fetch and set user assets

  useEffect(() => {
    const fetchAssets = async () => {
      const assets = await fetchUserAssets();
      setUserAssets(assets);
    };

    fetchAssets();
  }, [user]);

  const fetchUserAssets = async () => {
    if (!user) return [];

    const userAssets: UserAsset[] = [];
    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const querySnapshot = await getDocs(userAssetsQuery);
    querySnapshot.forEach(doc => {
      userAssets.push(doc.data() as UserAsset);
    });

    return userAssets;
  };

  // Initialize and populate the data table

  useEffect(() => {
    if (!tableInitialised) {
      intialiseTable();
      setTableInitialised(true);
    } else {
      populateTable();
    }

    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [userAssets]);

  function intialiseTable() {
    if (!tableInitialised) {
      const dataTableSearch = new DataTable(tableRef.current!, {
        searchable: true,
        fixedHeight: false,
        columns: [
          {
            select: 0,
            render: function (asset) {
              return `<span class="font-bold text-white my-2 text-xs 2xl:text-sm"> ${asset[0].data}</span>`;
            }
          },
          {
            select: 1,
            render: function (symbol) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${symbol[0].data}</span>`;
            }
          },
          {
            select: 2,
            render: function (amount) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${amount[0].data}</span>`;
            }
          },
          {
            select: 3,
            render: function (value) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${value[0].data}</span>`;
            }
          },
          {
            select: 4,
            render: function (share) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${share[0].data}</span>`;
            }
          },
          {
            select: 5,
            render: function (storage) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${storage[0].data}</span>`;
            }
          },
          {
            select: 6,
            render: function (riskLevel) {
              let color: string;
              switch (riskLevel[0].data) {
                case "Safe":
                  color = "#8DAAF5";
                  break;
                case "Low Risk":
                  color = "#62FF97";
                  break;
                case "Medium Risk":
                  color = "#FFF507";
                  break;
                case "High Risk":
                  color = "#FC62FF";
                  break;
                default:
                  color = "white";
              }
              return `<span style="color:${
                color || "white"
              }" class=" my-2 text-xs 2xl:text-sm"> ${
                riskLevel[0].data
              }</span>`;
            }
          },
          {
            select: 7,
            render: function (riskReview) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${riskReview[0].data}</span>`;
            }
          },
          {
            select: 8,
            render: function (riskRecommendations) {
              const recommendations = riskRecommendations[0].data.split(",");

              let output = `<div>`;
              recommendations.forEach(
                (recommendation: string) =>
                  (output += `<p class=" text-white my-2 text-xs 2xl:text-sm"> ${recommendation}</p>`)
              );
              output += `</div>`;

              return output;
            }
          }
        ]
      });
      setDataTable(dataTableSearch);
      setTableInitialised(true);
    }
  }

  function populateTable() {
    dataTable!.destroy();
    dataTable!.init();
    const data: (string | number)[][] = [];
    userAssets.forEach(review => {
      if (assetData.assetData) {
        const assetDetails = assetData.assetData.find(
          asset => asset.Symbol === review.asset_symbol
        );

        if (assetDetails) {
          const risk = assetDetails.Rating;
          const riskReview = assetDetails.Asset_Review;
          const priceWithoutUSD = assetDetails.Price.replace("$", "").replace(
            ",",
            ""
          );
          const priceAsNumber = parseFloat(priceWithoutUSD);
          const value = `$${(priceAsNumber * review.amount).toFixed(2)}`;

          if (risk && riskReview && value) {
            data.push([
              review.asset_name,
              review.asset_symbol,
              review.amount,
              value,
              review.storage_type,
              risk,
              riskReview
            ]);
          }
        }
      }
    });

    dataTable!.insert({ data: data });
  }

  return (
    <>
      <div className="py-5">
        <div className="flex gap-6 md:text-lg sm:text-xs text-white">
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#CA4B4B" }}
            ></div>
            <div>High Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#D4955A" }}
            ></div>
            <div>Medium Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#D1D369" }}
            ></div>
            <div>Low Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#8DAAF5" }}
            ></div>
            <div>Historically Safe</div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className={`${styles.riskReviewTable} min-w-full divide-y divide-gray-200 sm:text-sm text-white`}
        >
          <thead
            className={`${styles.riskReviewTable} text-sm uppercase font-medium text-white`}
          >
            <tr>
              <th className="px-6 py-3 text-left text-xs 2xl:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th>Symbol</th>
              <th>Amount</th>
              <th>Value</th>
              <th>Storage</th>
              <th>Risk</th>
              <th>Risk Review</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default RiskReviewTable;
