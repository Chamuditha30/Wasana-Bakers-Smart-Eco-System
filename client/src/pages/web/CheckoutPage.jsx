import React, { useState } from "react";
import CustomerDetailsSection from "../../components/web/checkout/CustomerDetailsSection";
import PaymentMethodSection from "../../components/web/checkout/PaymentMethodSection";
import PickupSection from "../../components/web/checkout/PickupSection";
import OrderSummary from "../../components/web/OrderSummarySection";

export default function CheckoutPage() {
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("pickup");
  const [pickupTime, setPickupTime] = useState("");

  const [cartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handlePlaceOrder = () => {
    const newErrors = {};

    // Validate full name
    if (!customerDetails.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Validate Sri Lankan mobile number
    const phoneRegex = /^(?:0|\+94)7[0-9]{8}$/;

    const phone = customerDetails.phoneNumber.replace(/[\s-]/g, "");

    if (!phoneRegex.test(phone)) {
      newErrors.phoneNumber = "Enter a valid Sri Lankan mobile number";
    }

    // Validate pickup time
    if (!pickupTime) {
      newErrors.pickupTime = "Please select a pickup time";
    }

    // Validate cart
    if (cartItems.length === 0) {
      newErrors.cart = "Your cart is empty";
    }

    setErrors(newErrors);

    // Stop if validation failed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Frontend testing only
    console.log("Validated checkout data:", {
      customerDetails,
      paymentMethod,
      pickupTime,
      cartItems,
      subtotal,
    });
  };

  const [errors, setErrors] = useState({});

  return (
    <main className="bg-surface min-h-screen px-4 py-10 md:px-8">
      <h1 className="text-secondary mb-6 text-3xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: input details */}
        <div className="space-y-6 lg:col-span-2">
          {/* customer details */}
          <CustomerDetailsSection
            customerDetails={customerDetails}
            setCustomerDetails={setCustomerDetails}
            errors={errors}
          />

          {/* payment method */}
          <PaymentMethodSection
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            error={errors.pickupTime}
          />

          {/* pickup */}
          <PickupSection
            pickupTime={pickupTime}
            setPickupTime={setPickupTime}
          />
        </div>

        {/* Right: order summary */}
        <div>
          <OrderSummary
            subtotal={subtotal}
            itemCount={itemCount}
            buttonText="Place Order"
            onButtonClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
          />
          <p className="mt-3 text-center text-sm text-gray-500">
            No account required.
          </p>
        </div>
      </div>
    </main>
  );
}
