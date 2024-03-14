import { axiosFetch, Endpoints } from "./config";

export const getCliente = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.Client.GetClients,
    });
}
