import { Box, Button, Icon, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import UpdateRoleDialog from "./UpdateRoleDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";
import DeleteRoleDialog from "./DeleteRoleDialog";
import AddNewRoleDialog from "./AddNewRoleDialog";
import TableComponent from "layouts/authentication/components/TableComponent/TableComponent";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchUsers } from "services/queries/users/useFetchUsers";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import { useAsyncDebounce } from "react-table";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

const LIMIT_PAGE = 20;

function UsersTable() {
  const [search, setSearch] = useState();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const searchParam = sp.get("search") || "";

  // const [selectedRole, setSelectedRole] = React.useState(null);
  const navigate = useNavigate();
  // const updateRole = useDisclosure();
  // const deleteRole = useDisclosure();
  const addRole = useDisclosure();
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
    refetch: refreshUsers,
  } = useFetchUsers({ page, searchParam, limit: LIMIT_PAGE });

  const users = usersData?.data?.users ?? [];

  // const openUpdateDialog = (role) => {
  //   updateRole.onOpen();
  //   setSelectedRole(role);
  // };

  // const openDeleteDialog = (role) => {
  //   deleteRole.onOpen();
  //   setSelectedRole(role);
  // };

  const handlePageChange = (_e, p) => {
    const next = new URLSearchParams(sp);
    next.set("page", String(p));
    setSp(next, { replace: true });
  };

  const onSearchChange = useAsyncDebounce((value) => {
    const param = new URLSearchParams(sp);
    if (value) param.set("search", value);
    else param.delete("search");

    param.set("page", "1");
    setSp(param, { replace: true });
  }, 200);

  useEffect(() => {
    refreshUsers();
  }, [page, searchParam]);

  const tableData =
    users.length > 0
      ? {
          columns: [
            { Header: "الاسم", accessor: "name", width: "5%" },
            { Header: "البريد الإلكتروني", accessor: "email", width: "16%" },
            { Header: "رقم الهاتف", accessor: "phone", width: "14%" },
            { Header: "الدور", accessor: "role", width: "14%" },
          ],
          rows: users?.map((user) => ({
            id: user.id,
            name: user.fullName,
            email: user.email,
            phone: user.phoneNumber || "لا يوجد",
            role: user.role?.nameAr || "غير محدد",
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

  if (usersError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        p={3}
      >
        <MDBox width="12rem">
          <MDInput
            placeholder="Search..."
            value={search}
            size="small"
            fullWidth
            onChange={({ currentTarget }) => {
              setSearch(currentTarget.value);
              onSearchChange(currentTarget.value);
            }}
          />
        </MDBox>
        <Box>
          {" "}
          <Button
            variant="contained"
            sx={{ color: "#FFF" }}
            onClick={() => addRole.onOpen()}
          >
            إضافة دور
          </Button>
        </Box>
      </MDBox>
      {usersLoading ? (
        <TableSkeleton table={tableData} rows={6} columns={3} />
      ) : (
        <TableWithServerPagination
          table={tableData}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          totalPages={usersData?.data?.pagination?.totalPages}
          pageNumber={page}
          noEndBorder
          handlePageChange={handlePageChange}
        />
      )}

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
