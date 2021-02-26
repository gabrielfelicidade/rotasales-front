import { environment } from "../environment/Environment";
import Api from "./Api";

const RESOURCE_URL = `${environment.API_URL}/items`

export const getItems = async () => {
    const response = await Api.get(RESOURCE_URL);
    return response.data;
}