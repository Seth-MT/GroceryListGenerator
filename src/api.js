import axios from "axios";

const api = axios.create({
    baseURL: "https://us-central1-grocerylistgenerator-ed8bb.cloudfunctions.net/api",
})

export const insertRecipe = payload => api.post(`/recipe`, payload)
export const getAllRecipes = () => api.get(`/recipes`)
export const updateRecipeById = (id, payload) => api.put(`/recipe/${id}`, payload)
export const deleteRecipeById = id => api.delete(`/recipe/${id}`)

const apis = {
    insertRecipe,
    getAllRecipes,
    updateRecipeById,
    deleteRecipeById,
}

export default apis;