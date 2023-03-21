import React from "react";

import Plus from "../../svg/plus.svg";
import Pen from "../../svg/pen.svg";
import Question from "../../svg/question.svg";

function RiskReviewHeader() {
  return (
    <div className="flex items-center py-5 gap-8">
      <div>
        <h2 className="capitalize text-white text-bold md:text-3xl sm:text-lg">
          Risk Review
        </h2>
      </div>
      <div className="flex gap-4 md:text-lg sm:text-xs text-white">
        <button className="transition duration-300 flex items-center gap-3 rounded-full border-4 px-2 py-1 hover:border-phPurple">
          <Plus width="22" height="22" />
          <span className="text-xs">Add New Crypto</span>
        </button>
        <button className="transition duration-300 flex items-center gap-3 rounded-full border-4 px-2 py-1 hover:border-phPurple">
          <Pen width="22" height="22" />
          <span className="text-xs">Edit Portfolio</span>
        </button>
        <button className="transition duration-300 flex items-center gap-3 rounded-full border-4 px-2 py-1 hover:border-phPurple">
          <Question width="22" height="22" />
          <span className="text-xs">Help & FAQs</span>
        </button>
      </div>
    </div>
  );
}

export default RiskReviewHeader;
