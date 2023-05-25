import React, { ChangeEvent, FormEvent } from "react";
import styles from "./RiskReviewTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type BuySellFormProps = {
  buySellData: {
    asset_name: string;
    storage_type: string;
    amount: number;
  } | null;
  transactionType: "buy" | "sell";
  loading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onTransactionTypeChange: (transactionType: "buy" | "sell") => void;
  onAmountChange: (amount: number) => void;
  onTransactionDateChange: (transactionDate: string) => void;
};

function BuySellForm({
  buySellData,
  transactionType,
  loading,
  onSubmit,
  onCancel,
  onTransactionTypeChange,
  onAmountChange,
  onTransactionDateChange
}: BuySellFormProps): JSX.Element {
  return (
    <div className={`${styles.showForm} z-50 `}>
      <div className="bg-gray-800 p-8 rounded-lg w-5/12">
        <div className="flex justify-between items-center gap-5 mb-4">
          <h3 className="text-xl text-white font-medium">Buy/Sell Crypto</h3>
        </div>
        {buySellData && (
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
                value={buySellData.asset_name}
                disabled={true}
                className="bg-LightGrey text-gray-400 w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="asset-select"
                className="block text-white font-medium mb-2"
              >
                Storage Type
              </label>
              <input
                type="text"
                value={buySellData.storage_type}
                disabled={true}
                className="bg-LightGrey text-gray-400 w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="transaction-type-select"
                className="block text-white font-medium mb-2"
              >
                Transaction Type
              </label>
              <select
                id="transaction-type-select"
                name="transactionType"
                className="bg-LightGrey text-white w-full border rounded px-3 py-2"
                value={transactionType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  onTransactionTypeChange(e.target.value as "buy" | "sell")
                }
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount-input"
                className="block text-white font-medium mb-2"
              >
                Transaction Amount
              </label>
              <input
                style={{ colorScheme: "dark" }}
                type="number"
                id="amount-input"
                name="amount"
                value={buySellData.amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const inputValue = e.target.value.trim();
                  const parsedValue = parseFloat(inputValue);
                  if (!isNaN(parsedValue)) {
                    onAmountChange(parsedValue);
                  } else {
                    onAmountChange(0);
                  }
                }}
                className="bg-LightGrey text-white w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date-picker"
                className="block text-white font-medium mb-2"
              >
                Transaction Date
              </label>
              <input
                type="date"
                id="date-picker"
                required={true}
                style={{ colorScheme: "dark" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onTransactionDateChange(e.target.value)
                }
                name="transactionDate"
                className="bg-LightGrey text-white w-full border rounded px-3 py-2"
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
                  "Save"
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

export default BuySellForm;
