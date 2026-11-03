
import React from "react";
import { Trash2 } from "lucide-react";

export default function CartItem({
  item,
  index,
  updateQuantity,
  removeItem,
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4">
      {/* cake image */}
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 shrink-0 rounded-xl object-cover"
      />

      {/* cake info */}
      <div className="min-w-0 flex-1">
        <h2 className="text-secondary font-semibold">{item.name}</h2>

        <p className="text-tertiary text-sm">Size: {item.size}</p>

        {item.message && (
          <p className="text-tertiary text-sm">
            Message: {item.message}
          </p>
        )}

        {/* quantity control */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            className="rounded-md border border-gray-300 px-2 py-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => updateQuantity(index, -1)}
            disabled={item.quantity === 1}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            className="rounded-md border px-2 py-0.5"
            onClick={() => updateQuantity(index, 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* price and delete */}
      <div className="flex flex-col items-end justify-between gap-3">
        <button
          type="button"
          onClick={() => removeItem(index)}
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 className="h-5 w-5 text-gray-600" />
        </button>

        <p className="font-semibold whitespace-nowrap">
          Rs. {(item.unitPrice * item.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
