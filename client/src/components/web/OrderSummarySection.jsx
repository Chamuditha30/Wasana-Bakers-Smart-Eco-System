import React from "react";
import CustomButton from "../../ui/CustomButton";

export default function OrderSummarySection({
  subtotal,
  itemCount,
  buttonText,
  onButtonClick,
  disabled = false,
  children,
}) {
  return (
    <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="mb-6 text-lg font-semibold">
        Order Summary
      </h2>

      <div className="space-y-3 border-b border-gray-200 pb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal ({itemCount} items)</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Pickup</span>
          <span>Free</span>
        </div>
      </div>

      <div className="flex items-center justify-between py-5">
        <span className="text-lg font-bold">Total</span>
        <span className="text-xl font-bold text-red-600">
          Rs. {subtotal.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <CustomButton
          variant="primary"
          disabled={disabled}
          onClick={onButtonClick}
        >
          {buttonText}
        </CustomButton>

        {children}
      </div>
    </div>
  );
}
