import { axiosFetch, Endpoints } from "./config";

export const getInventory = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.Inventory.GetInventory,
    });
}
