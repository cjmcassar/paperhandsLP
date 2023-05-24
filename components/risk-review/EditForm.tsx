import React, { ChangeEvent, FormEvent } from "react";
import styles from "./RiskReviewTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { format, fromUnixTime } from "date-fns";
import { Timestamp } from "firebase/firestore";

interface StorageDataItem {
  Rating: string;
  Storage_Method: string;
  Storage_Review: string;
  Storage_Type: string;
}

interface StorageData {
  storageData: StorageDataItem[];
}

type EditFormProps = {
  editPortfolioData: {
    asset_name: string;
    storage_type: string;
    total_amount: number;
    transaction_date: Timestamp;
  } | null;
  storageData: StorageData; // Add the correct type for storageData
  loading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  onCancel: () => void;
  onStorageTypeChange: (storageType: string) => void;
  onAmountChange: (amount: number) => void;
};

function EditForm({
  editPortfolioData,
  storageData,
  loading,
  onSubmit,
  onDelete,
  onCancel,
  onStorageTypeChange,
  onAmountChange
}: EditFormProps): JSX.Element {
  return (
    <div className={`${styles.showForm} z-50 `}>
      <div className="bg-gray-800 p-8 rounded-lg w-5/12">
        <div className="flex justify-between items-center gap-5 mb-4">
          <h3 className="text-xl text-white font-medium">Update Crypto</h3>
          <button
            className="bg-danger text-white px-4 py-2 rounded-lg"
            onClick={onDelete}
          >
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="fa-spin text-white"
              />
            ) : (
              "Delete"
            )}
          </button>
        </div>
        {editPortfolioData && (
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="asset-select"
                className="block text-white font-medium mb-2"
              >
                Asset
              </label>
              <input
                type="text"
                value={editPortfolioData.asset_name}
                disabled={true}
                className="bg-LightGrey text-gray-400 w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="storage-select"
                className="block text-white font-medium mb-2"
              >
                Storage Type
              </label>
              <select
                id="storage-select"
                name="storageType"
                className="bg-LightGrey text-white w-full border rounded px-3 py-2"
                value={editPortfolioData.storage_type}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  onStorageTypeChange(e.target.value)
                }
              >
                {storageData?.storageData?.map((storage: any) => (
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
                className="block text-white font-medium mb-2"
              >
                Amount
              </label>
              <input
                style={{ colorScheme: "dark" }}
                type="number"
                id="amount-input"
                name="amount"
                value={editPortfolioData.total_amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onAmountChange(parseFloat(e.target.value))
                }
                className="bg-LightGrey text-white w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date-picker"
                className="block text-white font-medium mb-2"
              >
                Last Transaction/Edit Date
              </label>
              <input
                disabled={true}
                type="date"
                id="date-picker"
                value={
                  editPortfolioData.transaction_date
                    ? format(
                        fromUnixTime(
                          editPortfolioData.transaction_date.seconds
                        ),
                        "yyyy-MM-dd"
                      )
                    : ""
                }
                name="transactionDate"
                className="bg-LightGrey text-gray-400 w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`${styles.addButton}`}
              >
                {loading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-spin text-white"
                  />
                ) : (
                  "Update"
                )}
              </button>
              <button
                type="button"
                className={`${styles.cancelButton} hover:bg-opacity-80`}
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditForm;
