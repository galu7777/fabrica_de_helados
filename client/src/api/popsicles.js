import { axiosFetch, Endpoints } from "./config";

export const getPopsicle = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.Popsicle.GetPopsicle,
    });
}
