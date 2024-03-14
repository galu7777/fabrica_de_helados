import { axiosFetch, Endpoints } from "./config";

export const getTypePopsicle = () => {
    return axiosFetch({
        method: "GET",
        url: Endpoints.TypePopsicle.GetTypePopsicle,
    });
}
