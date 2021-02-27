import Api from "./Api";

const RESOURCE_URL = `/events`

export const getActiveEvents = async () => {
    const response = await Api.get(RESOURCE_URL);
    return response.data;
}