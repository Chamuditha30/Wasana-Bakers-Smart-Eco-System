import React from "react";
import Carousel from "./Carousel";
import { useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

export default function SaleCakeCard({ product, onAdd }) {
  //check pricing type
  const isByWeight = product.pricingType === "by_weight";

  //initialize input
  const [amount, setAmount] = useState("1");

  //get unit price
  const unitPrice = isByWeight ? product.pricePerKg : product.price;

  //calculate line total
  const lineTotal = unitPrice * Number(amount || 0);

  //add product
  const handleAdd = () => {
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return;
    }

    onAdd(amount);
    setAmount("1");
  };

  return (
    <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white transition-shadow duration-300 ease-out hover:shadow-lg">
      <p
        className={`absolute top-2 left-2 z-10 rounded-full border px-4 py-1 font-semibold ${status == "Available" ? "border-green-600 bg-green-100 text-green-600" : status == "Limited" ? "border-yellow-600 bg-yellow-100 text-yellow-600" : "border-red-600 bg-red-100 text-red-600"}`}
      >
        {product.status}
      </p>

      <div className="transition-transform duration-500 ease-out group-hover:scale-110">
        <Carousel images={product.images} />
      </div>

      <div className="flex flex-1 flex-col bg-white p-3">
        <p className="text-secondary text-lg font-semibold">{product.name}</p>

        <p className="mt-1 mb-4 text-sm font-medium">
          Rs. {unitPrice.toLocaleString("en-LK")}
          <span className="text-tertiary text-xs">
            {isByWeight ? " / kg" : " / cake"}
          </span>
        </p>

        {/* weight or quantity */}
        <CustomInput
          label={isByWeight ? "Weight (kg)" : "Quantity"}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1"
          min={isByWeight ? "0.1" : "1"}
          step={isByWeight ? "0.1" : "1"}
        />

        {/* line total */}
        <div className="my-3 flex items-center justify-between">
          <span className="text-tertiary text-sm">Subtotal</span>

          <span className="text-secondary font-semibold">
            Rs. {lineTotal.toLocaleString("en-LK")}
          </span>
        </div>

        {/* add button */}
        <CustomButton onClick={handleAdd} className="mt-auto">
          Add to Sale
        </CustomButton>
      </div>
    </div>
  );
}
