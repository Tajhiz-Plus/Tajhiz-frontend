import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import DataTable from "examples/Tables/DataTable";
import dataTableData from "layouts/applications/data-tables/data/dataTableData";
import Charts from "layouts/pages/charts";

function Reports() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Charts
      />
    </DashboardLayout>
  );
}

export default Reports;
