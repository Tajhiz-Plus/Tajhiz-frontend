// ✅ يدعم: pending, confirmed, shipped, delivered, cancelled, returned
// ويستخدم أيقونات MUI مناسبة لكل حالة

import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
};

const STATUS_CONFIG = {
  pending: { icon: "schedule", color: "info", label: "Pending" },
  confirmed: { icon: "task_alt", color: "success", label: "Confirmed" },
  shipped: { icon: "local_shipping", color: "info", label: "Shipped" },
  delivered: { icon: "done_all", color: "success", label: "Delivered" },
  cancelled: { icon: "close", color: "error", label: "Cancelled" },
  returned: { icon: "undo", color: "dark", label: "Returned" },
};

export const getOrderStatus = (status) => {
  const key = String(status || "").toLowerCase();
  const cfg = STATUS_CONFIG[key] ?? {
    icon: "help_outline",
    color: "dark",
    label: key || "Unknown",
  };

  return <StatusCell icon={cfg.icon} color={cfg.color} status={cfg.label} />;
};
