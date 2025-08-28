import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import DefaultCell from "layouts/dashboards/sales/components/DefaultCell";
import IdCell from "layouts/ecommerce/orders/order-list/components/IdCell";
import React from "react";
import { getOrderStatus } from "./utils/constants";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import ivana from "assets/images/ivana-squares.jpg";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import OrderTable from "./components/OrderTable";

function Orders() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <OrderTable />
    </DashboardLayout>
  );
}

export default Orders;
