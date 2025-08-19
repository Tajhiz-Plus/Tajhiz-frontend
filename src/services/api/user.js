import API from "shared/functions/axios";

export const getUsers = async () => {
  const res = await API.get("/api/v1/dashboard/users?limit=1&page=2");
  return res.data;
};
