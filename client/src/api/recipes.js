import { axiosFetch, Endpoints } from "./config";

export const getRecipes = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.Recipe.GetRecipes,
    });
}
