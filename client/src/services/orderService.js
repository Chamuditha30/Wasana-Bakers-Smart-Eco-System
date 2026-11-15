import { api } from "../api/axios";

//create pos order
export const createPosOrder = async (saleData) => {
  //send request
  const response = await api.post("/order/create/pos", {
    ...saleData,
    paymentMethod: "cash",
  });

  return response.data.data;
};
