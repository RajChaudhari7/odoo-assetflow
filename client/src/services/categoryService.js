import api from "./api";

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export const createCategory = async (category) => {
  const { data } = await api.post("/categories", category);
  return data;
};

export const updateCategory = async (id, category) => {
  const { data } = await api.put(`/categories/${id}`, category);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};