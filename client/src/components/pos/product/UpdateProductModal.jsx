import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import {
  categories,
  initialProductData,
  pricingTypes,
} from "../../../constants/productConstants";
import CustomInput from "../../../ui/CustomInput";
import CustomSelect from "../../../ui/CustomSelect";
import ImageUploader from "../../../ui/ImageUploader";
import { validateProductForm } from "../../../util/productUtils";
import { deleteProduct, updateProduct } from "../../../services/productService";
import { Trash } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

export default function UpdateProductModal({
  isOpen,
  onClose,
  onUpdate,
  product,
}) {
  //initialize auth
  const { user } = useAuth();

  //initialize data
  const [data, setData] = useState(initialProductData);

  //initialize images
  const [images, setImages] = useState([]);

  //initialize errors
  const [errors, setErrors] = useState({});

  //initialize loading
  const [loading, setLoading] = useState(false);

  //get product
  useEffect(() => {
    if (product && isOpen) {
      setData({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        pricingType: product.pricingType || "by_weight",
        pricePerKg: product.pricePerKg ?? "",
        price: product.price ?? "",
        weight: product.weight ?? "",
      });

      setImages(product.images || []);
      setErrors({});
    }
  }, [product, isOpen]);

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

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate form
    const validationErrors = validateProductForm(data, images);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      //prepare updated product data
      const productData = { ...data, images };

      //call api
      await updateProduct(product._id, productData);

      //refetch products
      await onUpdate();

      onClose();
    } catch (error) {
      console.error(
        "Product update failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  //handle product delete
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      //call api
      await deleteProduct(product._id);

      //refetch products
      await onUpdate();

      onClose();
    } catch (error) {
      console.error(
        "Product delete failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* background overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* modal container */}
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-4 shadow-xl">
          <DialogTitle className="mb-6 text-xl font-semibold">
            Update Product
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
              required
              error={errors.name}
            />

            <CustomSelect
              label="Category"
              value={data.category}
              onChange={(value) => handleSelectChange("category", value)}
              options={categories}
              required
              error={errors.category}
            />

            <CustomInput
              label="Description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
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
              disabled
            />

            {data.pricingType === "by_weight" ? (
              <CustomInput
                label="Price Per Kg (Rs.)"
                name="pricePerKg"
                type="number"
                value={data.pricePerKg}
                onChange={handleInputChange}
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
                {loading ? "Updating..." : "Update"}
              </CustomButton>
              <CustomButton variant="secondary" onClick={() => onClose()}>
                Cancel
              </CustomButton>
              <CustomButton
                onClick={handleDelete}
                variant="secondary"
                disabled={loading}
                className={`${user.role === "admin" ? "block" : "hidden"}`}
              >
                {loading ? "Deleting..." : <Trash className="text-primary" />}
              </CustomButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
