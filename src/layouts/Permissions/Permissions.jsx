import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import permissionsData from "./permissionsData";
import PermissionsTable from "./components/PermissionsTable";

function Permissions() {
  // console.log(user);
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PermissionsTable />
    </DashboardLayout>
  );
}

export default Permissions;
