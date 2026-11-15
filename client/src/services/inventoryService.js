import { api } from "../api/axios";

//get all inventories
export const getAllInventories = async (filters) => {
  //remove empty filter values
  const params = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== ""),
  );

  //send request
  const response = await api.get("/inventory/", { params });

  return response.data.data;
};

//add inventory stock
export const addInventoryStock = async (id, amount) => {
  //send request
  const response = await api.put(`/inventory/add/${id}`, { amount });

  return response.data.data;
};

//adjust inventory stock
export const adjustInventoryStock = async (id, newAvailable) => {
  //send request
  const response = await api.put(`/inventory/adjust/${id}`, { newAvailable });

  return response.data.data;
};
