import { environment } from "../environment/Environment";

const RESOURCE_URL = `${environment.API_URL}/sales`

export const getSalesBySellerId = async (sellerId = 'cf620e00-e634-493c-acdb-fa038b4cba3b') => {
    const response = await fetch(`${RESOURCE_URL}/${sellerId}`);
    return await response.json();
}

export const createSale = async (sale) => {
    const object = { ...sale, seller: { id: 'cf620e00-e634-493c-acdb-fa038b4cba3b' } };
    const response = await fetch(RESOURCE_URL, { method: 'POST', body: JSON.stringify(object), headers: { 'Content-Type': 'application/json' } });
    return await response.json();
}

export const updateSale = async (sale) => {
    const response = await fetch(RESOURCE_URL, { method: 'PUT', body: JSON.stringify(sale), headers: { 'Content-Type': 'application/json' } });
    return await response.json();
}

export const deleteSale = async (saleId) => {
    const response = await fetch(`${RESOURCE_URL}/${saleId}`, { method: 'DELETE' });
    return await response.json();
}