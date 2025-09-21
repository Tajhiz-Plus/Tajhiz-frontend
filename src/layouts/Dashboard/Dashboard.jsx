import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sales from "layouts/dashboards/sales";
import Charts from "layouts/pages/charts";
import React from "react";
import DashboardAnalytics from "./components/DashboardAnalytics/DashboardAnalytics";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DashboardAnalytics />
    </DashboardLayout>
  );
}

export default Dashboard;
