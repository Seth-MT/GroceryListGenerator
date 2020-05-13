import axios from "axios";

const api2 = axios.create({
    baseURL: "http://localhost:3000/food",
})

export const loadCatalogue = () => api2.get(`/foodbook/allrecipes`)

const apis = {
    loadCatalogue,
}

export default apis;