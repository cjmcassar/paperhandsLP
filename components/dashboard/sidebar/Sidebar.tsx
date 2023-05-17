import React, { useEffect, useState } from "react";
import Link from "next/link";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import SidebarItem from "./components/SidebarItem";

import styles from "./Sidebar.module.css";
import Divider from "./components/Divider";

function Toggler({ onClick }) {
  return (
    <button className={styles.toggler} type="button" onClick={onClick}>
      <FontAwesomeIcon icon={faBars as IconProp} />
    </button>
  );
}

function Brand() {
  return (
    <Link href="/risk-review">
      <button className={styles.brand}>Paperhands</button>
    </Link>
  );
}

function CollapseHeader({ onClose }) {
  return (
    <div className={styles.collapseHeader}>
      <div className="flex flex-wrap">
        <div className="w-6/12">
          <Link href="/">
            <a href="#" className={styles.link}></a>
          </Link>
        </div>
        <div className="w-6/12 flex justify-start">
          <button type="button" className={styles.button} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes as IconProp} />
          </button>
        </div>
      </div>
    </div>
  );
}

function NavigationItems() {
  return (
    <ul className="md:flex-col md:min-w-full flex flex-col list-none text-lg">
      <li className="items-center mb-3">
        <SidebarItem
          href="/dashboard"
          iconSrc="/img/dashboard/icons/dashboard.svg"
        >
          Dashboard
        </SidebarItem>
      </li>
      <li className="items-center mb-3">
        <SidebarItem
          href="/risk-review"
          iconSrc="/img/dashboard/icons/analytics.svg"
        >
          Risk Review
        </SidebarItem>
      </li>
      <li className="items-center mb-3">
        <SidebarItem href="/history" iconSrc="/img/dashboard/icons/history.svg">
          History
        </SidebarItem>
      </li>
    </ul>
  );
}

function NavigationFooter() {
  return (
    <ul className="mt-auto md:flex-col md:min-w-full flex flex-col list-none md:mb-4 text-lg ">
      <Divider />
      <li className="items-center mb-5">
        <SidebarItem
          href="mailto:infoattww@gmail.com?subject=Feedback%20for%20Paperhands"
          iconSrc="/img/dashboard/icons/contact.svg"
        >
          Contact Us
        </SidebarItem>
      </li>
    </ul>
  );
}

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState(false);

  const toggleCollapse = () => {
    setCollapseShow(!collapseShow);
  };

  const handleClickOutside = event => {
    if (
      collapseShow &&
      !event.target.closest(`.${styles.sidebar}`) &&
      !event.target.closest(`.${styles.toggler}`)
    ) {
      setCollapseShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapseShow]);

  return (
    <>
      <nav className={`${styles.sidebar} bg-darkGrey`}>
        <div className={styles.container}>
          <Brand />
          <Toggler onClick={toggleCollapse} />
          <div
            className={`${styles.collapse} ${
              collapseShow ? styles.visible : styles.drawer
            } ${styles.collapseShadow} bg-darkGrey `}
          >
            <NavigationItems />
            <NavigationFooter />
          </div>
        </div>
      </nav>
      <style jsx>{`
        @media (min-width: 1024px) {
          .${styles.collapse} {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
