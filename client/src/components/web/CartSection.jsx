import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";
import OrderSummary from "./OrderSummarySection";

export default function CartSection() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  const updateQuantity = (index, change) => {
    const updatedCart = cartItems.map((item, i) => {
      if (i === index) {
        const newQuantity = Math.max(1, item.quantity + change);

        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.unitPrice * newQuantity,
        };
      }

      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((item, i) => i !== index);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const total = subtotal;
  const navigate = useNavigate();

  return (
    <section className="bg-surface min-h-screen px-4 py-10 md:px-8">
      <h1 className="text-secondary mb-6 text-3xl font-bold">Cart</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: selected items */}
        <div className="space-y-4 lg:col-span-2">
          {cartItems.length === 0 ? (
            <p className="text-tertiary">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4"
              >
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
            ))
          )}
        </div>

        {/* Right: order summary*/}

        <OrderSummary
          subtotal={subtotal}
          itemCount={itemCount}
          buttonText="Proceed to Checkout"
          onButtonClick={() => navigate("/checkout")}
          disabled={cartItems.length === 0}
        >
          <CustomButton variant="outlined" onClick={() => navigate("/cakes")}>
            Continue Shopping
          </CustomButton>
        </OrderSummary>
      </div>
    </section>
  );
}
