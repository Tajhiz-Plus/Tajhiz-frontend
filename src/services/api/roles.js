import API from "shared/functions/axios";

export const getRoles = async () => {
  const res = await API.get("/api/v1/roles");
  return res.data;
};

export const updatePermission = (permissionId, payload) =>
  API.put(`/api/v1/permissions/${permissionId}`, payload).then((r) => r.data);

export const addPermission = (payload) =>
  API.post(`/api/v1/permissions`, payload).then((r) => r.data);

export const deletePermission = (permissionId) =>
  API.delete(`/api/v1/permissions/${permissionId}`).then((r) => r.data);
