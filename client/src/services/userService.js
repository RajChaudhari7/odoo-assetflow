import api from "./api";

export const getEmployees = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const getEmployee = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const createEmployee = async (employee) => {
  const { data } = await api.post("/users", employee);
  return data;
};

export const registerEmployee = async (employee) => {
  const { data } = await api.post("/auth/register", employee);
  return data;
};

export const updateEmployee = async (id, employee) => {
  const { data } = await api.put(`/users/${id}`, employee);
  return data;
};

export const deleteEmployee = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};