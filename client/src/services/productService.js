import { api } from "../api/axios";

//create product
export const createProduct = async (productData) => {
  //initialize form data
  const formData = new FormData();

  //append product datails
  Object.entries(productData).forEach(([key, value]) => {
    if (
      key !== "images" &&
      key !== "price" &&
      key !== "pricePerKg" &&
      key !== "weight"
    ) {
      formData.append(key, value);
    }
  });

  //append pricing details
  if (productData.pricingType === "by_weight") {
    formData.append("pricePerKg", productData.pricePerKg);
  } else {
    formData.append("price", productData.price);
  }

  //append optional weight
  if (productData.weight) {
    formData.append("weight", productData.weight);
  }

  //append images
  productData.images.forEach((image) => {
    formData.append("images", image);
  });

  //send request
  const response = await api.post("/product/create", formData);

  return response.data;
};

//get all products
export const getAllProducts = async (filters) => {
  //remove empty filter values
  const params = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== ""),
  );

  //send request
  const response = await api.get("/product/", { params });

  return response.data.data;
};

//update product
export const updateProduct = async (id, productData) => {
  //initialize form data
  const formData = new FormData();

  //separate existing images and new files
  const existingImageIds = productData.images
    .filter((image) => image.url && image.publicId)
    .map((image) => image.publicId);

  const newImages = productData.images.filter((image) => image instanceof File);

  //append product details
  Object.entries(productData).forEach(([key, value]) => {
    if (key !== "images") formData.append(key, value);
  });

  //append existing image IDs
  formData.append("existingImageIds", JSON.stringify(existingImageIds));

  //append new images
  newImages.forEach((file) => {
    formData.append("images", file);
  });

  //send request
  const response = await api.put(`/product/update/${id}`, formData);

  return response.data;
};

//disable/enable product
export const handleAvailableProduct = async (id, isEnabled) => {
  //send request
  const response = await api.put(
    `/product/${isEnabled ? "deactivate" : "activate"}/${id}`,
  );

  return response.data;
};

//delete product
export const deleteProduct = async (id) => {
  //send request
  const response = await api.delete(`/product/delete/${id}`);

  return response.data;
};
