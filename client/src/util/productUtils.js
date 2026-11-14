//validate form
export const validateProductForm = (data, images) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Product name is required";
  }

  if (!data.category) {
    errors.category = "Please select a category";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
  }

  if (images.length === 0) {
    errors.images = "At least one image is required";
  }

  if (data.pricingType === "by_weight") {
    if (!data.pricePerKg || Number(data.pricePerKg) <= 0) {
      errors.pricePerKg = "Enter a valid price";
    }
  } else {
    if (!data.price || Number(data.price) <= 0) {
      errors.price = "Enter a valid price";
    }
  }

  return errors;
};

//validate status and return it
export const validateProductStatus = (
  isAvailable,
  available,
  lowStockThreshold,
) => {
  //check product availability
  if (!isAvailable) return "Unavailable";

  //check stock
  if (available <= 0) return "Sold Out";

  //check low stock
  if (available <= lowStockThreshold) return "Limited";

  return "Available";
};

//update filter values
export const updateFilters = (prev, name, value) => ({
  ...prev,
  [name]: value,
  page: 1,
});

//reset filters
export const resetFilters = (initialFilters) => ({
  ...initialFilters,
});
