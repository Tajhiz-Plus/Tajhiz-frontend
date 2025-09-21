import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getOverviewAnalytics } from "services/api/dashboards";

export const dashboardOverviewKey = [{ scope: QUERY_KEYS.DASHBOARD_OVERVIEW }];

export const useFetchAnalyticsOverview = () => {
  return useQuery({
    queryKey: dashboardOverviewKey,
    queryFn: getOverviewAnalytics,
  });
};
