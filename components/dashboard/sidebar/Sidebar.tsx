import React, { useState } from "react";
import Link from "next/link";
import {
  faBars,
  faTimes,
  faBox,
  faChartSimple,
  faClockRotateLeft,
  faGear,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-phDarkGray flex flex-wrap items-center justify-between relative md:w-72 z-50 py-4 px-6 text-white">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-phDarkGray")}
          >
            <FontAwesomeIcon icon={faBars as IconProp} />
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-5 w-full"
            >
              Paperhands
            </a>
          </Link>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-6 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/dashboard">
                    <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"></a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FontAwesomeIcon icon={faTimes as IconProp} />
                  </button>
                </div>
              </div>
            </div>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none text-lg">
              <li className="items-center mb-5">
                <SidebarItem
                  href="/dashboard"
                  iconSrc="/img/dashboard/icons/dashboard.svg"
                >
                  Dashboard
                </SidebarItem>
              </li>
              <li className="items-center mb-5">
                <SidebarItem
                  href="/analytics"
                  iconSrc="/img/dashboard/icons/analytics.svg"
                >
                  Analytics
                </SidebarItem>
              </li>
              <li className="items-center mb-5">
                <SidebarItem
                  href="/history"
                  iconSrc="/img/dashboard/icons/history.svg"
                >
                  History
                </SidebarItem>
              </li>
            </ul>

            <ul className="mt-auto md:flex-col md:min-w-full flex flex-col list-none md:mb-4 text-lg ">
              {" "}
              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
              <li className="items-center mb-5">
                <SidebarItem
                  href="/settings"
                  iconSrc="/img/dashboard/icons/settings.svg"
                >
                  Settings
                </SidebarItem>
              </li>
              <li className="items-center mb-5">
                <SidebarItem
                  href="/contact"
                  iconSrc="/img/dashboard/icons/contact.svg"
                >
                  Contact Us
                </SidebarItem>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
