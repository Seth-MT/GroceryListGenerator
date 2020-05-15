import axios from "axios";

const api2 = axios.create({
    baseURL: "https://us-central1-grocerylistgenerator-ed8bb.cloudfunctions.net/food",
})

export const loadCatalogue = () => api2.get(`/foodbook/allrecipes`)

const apis = {
    loadCatalogue,
}

export default apis;