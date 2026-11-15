import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import CustomInput from "../../../ui/CustomInput";
import CustomSelect from "../../../ui/CustomSelect";
import CustomButton from "../../../ui/CustomButton";
import ImageUploader from "../../../ui/ImageUploader";
import {
  categories,
  initialProductData,
  pricingTypes,
} from "../../../constants/productConstants";
import { validateProductForm } from "../../../util/productUtils";
import { createProduct } from "../../../services/productService";

export default function AddProductModal({ isOpen, onClose, onCreate }) {
  //initialize data
  const [data, setData] = useState(initialProductData);

  //initialize images
  const [images, setImages] = useState([]);

  //initialize errors
  const [errors, setErrors] = useState({});

  //initialize loading
  const [loading, setLoading] = useState(false);

  //handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "pricingType" ? { pricePerKg: "", price: "" } : {}),
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "pricingType" ? { pricePerKg: "", price: "" } : {}),
    }));
  };

  //handle select changes
  const handleSelectChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "pricingType" ? { pricePerKg: "", price: "" } : {}),
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "pricingType" ? { pricePerKg: "", price: "" } : {}),
    }));
  };

  //handle image changes
  const handleImagesChange = (files) => {
    setImages(files);
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  //reset form
  const resetForm = () => {
    setData(initialProductData);
    setImages([]);
    setErrors({});
  };

  //handle modal close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate form
    const validationErrors = validateProductForm(data, images);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      //prepare product data
      const productData = { ...data, images };

      //call api
      await createProduct(productData);

      //refetch products
      await onCreate();

      resetForm();
      onClose();
    } catch (error) {
      console.error(
        "Product creation failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* background overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* modal container */}
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-4 shadow-xl">
          <DialogTitle className="mb-6 text-xl font-semibold">
            Add New Product
          </DialogTitle>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-2"
          >
            <CustomInput
              label="Product Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
              error={errors.name}
            />

            <CustomSelect
              label="Category"
              value={data.category}
              onChange={(value) => handleSelectChange("category", value)}
              options={categories}
              placeholder="Select category"
              required
              error={errors.category}
            />

            <CustomInput
              label="Description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              required
              error={errors.description}
            />

            <ImageUploader
              value={images}
              onChange={handleImagesChange}
              error={errors.images}
            />

            <CustomSelect
              label="Pricing Type"
              value={data.pricingType}
              onChange={(value) => handleSelectChange("pricingType", value)}
              options={pricingTypes}
              required
            />

            {data.pricingType === "by_weight" ? (
              <CustomInput
                label="Price Per Kg (Rs.)"
                name="pricePerKg"
                type="number"
                value={data.pricePerKg}
                onChange={handleInputChange}
                placeholder="Enter price per kg"
                required
                min="0"
                error={errors.pricePerKg}
              />
            ) : (
              <CustomInput
                label="Price (Rs.)"
                name="price"
                type="number"
                value={data.price}
                onChange={handleInputChange}
                placeholder="Enter fixed price"
                required
                min="0"
                error={errors.price}
              />
            )}

            <CustomInput
              label="Weight (kg)"
              name="weight"
              value={data.weight}
              onChange={handleInputChange}
              placeholder="Enter weight (optional)"
            />

            <div className="flex w-full items-center justify-center gap-2">
              <CustomButton type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </CustomButton>
              <CustomButton
                variant="outlined"
                disabled={loading}
                onClick={handleClose}
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
