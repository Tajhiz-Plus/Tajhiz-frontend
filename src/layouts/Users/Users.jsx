import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import { useFetchUsers } from "services/queries/users/useFetchUsers";

function Users() {
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useFetchUsers();
  console.log(usersData);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      Users
    </DashboardLayout>
  );
}

export default Users;
