import api from "./api";


// Get all assets with filters

export const getAssets = async (params = {}) => {

    const { data } = await api.get(
        "/assets",
        {
            params
        }
    );

    return data;

};



// Get single asset

export const getAsset = async (id) => {

    const { data } = await api.get(
        `/assets/${id}`
    );

    return data;

};



// Create asset

export const createAsset = async (asset) => {

    const { data } = await api.post(
        "/assets",
        asset
    );

    return data;

};



// Update asset

export const updateAsset = async (id, asset) => {

    const { data } = await api.put(
        `/assets/${id}`,
        asset
    );

    return data;

};



// Delete asset

export const deleteAsset = async (id) => {

    const { data } = await api.delete(
        `/assets/${id}`
    );

    return data;

};