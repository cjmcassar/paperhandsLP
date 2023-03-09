import Head from "next/head";
import DashboardLayout from "../components/layouts/DashboardLayout.tsx";
function Dashboard() {
  return (
    <DashboardLayout>
      <div>Components inside dashboard layout</div>
    </DashboardLayout>
  );
}

export default Dashboard;
