import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import DataTable from "examples/Tables/DataTable";
import dataTableData from "layouts/applications/data-tables/data/dataTableData";

function Permissions() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DataTable
        table={dataTableData}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        canSearch={true}
        noEndBorder
      />
    </DashboardLayout>
  );
}

export default Permissions;
