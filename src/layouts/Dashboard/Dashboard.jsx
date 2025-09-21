import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sales from "layouts/dashboards/sales";
import Charts from "layouts/pages/charts";
import React from "react";
import SellerDashboard from "./components/SellerDashboard/SellerDashboard";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SellerDashboard />
    </DashboardLayout>
  );
}

export default Dashboard;
