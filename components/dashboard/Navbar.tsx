import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.css";

function NavbarTitle() {
  return (
    <nav>
      <h6 className={styles.navbarTitle}>Dashboard</h6>
      <ol className={styles.navbarList}>
        <li className={styles.navbarListItem} aria-current="page">
          Your Crypto Assets
        </li>
      </ol>
    </nav>
  );
}

function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <span className={styles.searchIcon}>
        <FontAwesomeIcon
          className="text-gray-500 opacity-100"
          icon={faSearch as IconProp}
        />
      </span>
      <input
        type="text"
        className={`${styles.searchInput} bg-lightGrey text-white-500 placeholder-gray-500`}
        placeholder="Search Here"
      />
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className={styles.navbar} navbar-scroll="false">
      <div className=" flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <NavbarTitle />
        {/* <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4">
            <SearchBar />
          </div>
        </div> */}
      </div>
    </nav>
  );
}
