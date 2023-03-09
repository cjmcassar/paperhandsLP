import React from "react";
import Navbar from "../dashboard/Navbar.tsx";
import Sidebar from "../dashboard/sidebar/Sidebar.tsx";
// import Footer from "../dashboard/footer.tsx";
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
