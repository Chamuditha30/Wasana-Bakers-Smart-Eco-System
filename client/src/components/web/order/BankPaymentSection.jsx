import React from "react";
import { CreditCard, AlertCircle } from "lucide-react";

export default function BankPaymentSection({ order }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      {/* Payment Remainder */}
      <div className="mb-5 rounded-lg border border-orange-200 bg-orange-50 p-3">
        <p className="text-sm text-orange-700">
          Please complete your bank transfer using
          <span className="font-bold"> {order.reference} </span>
          as the payment reference.
        </p>
      </div>

      {/* Instruction Card */}
      <div className="rounded-xl border border-gray-200 p-5">
        {/* Heading */}
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-red-50 p-3">
            <CreditCard className="text-primary h-6 w-6" />
          </div>

          <h2 className="text-secondary text-xl font-semibold">
            Payment Instructions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Complete your bank transfer to confirm your order.
          </p>
        </div>

        {/* Bank Details */}
        <div className="space-y-3 border-t border-gray-200 pt-4">
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-500">Bank</span>
            <span className="text-right font-medium">Bank of Ceylon</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-500">Account Name</span>
            <span className="text-right font-medium">
              Wasana Bakers (Pvt) Ltd
            </span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-500">Account Number</span>
            <span className="text-right font-medium">1234 5678 9012</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-500">Branch</span>
            <span className="text-right font-medium">Anuradhapura</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-500">Payment Reference</span>
            <span className="text-primary font-bold">{order.reference}</span>
          </div>
        </div>

        {/* Important notice */}
        <div className="mt-5 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />

          <p className="text-xs text-red-600">
            Important: Use {order.reference} as your payment reference. Your
            order will be confirmed after we verify the transfer.
          </p>
        </div>
      </div>
    </section>
  );
}
