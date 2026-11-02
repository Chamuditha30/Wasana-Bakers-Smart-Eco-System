import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CakeInformationSection from "../../components/web/cakeDetails/CakeInformationSection";
import CakeSizeSection from "../../components/web/cakeDetails/CakeSizeSection";
import CakeQuantitySection from "../../components/web/cakeDetails/CakeQuantitySection";
import CakeMessageSection from "../../components/web/cakeDetails/CakeMessageSection";
import CakePurchaseSection from "../../components/web/cakeDetails/CakePurchaseSection";

const cakeSizes = [
  { name: "500g", price: 950 },
  { name: "1kg", price: 1750 },
  { name: "1.5kg", price: 2450 },
  { name: "2kg", price: 3100 },
];

export default function CakeDetailsPage() {
  const location = useLocation();
  const cake = location.state?.cake;
  const [selectedSize, setSelectedSize] = useState("500g");
  const selectedCakeSize = cakeSizes.find((size) => size.name === selectedSize);
  const selectedPrice = selectedCakeSize?.price ?? 0;
  const [quantity, setQuantity] = useState(1);
  const totalPrice = selectedPrice * quantity;
  const [cakeMessage, setCakeMessage] = useState("");
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cartItem = {
      cakeId: cake.id,
      name: cake.name,
      image: cake.image,
      size: selectedSize,
      unitPrice: selectedPrice,
      quantity: quantity,
      message: cakeMessage.trim(),
      totalPrice: totalPrice,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = [...existingCart, cartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    navigate("/cart");
  };

  if (!cake) {
    return (
      <div className="p-8">
        <p>Cake details not found.</p>
        <Link to="/cakes">Back to Cakes</Link>
      </div>
    );
  }

  return (
    <div className="bg-surface px-4 py-10 md:px-8">
      {/* Breadcrumb */}
      <nav className="text-tertiary text-sm">
        <Link to="/">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/cakes">Cakes</Link>
        <span className="mx-2">/</span>
        <span className="text-secondary font-medium">{cake.name}</span>
      </nav>

      {/* Cake details grid */}
      <div className="bg-surface grid grid-cols-1 gap-8 py-5 md:grid-cols-2">
        {/* Left side */}
        <div className="">
          <img
            src={cake.image}
            alt={cake.name}
            className="aspect-square w-full rounded-2xl object-cover"
          />
        </div>

        {/* Right side */}
        <div className="space-y-4">
          <CakeInformationSection cake={cake} selectedPrice={selectedPrice} />

          {/* size */}
          <CakeSizeSection
            cakeSizes={cakeSizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />

          {/* Quantity */}
          <CakeQuantitySection quantity={quantity} setQuantity={setQuantity} />

          {/* optional cake message */}
          <CakeMessageSection
            cakeMessage={cakeMessage}
            setCakeMessage={setCakeMessage}
          />

          {/* Total Price and Action Buttons */}
          <CakePurchaseSection
            totalPrice={totalPrice}
            onBackToCakes={() => navigate("/cakes")}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}
