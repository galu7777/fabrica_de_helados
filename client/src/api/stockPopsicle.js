import { axiosFetch, Endpoints } from "./config";

export const getStockPopsicle = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.StockPopsicle.GetStockPopsicle,
    });
}
