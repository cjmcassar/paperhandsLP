import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.css";

import {
  faUser,
  faBars,
  faCog,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/dist/client/router";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  onSnapshot,
  query,
  where,
  collection
} from "firebase/firestore";

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

function UserSignIn() {
  const router = useRouter();
  const auth = getAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <li className={styles.listItem}>
      <div className="relative">
        <button className="cursor-pointer" onClick={toggleDropdown}>
          <div className={`${styles.userIcon} bg-lightGrey`}>
            <FontAwesomeIcon icon={faUser} size="1x" />
          </div>
        </button>

        {dropdownOpen && (
          <div className={`${styles.dropdownMenu} bg-lightGrey`}>
            <button className={styles.dropdownItem} onClick={logout}>
              🪵 Log Out
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

function Settings() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <li className={`${styles.listItem} px-4 `}>
      <div className="relative">
        <button
          className="cursor-pointer p-0 text-sm text-white transition-all ease-nav-brand"
          onClick={toggleDropdown}
        >
          <div className={`${styles.iconBorder} bg-lightGrey`}>
            <FontAwesomeIcon
              className={styles.iconSize}
              icon={faCog as IconProp}
            />
          </div>
        </button>
        {dropdownOpen && (
          <div className={`${styles.dropdownMenu} bg-lightGrey`}>
            <Link href="#">
              {/* TODO: Route to profile page */}
              <a className={styles.dropdownItem}>👨🏽‍💼 Account</a>
            </Link>
            <Link href="#">
              {/* TODO: Feedback modal */}
              <a className={styles.dropdownItem}>📋 Give us feedback!</a>
            </Link>
            <Link href="#">
              {/*TODO: Modal for email invitation*/}
              <a className={styles.dropdownItem}>🙏🏼 Invite a friend</a>
            </Link>
          </div>
        )}
      </div>
    </li>
  );
}

// function Notifications() {
//   const auth = getAuth();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(
//         collection(getFirestore(), "notifications"),
//         where("userId", "==", auth.currentUser.uid)
//       ),
//       snapshot => {
//         const newNotifications = snapshot.docs.map(doc => doc.data());
//         setNotifications(newNotifications);
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // need to update with pagination to only show 5 most recent notifications
//   return (
//     <li className={`${styles.listItem}  px-4`}>
//       <div>
//         <button
//           className="cursor-pointer p-0 text-sm text-white transition-all ease-nav-brand"
//           onClick={toggleDropdown}
//         >
//           <div className={`${styles.iconBorder} bg-lightGrey`}>
//             <FontAwesomeIcon
//               className={styles.iconSize}
//               icon={faBell as IconProp}
//             />
//           </div>
//         </button>
//         {dropdownOpen && (
//           <div className={`${styles.dropdownMenu} bg-phLightGray`}>
//             {notifications.map((notification, index) => (
//               <Link key={index} href="#">
//                 <a className={styles.dropdownItem}>
//                   {notification.asset} risk score changed to{" "}
//                   {notification.newRiskScore}
//                 </a>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </li>
//   );
// }

// function SearchBar() {
//   return (
//     <div className={styles.searchBarContainer}>
//       <span className={styles.searchIcon}>
//         <FontAwesomeIcon
//           className="text-gray-500 opacity-100"
//           icon={faSearch as IconProp}
//         />
//       </span>
//       <input
//         type="text"
//         className={`${styles.searchInput} bg-lightGrey text-white-500 placeholder-gray-500`}
//         placeholder="Search Here"
//       />
//     </div>
//   );
// }

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
        <ul className="relative z-50 flex flex-row justify-start gap-3 mb-0 list-none">
          <UserSignIn />
          {/* <Settings /> */}
          {/* <Notifications /> */}
        </ul>
      </div>
    </nav>
  );
}
