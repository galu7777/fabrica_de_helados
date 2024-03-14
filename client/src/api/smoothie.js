import { axiosFetch, Endpoints } from "./config";

export const getSmoothies = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.Smoothie.GetSmoothies,
    });
}
