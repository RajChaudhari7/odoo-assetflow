import api from "./api";


export const getEmployees = async()=>{

    const {data}=await api.get("/users");

    return data;

};