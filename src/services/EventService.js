import { environment } from "../environment/Environment";

const RESOURCE_URL = `${environment.API_URL}/events`

export const getActiveEvents = async () => {
    const response = await fetch(RESOURCE_URL);
    return await response.json();
}