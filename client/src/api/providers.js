import { axiosFetch, Endpoints } from "./config";

export const getProviders = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.Provider.GetProviders,
    });
}
