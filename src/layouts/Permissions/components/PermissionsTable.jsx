import { Icon } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import React from "react";
import { useUpdatePermission } from "services/mutations/permissions/useUpdatePermission";
import { useGetPermissions } from "services/queries/permissions/useFetchPermissions";
import UpdatePermissionDialog from "./UpdatePermissionDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";

function PermissionsTable() {
  const [selectedPermission, setSelectedPermission] = React.useState(null);
  const { data, isLoading, isError } = useGetPermissions();
  const permissions = data?.data?.permissions ?? [];
  const updatePermission = useDisclosure();

  const openUpdateDialog = (permission) => {
    updatePermission.onOpen();
    setSelectedPermission(permission);
  };
  const tableData =
    permissions.length > 0
      ? {
          columns: [
            { Header: "اسم الصلاحية", accessor: "name", width: "22%" },
            { Header: "الكود", accessor: "key", width: "16%" },
            { Header: "الموديول", accessor: "module", width: "14%" },
            { Header: "الإجراءات", accessor: "actions", width: "14%" },
          ],
          rows: permissions?.map((permission) => ({
            id: permission.id,
            name: permission.nameAr || permission.nameEn,
            key: permission.key,
            module: permission.module,
            actions: (
              <>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Icon
                    style={{ cursor: "pointer" }}
                    onClick={() => openUpdateDialog(permission)}
                  >
                    edit
                  </Icon>
                  <Icon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(permission.id)}
                  >
                    delete
                  </Icon>
                </div>
              </>
            ),
          })),
        }
      : {};

  if (isLoading) return <div>Loading....................…</div>;
  if (isError) return <div>حدث خطأ في جلب البيانات</div>;
  console.log("Selected Permissionnnnnnnnnnn:", selectedPermission);

  return (
    <>
      {" "}
      <DataTable
        table={tableData}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        canSearch={true}
        noEndBorder
      />
      {selectedPermission && (
        <UpdatePermissionDialog
          open={updatePermission.open}
          onClose={updatePermission.onClose}
          permission={selectedPermission}
        />
      )}
    </>
  );
}

export default PermissionsTable;
