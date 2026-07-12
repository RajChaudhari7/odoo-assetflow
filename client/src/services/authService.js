import api from "./api";


export const loginUser = async (formData) => {

    const response = await api.post(
        "/auth/login",
        formData
    );

    return response.data;

};





export const logoutUser = () => {


    // Remove JWT token

    localStorage.removeItem("token");


    // Remove user details if stored

    localStorage.removeItem("user");



    // Remove axios authorization header

    delete api.defaults.headers.common[
        "Authorization"
    ];



    return true;

};