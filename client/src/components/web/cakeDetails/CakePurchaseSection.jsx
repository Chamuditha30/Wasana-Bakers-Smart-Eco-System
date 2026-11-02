import React from "react";
import CustomButton from "../../../ui/CustomButton";

export default function CakePurchaseSection({
  totalPrice,
  onBackToCakes,
  onAddToCart,
}) {
  return (
    <>
      {/* total price */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-lg font-medium">Total Price</span>

        <span className="text-2xl font-bold text-red-600">
          Rs. {totalPrice.toLocaleString()}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <CustomButton
          variant="outlined"
          onClick={onBackToCakes}
        >
          Back to Cakes
        </CustomButton>

        <CustomButton
          variant="primary"
          onClick={onAddToCart}
        >
          Add to Cart
        </CustomButton>
      </div>
    </>
  );
}
