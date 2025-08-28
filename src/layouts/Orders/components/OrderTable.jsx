import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAsyncDebounce } from "react-table";
import { useFetchOrders } from "services/queries/Orders/useFetchOrders";
import { useDisclosure } from "shared/hooks/useDisclosure";
import { getOrderStatus } from "../utils/constants";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";
import OrdersTableHeader from "./OrdersTableHeader";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import { orderData } from "../utils/data";
import SAR from "assets/images/SAR.svg";
import { Icon } from "@mui/material";
import UpdateOrderDialog from "./UpdateOrderDialog";

const LIMIT_PAGE = 10;

function OrderTable() {
  const [search, setSearch] = useState();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const searchParam = sp.get("search") || "";

  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const updateOrder = useDisclosure();

  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
    refetch: refreshOrders,
  } = useFetchOrders({
    page,
    searchParam: search ? searchParam : undefined,
    limit: LIMIT_PAGE,
  });

  const orders = useMemo(() => {
    return orderData?.data?.orders || [];
  }, [orderData]);

  const openUpdateDialog = (order) => {
    updateOrder.onOpen();
    setSelectedOrder(order);
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
    refreshOrders();
  }, [page, searchParam]);

  const tableData =
    orders.length > 0
      ? {
          columns: [
            {
              Header: "الرقم التعريفي",
              accessor: "orderNumber",
              Cell: ({ value }) => value,
            },
            {
              Header: "التاريخ",
              accessor: "createdAt",
              Cell: ({ value }) => {
                const date = new Date(value).toLocaleString("en-eg", {
                  dateStyle: "short",
                  timeStyle: "short",
                });
                return date;
              },
            },
            {
              Header: "الحالة",
              accessor: "status",
              Cell: ({ value }) => {
                return getOrderStatus(value);
              },
            },
            {
              Header: "العميل",
              accessor: "customer",
              Cell: ({ value }) => (
                <CustomerCell
                  image={value.image || "U"}
                  color={value.color || "dark"}
                  name={value.name}
                />
              ),
            },
            {
              Header: "السعر",
              accessor: "totalAmount",
              Cell: ({ value }) => (
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <span>{Number(value.toFixed(2)).toFixed(2)}</span>
                  <img
                    src={SAR}
                    alt={"ريال"}
                    width={20}
                    height={20}
                    crossOrigin="anonymous"
                    loading="lazy"
                  />
                </div>
              ),
            },
            { Header: "الإجراءات", accessor: "actions" },
          ],

          rows: orders.map((order) => {
            return {
              id: order.id,
              orderNumber: order.orderNumber,
              createdAt: order.createdAt,
              status: order.status.toLowerCase(),
              customer: {
                name: order.user?.fullName,
                image: order.user?.avatar || order.user?.fullName?.charAt(0),
              },
              totalAmount: order.totalAmount,
              actions: (
                <>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      openUpdateDialog(order);
                    }}
                    style={{
                      display: "flex",
                      gap: "8px",
                      padding: "8px",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "8px",
                    }}
                  >
                    <Icon style={{ cursor: "pointer" }}>edit</Icon>
                  </div>
                </>
              ),
            };
          }),
        }
      : {};

  return (
    <>
      <OrdersTableHeader
        search={search}
        setSearch={setSearch}
        onSearchChange={onSearchChange}
      />
      {ordersLoading ? (
        <TableSkeleton table={tableData} rows={6} columns={3} />
      ) : (
        <TableWithServerPagination
          table={tableData ?? { columns: [], rows: [] }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          totalPages={orderData?.data?.pagination?.totalPages}
          pageNumber={page}
          noEndBorder
          handlePageChange={handlePageChange}
          url='orders'
        />
      )}
      {selectedOrder && (
        <UpdateOrderDialog
          open={updateOrder.open}
          onClose={updateOrder.onClose}
          order={selectedOrder}
        />
      )}
    </>
  );
}

export default OrderTable;
