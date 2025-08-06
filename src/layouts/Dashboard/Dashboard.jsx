import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sales from "layouts/dashboards/sales";
import Charts from "layouts/pages/charts";
import React from "react";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sales />
    </DashboardLayout>
  );
}

export default Dashboard;
