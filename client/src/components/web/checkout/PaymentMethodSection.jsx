import React from "react";

export default function PaymentMethodSection({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      {/* section heading */}
      <div className="mb-6 flex flex-row items-center space-x-4">
        <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
          2
        </span>

        <h2 className="text-secondary text-xl font-semibold">Payment Method</h2>
      </div>

      {/* payment options */}
      <div className="space-y-4">
        {/* Pay on pickup */}
        <label
          className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
            paymentMethod === "pickup"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="pickup"
            checked={paymentMethod === "pickup"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="accent-primary mt-1 size-5"
          />

          <div>
            <h3 className="text-secondary font-semibold">Pay on Pickup</h3>
            <p className="mt-1 text-sm text-gray-500">
              Pay when you collect your order at the bakery.
            </p>
          </div>
        </label>

        {/* Bank transfer */}
        <label
          className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
            paymentMethod === "bank"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="accent-primary mt-1 size-5"
          />

          <div>
            <h3 className="text-secondary font-semibold">Bank Transfer</h3>
            <p className="mt-1 text-sm text-gray-500">
              Transfer to our bank account. Your order will be confirmed after
              payment verification.
            </p>
          </div>
        </label>
      </div>
    </section>
  );
}
