import { axiosFetch, Endpoints } from "./config";

export const getInventoryPopsicles = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.InventoryPopsicle.GetInventoryPopsicle,
    });
}
