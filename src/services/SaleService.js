import { environment } from "../environment/Environment";

const RESOURCE_URL = `${environment.API_URL}/sales`

export const getSalesBySellerId = async (sellerId = 'ffed6d38-aa9b-4c5b-8b0f-1c81d69dd011') => {
    const response = await fetch(`${RESOURCE_URL}/${sellerId}`);
    return await response.json();
}

export const createSale = async (sale) => {
    const object = { ...sale, seller: { id: 'ffed6d38-aa9b-4c5b-8b0f-1c81d69dd011' } };
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