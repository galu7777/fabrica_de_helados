import { axiosFetch, Endpoints } from "./config";

export const getIngredients = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.Ingredient.GetIngredients,
    });
}