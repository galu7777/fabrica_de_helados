import { axiosFetch, Endpoints } from "./config";

export const getSales = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.Sale.GetSales,
    });
}
