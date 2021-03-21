import Api from "./Api";

const RESOURCE_URL = `/sales`

export const getSalesBySellerId = async () => {
    const response = await Api.get(RESOURCE_URL);
    return response.data;
}

export const createSale = async (sale) => {
    const object = { ...sale };
    const response = await Api.post(RESOURCE_URL, object);
    return response.data;
}

export const updateSale = async (sale) => {
    const object = { ...sale };
    const response = await Api.put(RESOURCE_URL, object);
    return response.data;
}

export const deleteSale = async (saleId) => {
    const response = await Api.delete(`${RESOURCE_URL}/${saleId}`);
    return response.data;
}

export const downloadReceipt = async (saleId) => {
    const response = await Api.get(`/exports/receipt/${saleId}`, { responseType: 'blob' });
    return response;
}