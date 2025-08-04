import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import dataTableData from "layouts/ecommerce/orders/order-list/data/dataTableData";
import React from "react";

function Orders() {
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

export default Orders;
