import React from "react";
import { Phone } from "lucide-react";
import OrderStatusTimeline from "./OrderStatusTimeline";

export default function OrderTrackingDetails({ order }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Reference and status */}
      <div className="bg-secondary flex items-center justify-between gap-3 p-5 text-white">
        <div>
          <p className="text-xs opacity-80">Order Reference</p>
          <h2 className="mt-1 text-3xl font-bold">{order.reference}</h2>
        </div>

        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
          {order.status}
        </span>
      </div>

      <div className="space-y-5 p-5">
        {/* Order information */}
        <div className="grid grid-cols-2 gap-5 text-sm">
          <div>
            <p className="text-gray-500">Customer</p>
            <p className="font-medium">{order.customerName}</p>
          </div>

          <div>
            <p className="text-gray-500">Pickup Time</p>
            <p className="font-medium">{order.pickupTime}</p>
          </div>

          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="font-medium">Rs. {order.total.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-gray-500">Payment</p>
            <p className="font-medium">{order.paymentStatus}</p>
          </div>
        </div>

        {/* Order progress */}
        <OrderStatusTimeline currentStatus={order.progressStatus} />

        {/* Contact bakery */}
        <a
          href="tel:+94773864052"
          className="text-primary flex items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-3 text-sm font-semibold hover:bg-red-50"
        >
          <Phone className="h-4 w-4" />
          Contact Bakery
        </a>
      </div>
    </section>
  );
}
