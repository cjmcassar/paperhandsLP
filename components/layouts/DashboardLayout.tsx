import React from "react";
import Navbar from "../dashboard/Navbar";
import Sidebar from "../dashboard/sidebar/Sidebar";
import RightHandSidebar from "../dashboard/sidebar/RightHandSidebar";

import Footer from "../dashboard/Footer";
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />

      <div className="relative md:ml-56 md:mr-64 bg-phBlack w-auto">
        <Navbar />
      </div>

      <div className="md:p-10 md:ml-56 md:mr-64  flex-1 bg-phBlack min-h-screen">
        {children}
      </div>

      <RightHandSidebar />

      <div className="md:ml-56 md:mr-64">
        <Footer />
      </div>
    </div>
  );
}
