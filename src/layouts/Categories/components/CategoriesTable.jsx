import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import UpdateUserDialog from "./UpdateUserDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";
import DeleteUserDialog from "./DeleteUserDialog";
import AddNewCategoryDialog from "./AddNewCategoryDialog";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import { useSearchParams } from "react-router-dom";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import { useAsyncDebounce } from "react-table";
import TableHeader from "./CategoriesTableHeader";
import { useFetchCategories } from "services/queries/categories/useFetchCategories";
import { useFetchCategoriesTypes } from "services/queries/categories/useFetchCategories";

const LIMIT_PAGE = 10;

function CategoriesTable() {
  const [search, setSearch] = useState();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const searchParam = sp.get("search") || "";

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const updateCategory = useDisclosure();
  const deleteCategory = useDisclosure();
  const addCategory = useDisclosure();

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch: refreshCategories,
  } = useFetchCategories({
    page,
    searchParam: search ? searchParam : undefined,
    limit: LIMIT_PAGE,
  });
  const {
    data: categoriesTypesData,
    isLoading: typesLoading,
    isError: typesError,
    refetch: refreshtypes,
  } = useFetchCategoriesTypes();

  const categories = categoriesData?.data?.categories ?? [];
  const types = categoriesTypesData?.data ?? [];

  const openUpdateDialog = (role) => {
    updateCategory.onOpen();
    setSelectedCategory(role);
  };

  const openDeleteDialog = (role) => {
    deleteCategory.onOpen();
    setSelectedCategory(role);
  };

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
    refreshCategories();
  }, [page, searchParam]);

  const tableData =
    categories.length > 0
      ? {
          columns: [
            { Header: "إسم التصنيف", accessor: "name", width: "20%" },
            { Header: "نوع التصنيف", accessor: "categoryType", width: "16%" },
            { Header: "الوصف", accessor: "description", width: "14%" },
            { Header: "الإجراءات", accessor: "actions", width: "10%" },
          ],
          rows: categories?.map((category) => {
            return {
              id: category.id,
              name: (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={category.imageUrl || ""}
                      alt={category.nameAr}
                      width={40}
                      height={40}
                      style={{
                        borderRadius: "50%",
                      }}
                      crossOrigin="anonymous"
                    />

                    <span>{category.nameAr}</span>
                  </div>
                </>
              ),
              categoryType: category.categoryType.nameAr || "لا يوجد",
              description: category.descriptionAr || "لا يوجد",
              role: category.role?.nameAr || "غير محدد",
              actions: (
                <>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Icon
                      style={{ cursor: "pointer" }}
                      onClick={() => openUpdateDialog(category)}
                    >
                      edit
                    </Icon>
                    <Icon
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => openDeleteDialog(category)}
                    >
                      delete
                    </Icon>
                  </div>
                </>
              ),
            };
          }),
        }
      : {};

  if (categoriesError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      <TableHeader
        search={search}
        setSearch={setSearch}
        onSearchChange={onSearchChange}
        addCategory={addCategory}
      />
      {categoriesLoading ? (
        <TableSkeleton table={tableData} rows={6} columns={3} />
      ) : (
        <TableWithServerPagination
          table={tableData ?? { columns: [], rows: [] }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          totalPages={categoriesData?.data?.pagination?.totalPages}
          pageNumber={page}
          noEndBorder
          handlePageChange={handlePageChange}
        />
      )}

      {selectedCategory && (
        <UpdateUserDialog
          open={updateCategory.open}
          onClose={updateCategory.onClose}
          category={selectedCategory}
        />
      )}
      {selectedCategory && (
        <DeleteUserDialog
          open={deleteCategory.open}
          onClose={deleteCategory.onClose}
          userId={selectedCategory?.id}
        />
      )}

      <AddNewCategoryDialog
        open={addCategory.open}
        onClose={addCategory.onClose}
        categoryTypes={types}
        isLoading={typesLoading}
      />
    </>
  );
}

export default CategoriesTable;
