import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getOrderDetails } from "services/api/orders";

export const ordersKeyRoot = (orderId) => [
  { scope: QUERY_KEYS.ORDER_DETAILS, orderId },
];

export const useFetchOrderDetails = (orderId) => {
  return useQuery({
    queryKey: ordersKeyRoot(orderId),
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });
};
