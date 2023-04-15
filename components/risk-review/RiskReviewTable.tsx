import React, { useContext, useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../../utils/firebaseClient";
import { AssetDataContext } from "../../contexts/assetDataContext";
import { StorageDataContext } from "contexts/storageDataContext";
import styles from "./RiskReviewTable.module.css";
import { format, fromUnixTime } from "date-fns";

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
  const storageData = useContext(StorageDataContext);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editPortfolioData, setEditPortfolioData] = useState(null);

  const [tableInitialised, setTableInitialised] = useState(false);
  const [dataTable, setDataTable] = useState<DataTable | null>(null);

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
        userAssets.push(doc.data() as UserAsset);
        console.log("User assets fetched: ", userAssets);
      });
      setUserAssets(userAssets);
    });

    return unsubscribe;
  };

  useEffect(() => {
    if (!tableInitialised) {
      intialiseTable();
    } else {
      populateTable();
    }

    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [dataTable, userAssets, assetData]);

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
            render: function (storage) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${storage[0].data}</span>`;
            }
          },
          {
            select: 5,
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
            select: 6,
            render: function (riskReview) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${riskReview[0].data}</span>`;
            }
          },
          // {
          //   select: 7,
          //   render: function (riskRecommendations) {
          //     const recommendations = riskRecommendations[0].data.split(",");

          //     let output = `<div>`;
          //     recommendations.forEach(
          //       (recommendation: string) =>
          //         (output += `<p class=" text-white my-2 text-xs 2xl:text-sm"> ${recommendation}</p>`)
          //     );
          //     output += `</div>`;

          //     return output;
          //   }
          // },
          {
            select: 7,
            render: function (assetId) {
              return `<button class="bg-[#4b5563] text-white shadow-sm text-sm py-1 px-3 rounded-full" data-assetId=${assetId[0].data}>Edit</button>`;
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
          console.log("revie", review);
          if (risk && riskReview && value) {
            data.push([
              review.asset_name,
              review.asset_symbol,
              review.amount,
              value,
              review.storage_type,
              risk,
              riskReview,
              review.uid
            ]);
          }
        }
      }
    });

    dataTable!.insert({ data: data });

    // Edit button event listener
    dataTable.dom.addEventListener("click", e => {
      // if coming from asset edit button
      if (e.target.getAttribute("data-assetId")) {
        setShowForm(true);
        let uid = e.target.getAttribute("data-assetId");

        // TODO: Get asset details by id from firebase/context
        // TODO: Set editPortfolioData to asset details to show on the modal
        let userAsset = userAssets.find(asset => asset.uid == uid);
        console.log("object,", userAsset);
        setEditPortfolioData(userAsset);
      }
    });
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
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        {showForm && (
          <div className={`${styles.showForm} z-50 `}>
            <div className="bg-white p-8 rounded-lg w-5/12">
              <div className="flex justify-between items-center gap-5 mb-4">
                <h3 className="text-xl font-medium">Update Crypto</h3>
                <button className="bg-danger text-white px-4 py-2 rounded-lg">
                  Delete
                </button>
              </div>
              <form>
                {/* <pre>{JSON.stringify(editPortfolioData)}</pre> */}
                <div className="mb-4">
                  <label
                    htmlFor="asset-select"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Asset
                  </label>
                  <select
                    disabled={true}
                    id="asset-select"
                    name="asset"
                    className="w-full border rounded px-3 py-2"
                  >
                    <option selected disabled={true}>
                      {editPortfolioData?.asset_name}
                    </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="asset-select"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Storage Type
                  </label>
                  <select
                    id="storage-select"
                    name="storageType"
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value={editPortfolioData?.storage_type} selected>
                      {editPortfolioData?.storage_type}
                    </option>
                    {storageData?.storageData?.map(storage => (
                      <option
                        key={storage.Storage_Method}
                        value={storage.Storage_Method}
                      >
                        {storage.Storage_Method} ({storage.Rating})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="amount-input"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Amount Owned
                  </label>
                  <input
                    type="number"
                    id="amount-input"
                    name="amount"
                    value={editPortfolioData?.amount}
                    onChange={e => {
                      setEditPortfolioData({
                        ...editPortfolioData,
                        amount: e.target.value
                      });
                    }}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="date-picker"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    id="date-picker"
                    value={
                      editPortfolioData &&
                      format(
                        fromUnixTime(editPortfolioData?.purchase_date.seconds),
                        "yyyy-MM-dd"
                      )
                    }
                    name="purchaseDate"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className={`${styles.addButton}`}>
                    Update
                  </button>
                  <button
                    type="button"
                    className={`${styles.cancelButton} hover:bg-opacity-80`}
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RiskReviewTable;
