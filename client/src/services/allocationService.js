import api from "./api";

// Get all allocations

export const getAllocations = async (params = {}) => {
  const { data } = await api.get("/allocations", {
    params,
  });

  return data;
};

// Create allocation

export const createAllocation = async (allocation) => {
  const { data } = await api.post("/allocations", allocation);

  return data;
};

// Get allocation by id

export const getAllocation = async (id) => {
  const { data } = await api.get(`/allocations/${id}`);

  return data;
};

// Return Asset

export const returnAsset = async (id) => {
  const { data } = await api.put(`/allocations/return/${id}`);

  return data;
};

// Transfer Asset

export const transferAsset = async (id, employee) => {
  const { data } = await api.put(
    `/allocations/transfer/${id}`,

    {
      employee,
    },
  );

  return data;
};
