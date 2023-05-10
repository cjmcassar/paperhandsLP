import React, { useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import Sidebar from "../dashboard/sidebar/Sidebar";
import RightHandSidebar from "../dashboard/sidebar/RightHandSidebar";
import { auth } from "../../utils/firebaseClient";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/dist/client/router";

import Footer from "../dashboard/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function DashboardLayout({ children }) {
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);

  // Redirect to login page if user is not logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  return loading ? (
    <div className="flex justify-center min-h-screen items-center text-2xl text-white bg-dark">
      <FontAwesomeIcon
        style={{ fontSize: "24px" }}
        icon={faSpinner}
        className="fa-spin mr-4"
      />
      Checking authentication
    </div>
  ) : (
    <div>
      <Sidebar />

      <div className="lg:fixed relative z-30 lg:pl-56 bg-dark w-full">
        <Navbar />
      </div>

      <div className="px-4 lg:p-10 lg:pl-64 lg:pr-72 lg:pt-20 flex-1 bg-dark min-h-screen">
        {children}
      </div>

      {/* <RightHandSidebar /> */}

      <div className="bg-darkGrey lg:pl-56 lg:pr-64">
        <Footer />
      </div>
    </div>
  );
}
