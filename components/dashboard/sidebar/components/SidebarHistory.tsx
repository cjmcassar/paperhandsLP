import React from "react";
import Eth from "../../../../public/img/brands/eth.svg";
import Matic from "../../../../public/img/brands/matic.svg";
import NFT from "../../../../public/img/dashboard/icons/nft.svg";

function SidebarHistoryItem({ icon, title, date, value, valueColor }) {
  return (
    <li className="flex mb-[23px]">
      <div className="relative bg-lightGrey w-10 rounded-5">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {icon}
        </div>
      </div>
      <div className="ml-3.5 flex justify-between items-center w-40">
        <div className="flex flex-col">
          <h5 className="font-bold">{title}</h5>
          <p className="text-sm">{date}</p>
        </div>
        <p className={valueColor}>{value}</p>
      </div>
    </li>
  );
}

export default function SidebarHistory() {
  return (
    <div className="w-full text-white mb-10">
      <h1 className="font-bold mb-[17px] text-[24px] leading-[29px]">
        History
      </h1>
      <ul className="w-full">
        <SidebarHistoryItem
          icon={<Eth width="12.5px" height="20.5px" />}
          title="Bought Eth"
          date="July 4, 2023"
          value="+1.55"
          valueColor="text-green-600"
        />
        <SidebarHistoryItem
          icon={<Matic width="32px" height="32px" />}
          title="Bought Matic"
          date="July 2, 2023"
          value="+10.55"
          valueColor="text-green-600"
        />
        <SidebarHistoryItem
          icon={<Eth width="12.5px" height="20.5px" />}
          title="Sold Eth"
          date="June 4, 2023"
          value="+1.55"
          valueColor="text-red-600"
        />
        <SidebarHistoryItem
          icon={<NFT fill="white" width="23.55px" height="23.54px" />}
          title="Bought NFT"
          date="May 4, 2023"
          value="+1.55"
          valueColor="text-green-600"
        />
        <SidebarHistoryItem
          icon={<Eth width="12.5px" height="20.5px" />}
          title="Sold Eth"
          date="June 4, 2023"
          value="+1.55"
          valueColor="text-red-600"
        />
      </ul>
    </div>
  );
}
