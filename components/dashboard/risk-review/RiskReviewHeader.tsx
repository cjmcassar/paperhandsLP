import React from "react";

import Plus from "../../../public/img/dashboard/icons/plus.svg";
import Pen from "../../../public/img/dashboard/icons/pen.svg";
import Question from "../../../public/img/dashboard/icons/question.svg";

import styles from "./RiskReviewHeader.module.css";

function RiskReviewHeader() {
	return (
		<div className="flex items-center py-5 gap-8">
			<div>
				<h2 className={`${styles.latestOperationsTitle}`}>Risk Review</h2>
			</div>
			<div className={`${styles.buttonGroup}`}>
				<button className={`${styles.customButton} hover:border-phPurple`}>
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
		</div>
	);
}

export default RiskReviewHeader;
