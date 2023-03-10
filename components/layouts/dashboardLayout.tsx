import React from "react";
import Navbar from "../dashboard/navbar";
import Sidebar from "../dashboard/sidebar/sidebar";
// import Footer from "../dashboard/footer";
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />

      <div className="relative md:ml-64 max-w-screen bg-black w-auto">
        <Navbar />
      </div>

      <div className="md:p-10 md:ml-64 max-w-screen">
        {children}

        {/* <Footer /> */}
      </div>
    </div>
  );
}
