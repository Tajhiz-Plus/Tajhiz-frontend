import DataTable from "examples/Tables/DataTable";
import React from "react";
import { useGetPermissions } from "services/queries/permissions/useFetchPermissions";

function PermissionsTable() {
  const { data, isLoading, isError } = useGetPermissions();
  const permissions = data?.data?.permissions ?? [];

  const tableData =
    permissions.length > 0
      ? {
          columns: [
            { Header: "اسم الصلاحية", accessor: "name", width: "22%" },
            { Header: "الكود", accessor: "key", width: "16%" },
            { Header: "الموديول", accessor: "module", width: "14%" },
          ],
          rows: permissions?.map((permission) => ({
            id: permission.id,
            name: permission.nameAr || permission.nameEn,
            key: permission.key,
            module: permission.module,
          })),
        }
      : {};
  if (isLoading) return <div>Loading....................…</div>;
  if (isError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <DataTable
      table={tableData}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={false}
      canSearch={true}
      noEndBorder
    />
  );
}

export default PermissionsTable;
