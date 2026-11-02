import React from "react";

export default function CakeSizeSection({
  cakeSizes,
  selectedSize,
  setSelectedSize,
}) {
  return (
    <div>
      <h3 className="mb-3 font-semibold">Select Size</h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cakeSizes.map((size) => (
          <button
            key={size.name}
            type="button"
            onClick={() => setSelectedSize(size.name)}
            className={`rounded-lg border px-3 py-3 text-sm font-medium ${
              selectedSize === size.name
                ? "border-red-600 bg-red-100 text-red-600"
                : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-semibold">{size.name}</span>
              <span className="text-xs">
                Rs. {size.price.toLocaleString()}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
