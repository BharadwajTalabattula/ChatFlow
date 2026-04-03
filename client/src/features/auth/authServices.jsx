import apiClient from "../../services/apiClient";

export const loginUser = (data) => apiClient.post("/user/login", data);
export const signupUser  = (data) => apiClient.post("user/register", data);