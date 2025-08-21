import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getCategories } from "services/api/categories";

export const categoriesKeyRoot = { scope: QUERY_KEYS.CATEGORIES };

export const useFetchCategories = (params = {}) => {
  return useQuery({
    queryKey: [categoriesKeyRoot, params],
    queryFn: () => getCategories(params),
    keepPreviousData: true,
    staleTime: 30_000,
  });
};
