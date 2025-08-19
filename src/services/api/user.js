import API from "shared/functions/axios";

export const getUsers = async () => {
  const res = await API.get("/api/v1/dashboard/users?limit=3");
  return res.data;
};
