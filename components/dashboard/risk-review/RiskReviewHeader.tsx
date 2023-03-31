import React, { useState } from "react";
import Plus from "../../../public/img/dashboard/icons/plus.svg";
import Pen from "../../../public/img/dashboard/icons/pen.svg";
import Question from "../../../public/img/dashboard/icons/question.svg";
import styles from "./RiskReviewHeader.module.css";

function RiskReviewHeader({ assetData }) {
	const [showForm, setShowForm] = useState(false); // State to manage the form visibility

	const handleAddNewCrypto = () => {
		setShowForm(true); // Show the form when the "Add New Crypto" button is clicked
	};

	return (
		<div className="flex items-center py-5 gap-8">
			<div>
				<h2 className={`${styles.latestOperationsTitle}`}>Risk Review</h2>
			</div>
			<div className={`${styles.buttonGroup}`}>
				<button
					className={`${styles.customButton} hover:border-phPurple`}
					onClick={handleAddNewCrypto}
				>
					<Plus width="22" height="22" />
					<span className="text-xs">Add New Crypto</span>
				</button>

				<button className={`${styles.customButton} hover:border-phPurple`}>
					<Pen width="22" height="22" />
					<span className="text-xs">Edit Portfolio</span>
				</button>
				<button className={`${styles.customButton} hover:border-phPurple`}>
					<Question width="22" height="22" />
					<span className="text-xs">Help & FAQs</span>
				</button>
			</div>

			{showForm && (
				<div className={`${styles.showForm}`}>
					<div className="bg-white p-8 rounded-lg">
						<h3 className="text-xl font-medium mb-4">Add New Crypto</h3>
						<form>
							<div className="mb-4">
								<label
									htmlFor="asset-select"
									className="block text-gray-700 font-medium mb-2"
								>
									Asset
								</label>
								<select
									id="asset-select"
									name="asset"
									className="w-full border rounded px-3 py-2"
								>
									{assetData.map((asset) => (
										<option key={asset.Mcap} value={asset.Mcap}>
											{asset.Asset} ({asset.Symbol})
										</option>
									))}
								</select>
							</div>
							<div className="flex justify-end">
								<button type="submit" className={`${styles.addButton}`}>
									Add
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
	);
}

export default RiskReviewHeader;
