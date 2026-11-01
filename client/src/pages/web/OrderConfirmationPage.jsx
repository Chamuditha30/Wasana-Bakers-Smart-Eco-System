import React from "react";
import OrderSuccessHeaderSection from "../../components/web/order/OrderSuccessHeaderSection";
import OrderDetailsSection from "../../components/web/order/OrderDetailsSection";
import BankPaymentSection from "../../components/web/order/BankPaymentSection";
import ConfirmationActionsSection from "../../components/web/order/ConfirmationActionsSection";

export default function OrderConfirmationPage() {
  const sampleOrder = {
    reference: "WB1095",
    customerName: "Kamal Perera",
    pickupTime: "10:00 AM - 11:00 AM",
    total: 950,
    paymentMethod: "bank",
  };

  return (
    <main className="bg-surface min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-xl space-y-6">
        {/* Order Success Header */}
        <OrderSuccessHeaderSection />

        {/* Order Details */}
        <OrderDetailsSection order={sampleOrder} />

        {/* Bank Payment Instructions */}
        {sampleOrder.paymentMethod === "bank" && (
          <BankPaymentSection order={sampleOrder} />
        )}

        {/* Confirmation Actions */}
        <ConfirmationActionsSection />
      </div>
    </main>
  );
}
