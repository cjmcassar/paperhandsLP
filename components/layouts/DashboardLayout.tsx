import React from "react";
import Navbar from "../dashboard/Navbar";
import Sidebar from "../dashboard/sidebar/Sidebar";
import RightHandSidebar from "../dashboard/sidebar/RightHandSidebar";

import Footer from "../dashboard/Footer";
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />

      <div className="relative md:ml-72 md:mr-72 bg-phDarkGray w-auto">
        <Navbar />
      </div>

      <div className="md:p-10 md:ml-72 md:mr-72 flex-1 bg-phBlack min-h-screen">
        {children}
      </div>

      <RightHandSidebar />

      <div className="md:ml-72 md:mr-72">
        <Footer />
      </div>
    </div>
  );
}
