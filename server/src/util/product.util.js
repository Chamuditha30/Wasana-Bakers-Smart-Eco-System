import { createError } from "./error.util.js";

//validate product pricing
export const validateProductPricing = ({ pricingType, pricePerKg, price }) => {
  //check pricing type
  if (!pricingType) throw createError("Pricing type is required", 400);

  if (pricingType === "by_weight") {
    if (pricePerKg === undefined || pricePerKg <= 0) {
      throw createError("A valid price per kg is required", 400);
    }

    return;
  }

  if (pricingType === "fixed") {
    if (price === undefined || price <= 0) {
      throw createError("A valid fixed price is required", 400);
    }

    return;
  }

  throw createError("Invalid pricing type", 400);
};
