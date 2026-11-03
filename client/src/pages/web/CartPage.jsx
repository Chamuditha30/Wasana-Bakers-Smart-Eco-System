import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";
import OrderSummary from "../../components/web/OrderSummarySection";
import CartItem from "../../components/web/cart/CartItem";

export default function CartPage() {
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
              <CartItem
                key={index}
                item={item}
                index={index}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
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
