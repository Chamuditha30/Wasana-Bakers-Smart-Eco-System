import React from "react";
import { Copy } from "lucide-react";

export default function OrderDetailsSection({ order }) {
  const isBankTransfer = order.paymentMethod === "bank";

  const handleCopy = () => {
    navigator.clipboard.writeText(order.reference);
  };
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* order reference */}
      <div className="bg-secondary p-6 text-center text-white">
        <p className="text-xs uppercase opacity-80">ORDER REFERENCE</p>

        <h2 className="mt-1 text-3xl font-bold">{order.reference}</h2>

        <button
          type="button"
          onClick={handleCopy}
          className="mx-auto mt-2 flex items-center gap-1 text-xs hover:underline"
        >
          <Copy className="h-3 w-3" />
          Copy reference
        </button>
      </div>

      {/* order details */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-gray-500">Customer</p>
            <p className="font-medium">{order.customerName}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Pickup Time</p>
            <p className="font-medium">{order.pickupTime}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Total Amount</p>
            <p className="font-medium">Rs. {order.total.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Payment</p>
            <p className="font-medium">
              {isBankTransfer ? "Bank Transfer" : "Pay on Pickup"}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
          <div>
            <p className="mb-2 text-xs text-gray-500">Payment Status</p>

            <span className="rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Pending
            </span>
          </div>

          <div>
            <p className="mb-2 text-xs text-gray-500">Order Status</p>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                isBankTransfer
                  ? "border-orange-300 bg-orange-50 text-orange-600"
                  : "border-blue-300 bg-blue-50 text-blue-600"
              }`}
            >
              {isBankTransfer ? "Waiting Payment" : "Confirmed"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
