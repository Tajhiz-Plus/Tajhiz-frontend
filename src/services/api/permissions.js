import API from "shared/functions/axios";

export const getPermissions = async () => {
  const res = await API.get("/api/v1/permissions");
  return res.data;
};
