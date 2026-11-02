import React from "react";

export default function CakeQuantitySection({
  quantity,
  setQuantity,
}) {
  return (
    <div>
      <h3 className="mb-3 font-semibold">Quantity</h3>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          disabled={quantity === 1}
          className="rounded-lg border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <span className="text-lg font-semibold">{quantity}</span>

        <button
          type="button"
          onClick={() => setQuantity((prev) => prev + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2"
        >
          +
        </button>
      </div>
    </div>
  );
}
