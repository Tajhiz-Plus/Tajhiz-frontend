import { Button, Icon } from "@mui/material";
import React from "react";
import UpdateRoleDialog from "./UpdateRoleDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";
import DeleteRoleDialog from "./DeleteRoleDialog";
import AddNewRoleDialog from "./AddNewRoleDialog";
import TableComponent from "layouts/authentication/components/TableComponent/TableComponent";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import { useNavigate } from "react-router-dom";
import { useFetchUsers } from "services/queries/users/useFetchUsers";

function UsersTable() {
  // const [selectedRole, setSelectedRole] = React.useState(null);
  const navigate = useNavigate();
  // const updateRole = useDisclosure();
  // const deleteRole = useDisclosure();
  const addRole = useDisclosure();
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useFetchUsers();

  const users = usersData?.data?.users ?? [];
  console.log("users", usersData?.data);

  // const openUpdateDialog = (role) => {
  //   updateRole.onOpen();
  //   setSelectedRole(role);
  // };

  // const openDeleteDialog = (role) => {
  //   deleteRole.onOpen();
  //   setSelectedRole(role);
  // };

  const tableData =
    users.length > 0
      ? {
          columns: [
            { Header: "الاسم", accessor: "name", width: "5%" },
            { Header: "البريد الإلكتروني", accessor: "email", width: "16%" },
            { Header: "رقم الهاتف", accessor: "phone", width: "14%" },
          ],
          rows: users?.map((user) => ({
            id: user.id,
            name: user.fullName,
            email: user.email,
            phone: user.phoneNumber,
            actions: (
              <>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Icon
                    style={{ cursor: "pointer" }}
                    onClick={() => openUpdateDialog(user)}
                  >
                    edit
                  </Icon>
                  <Icon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => openDeleteDialog(user)}
                  >
                    delete
                  </Icon>
                  <Icon
                    style={{ cursor: "pointer", color: "#379C7C" }}
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    lock
                  </Icon>
                </div>
              </>
            ),
          })),
        }
      : {};

  if (usersLoading)
    return <TableSkeleton table={tableData} rows={6} columns={3} />;
  if (usersError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      <TableComponent
        table={tableData}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        canSearch={true}
        totalPages={usersData?.data?.pagination?.totalPages}
        noEndBorder
        canAddButton
        addButtonChildren={
          <Button
            variant="contained"
            sx={{ color: "#FFF" }}
            onClick={() => addRole.onOpen()}
          >
            إضافة دور
          </Button>
        }
      />
      {/* {selectedRole && (
        <UpdateRoleDialog
          open={updateRole.open}
          onClose={updateRole.onClose}
          role={selectedRole}
        />
      )}
      {selectedRole && (
        <DeleteRoleDialog
          open={deleteRole.open}
          onClose={deleteRole.onClose}
          roleId={selectedRole?.id}
        />
      )}
      <AddNewRoleDialog open={addRole.open} onClose={addRole.onClose} /> */}
    </>
  );
}

export default UsersTable;
