import React from "react";
import Navbar from "../dashboard/navbar";
import Sidebar from "../dashboard/sidebar/sidebar";
import RightHandSidebar from "../dashboard/sidebar/RightHandSidebar";
import Footer from "../dashboard/footer";
export default function DashboardLayout({ children }) {
	return (
		<>
			<Sidebar />

			<div className="relative md:ml-64 md:mr-64 bg-black w-auto">
				<Navbar />
			</div>

			<div className="md:p-10 md:ml-64 md:mr-64 flex-1">{children}</div>

			<RightHandSidebar />

			<div className="md:ml-64 md:mr-64">
				<Footer />
			</div>
		</>
	);
}
