import API from "shared/functions/axios";

export const getUsers = async ({ page, searchParam, limit }) => {
  const res = await API.get(
    `/api/v1/dashboard/users?limit=${limit}${page ? `&page=${page}` : ""}${
      searchParam ? `&search=${searchParam}` : ""
    }`
  );
  return res.data;
};
