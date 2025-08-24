import { Icon } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import UpdateProductDialog from "./UpdateProductDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";
import DeleteProductDialog from "./DeleteProductDialog";
import AddNewProductDialog from "./AddNewProductDialog";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import { useSearchParams } from "react-router-dom";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import { useAsyncDebounce } from "react-table";
import TableHeader from "./ProductTableHeader";
import { useFetchProducts } from "services/queries/products/useFetchProducts";
import SAR from "assets/images/SAR.svg";

const LIMIT_PAGE = 10;

function ProductsTable() {
  const [search, setSearch] = useState();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const searchParam = sp.get("search") || "";

  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const updateProduct = useDisclosure();
  const deleteProduct = useDisclosure();
  const addProduct = useDisclosure();

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refreshProducts,
  } = useFetchProducts({
    page,
    searchParam: search ? searchParam : undefined,
    limit: LIMIT_PAGE,
  });

  const products = useMemo(() => {
    return productsData?.data?.products || [];
  }, [productsData]);

  const openUpdateDialog = (role) => {
    updateProduct.onOpen();
    setSelectedProduct(role);
  };

  const openDeleteDialog = (role) => {
    deleteProduct.onOpen();
    setSelectedProduct(role);
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
    refreshProducts();
  }, [page, searchParam]);

  const tableData =
    products.length > 0
      ? {
          columns: [
            { Header: "المنتج", accessor: "name", width: "20%" },
            { Header: "السعر", accessor: "price", width: "5%" },
            { Header: "التصنيف", accessor: "category", width: "20%" },
            { Header: "قابل للشحن", accessor: "delivery", width: "20%" },
            { Header: "الإجراءات", accessor: "actions", width: "30%" },
          ],
          rows: products?.map((product) => {
            return {
              id: product.id,
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
                      src={product.images[0].url || ""}
                      alt={product.nameAr}
                      width={40}
                      height={40}
                      style={{
                        borderRadius: "50%",
                      }}
                      crossOrigin="anonymous"
                      loading="lazy"
                    />

                    <span
                      style={{
                        maxWidth: "350px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                      title={product?.nameAr}
                    >
                      {product?.nameAr}
                    </span>
                  </div>
                </>
              ),
              price: (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span>{Number(product?.price).toFixed(2)}</span>
                    <img
                      src={SAR}
                      alt={"ريال"}
                      width={20}
                      height={20}
                      crossOrigin="anonymous"
                      loading="lazy"
                    />
                  </div>
                </>
              ),
              category: product.category?.nameAr || "غير محدد",
              delivery: product?.hasDelivery ? "نعم" : "لا",
              actions: (
                <>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Icon
                      style={{ cursor: "pointer" }}
                      onClick={() => openUpdateDialog(product)}
                    >
                      edit
                    </Icon>
                    <Icon
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => openDeleteDialog(product)}
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

  if (productsError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      <TableHeader
        search={search}
        setSearch={setSearch}
        onSearchChange={onSearchChange}
        addProduct={addProduct}
      />
      {productsLoading ? (
        <TableSkeleton table={tableData} rows={6} columns={3} />
      ) : (
        <TableWithServerPagination
          table={tableData ?? { columns: [], rows: [] }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          totalPages={productsData?.data?.pagination?.totalPages}
          pageNumber={page}
          noEndBorder
          handlePageChange={handlePageChange}
        />
      )}

      {selectedProduct && (
        <UpdateProductDialog
          open={updateProduct.open}
          onClose={updateProduct.onClose}
          product={selectedProduct}
        />
      )}
      {selectedProduct && (
        <DeleteProductDialog
          open={deleteProduct.open}
          onClose={deleteProduct.onClose}
          userId={selectedProduct?.id}
        />
      )}

      <AddNewProductDialog
        open={addProduct.open}
        onClose={addProduct.onClose}
      />
    </>
  );
}

export default ProductsTable;
