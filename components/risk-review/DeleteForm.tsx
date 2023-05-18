import React from "react";
import styles from "./RiskReviewTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type DeleteFormProps = {
  loading: boolean;
  onDelete: () => void;
  onCancel: () => void;
};

function DeleteForm({
  loading,
  onDelete,
  onCancel
}: DeleteFormProps): JSX.Element {
  return (
    <div className={`${styles.showForm} z-50 `}>
      <div className="bg-gray-800 p-8 rounded-lg w-5/12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
          <h3 className="text-xl text-white font-medium">Are you sure?</h3>
          <div className="flex">
            <button
              className="bg-danger text-white text-center px-4 py-2 rounded-lg"
              onClick={onDelete}
              disabled={loading}
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
            <button
              type="button"
              className={`${styles.cancelButton} hover:bg-opacity-80`}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteForm;
