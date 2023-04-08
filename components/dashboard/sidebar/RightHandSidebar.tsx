import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBars,
  faCog,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SidebarHistory from "./components/SidebarHistory";
import RiskInfo from "./components/RiskInfo";
import styles from "../sidebar/RightHandSidebar.module.css";
import { useRouter } from "next/dist/client/router";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  onSnapshot,
  query,
  where,
  collection
} from "firebase/firestore";

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
          <div className={`${styles.userIcon} bg-phLightGray`}>
            <FontAwesomeIcon icon={faUser} size="1x" />
          </div>
        </button>

        {dropdownOpen && (
          <div className={`${styles.dropdownMenu} bg-phLightGray`}>
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
          <div className={`${styles.iconBorder} bg-phLightGray`}>
            <FontAwesomeIcon
              className={styles.iconSize}
              icon={faCog as IconProp}
            />
          </div>
        </button>
        {dropdownOpen && (
          <div className={`${styles.dropdownMenu} bg-phLightGray`}>
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

function Notifications() {
  const auth = getAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), "notifications"),
        where("userId", "==", auth.currentUser.uid)
      ),
      snapshot => {
        const newNotifications = snapshot.docs.map(doc => doc.data());
        setNotifications(newNotifications);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // need to update with pagination to only show 5 most recent notifications
  return (
    <li className={`${styles.listItem}`}>
      <div className="relative">
        <button
          className="cursor-pointer p-0 text-sm text-white transition-all ease-nav-brand"
          onClick={toggleDropdown}
        >
          <div className={`${styles.iconBorder} bg-phLightGray`}>
            <FontAwesomeIcon
              className={styles.iconSize}
              icon={faBell as IconProp}
            />
          </div>
        </button>
        {dropdownOpen && (
          <div className={`${styles.dropdownMenu} bg-phLightGray`}>
            {notifications.map((notification, index) => (
              <Link key={index} href="#">
                <a className={styles.dropdownItem}>
                  {notification.asset} risk score changed to{" "}
                  {notification.newRiskScore}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function RightHandSidebar(): JSX.Element {
  return (
    <>
      <nav className={styles.nav}>
        <div className="md:flex-col md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center gap-10 w-full mx-auto">
          <ul className="flex flex-row justify-start pl-7 mb-0 list-none md-max:w-full pt-4">
            <UserSignIn />
            <Settings />
            <Notifications />
          </ul>
          <div className="px-3 pb-5">
            <SidebarHistory />
            <RiskInfo />
          </div>
        </div>
      </nav>
    </>
  );
}
