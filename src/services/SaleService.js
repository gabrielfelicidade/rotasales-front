import Api from "./Api";

const RESOURCE_URL = `/sales`

export const getSalesBySellerId = async (filterModel) => {
    const response = await Api.get(`${RESOURCE_URL}?buyer=${filterModel.buyer}&donation=${filterModel.donation}&eventId=${filterModel.event}&page=${filterModel.page}&limit=10`);
    return response.data;
}

export const getSaleById = async (saleId) => {
    const response = await Api.get(`${RESOURCE_URL}/${saleId}`);
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

export const changeSaleStatus = async (saleId, status) => {
    const object = { id: saleId, status };
    const response = await Api.patch(RESOURCE_URL, object);
    return response;
}

export const downloadReceipt = async (saleId) => {
    const response = await Api.get(`/sales/receipt/${saleId}`, { responseType: 'blob' });
    return response;
}