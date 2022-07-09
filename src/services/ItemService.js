import Api from "./Api";

const RESOURCE_URL = `/items`

export const getItemsByEventId = async (eventId) => {
    const response = await Api.get(`${RESOURCE_URL}?eventId=${eventId}`);
    return response.data;
}