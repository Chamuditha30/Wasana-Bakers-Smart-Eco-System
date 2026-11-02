import React, { useState } from "react";
import TrackOrderSearch from "../../components/web/tracking/TrackOrderSearchSection";
import OrderTrackingDetails from "../../components/web/tracking/OrderTrackingDetailsSection";

export default function TrackOrderPage() {
  const [orderReference, setOrderReference] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Tracking request:", {
      orderReference,
      phoneNumber,
    });

    // Frontend preview only
    setTrackedOrder(sampleOrder);
  };

  const sampleOrder = {
    reference: "WB1095",
    customerName: "Kamal Perera",
    pickupTime: "10:00 AM - 11:00 AM",
    total: 950,
    status: "Waiting Payment",
    paymentStatus: "Pending",
    progressStatus: "Order Created",
  };

  return (
    <main className="bg-surface min-h-screen px-4 py-12 md:px-8">
      <div className="mx-auto max-w-xl">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-secondary text-3xl font-bold">Your Order</h1>

          <p className="text-tertiary mt-2 text-sm">
            Enter your order reference and phone number to check status
          </p>
        </div>

        {/* Search Form */}
        <TrackOrderSearch
          orderReference={orderReference}
          setOrderReference={setOrderReference}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onSearch={handleSearch}
        />

        {/* Tracking Details */}
        {trackedOrder && (
          <div className="mt-8">
            <OrderTrackingDetails order={trackedOrder} />
          </div>
        )}
      </div>
    </main>
  );
}
