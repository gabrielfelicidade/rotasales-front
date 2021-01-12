import { environment } from "../environment/Environment";

const RESOURCE_URL = `${environment.API_URL}/items`

export const getItems = async () => {
    const response = await fetch(RESOURCE_URL);
    return await response.json();
}