import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getUsers } from "services/api/user";

export const usersKey = [{ scope: QUERY_KEYS.USERS }];

export const useFetchUsers = () => {
  return useQuery({
    queryKey: usersKey,
    queryFn: getUsers,
  });
};
