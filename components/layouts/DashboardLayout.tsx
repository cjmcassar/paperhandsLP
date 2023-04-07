import React, { useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import Sidebar from "../dashboard/sidebar/Sidebar";
import RightHandSidebar from "../dashboard/sidebar/RightHandSidebar";
import { auth } from "../../utils/firebaseClient.js";
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
      <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-4" /> Checking
      authentication
    </div>
  ) : (
    <div>
      <Sidebar />

      <div className="relative md:ml-56 md:mr-64 bg-dark w-auto">
        <Navbar />
      </div>

      <div className="md:p-10 md:ml-56 md:mr-64  flex-1 bg-dark min-h-screen">
        {children}
      </div>

      <RightHandSidebar />

      <div className="md:ml-56 md:mr-64">
        <Footer />
      </div>
    </div>
  );
}
