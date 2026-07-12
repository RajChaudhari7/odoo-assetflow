import api from "./api";


// GET ALL DEPARTMENTS
export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};


// CREATE DEPARTMENT
export const createDepartment = async (departmentData) => {
  const response = await api.post(
    "/departments",
    departmentData
  );

  return response.data;
};


// UPDATE DEPARTMENT
export const updateDepartment = async (id, departmentData) => {
  const response = await api.put(
    `/departments/${id}`,
    departmentData
  );

  return response.data;
};


// DELETE DEPARTMENT
export const deleteDepartment = async (id) => {
  const response = await api.delete(
    `/departments/${id}`
  );

  return response.data;
};