import { axiosFetch, Endpoints } from "./config";

export const getStockMateriaPrima = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.StockMateriaPrima.GetStockMateriaPrima,
    });
}
