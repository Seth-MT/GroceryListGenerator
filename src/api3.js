import axios from "axios";

const api3 = axios.create({
    baseURL: "http://localhost:3000/user",
})

export const registerUser = payload => api3.post(`/register`, payload);
export const loginUser = payload => api3.get(`/login`);

const apis = {
    registerUser,
	loginUser,
}

export default apis;