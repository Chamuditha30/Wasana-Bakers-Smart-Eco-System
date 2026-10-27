import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";

const cakeSizes = [
  { name: "500g", price: 950 },
  { name: "1kg", price: 1750 },
  { name: "1.5kg", price: 2450 },
  { name: "2kg", price: 3100 },
];

export default function CakeDetailsSection() {
  const location = useLocation();
  const cake = location.state?.cake;
  const [selectedSize, setSelectedSize] = useState("500g");
  const selectedCakeSize = cakeSizes.find((size) => size.name === selectedSize);
  const selectedPrice = selectedCakeSize?.price ?? 0;
  const [quantity, setQuantity] = useState(1);
  const totalPrice = selectedPrice * quantity;
  const [cakeMessage, setCakeMessage] = useState("");
  const navigate = useNavigate();

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
          <h1 className="text-secondary text-3xl font-bold">{cake.name}</h1>

          <p className="text-tertiary">{cake.description}</p>

          <p className="text-2xl font-bold text-red-600">
            Rs. {selectedPrice.toLocaleString()}
          </p>

          {/* size */}
          <div>
            <h3 className="mb-3 font-semibold">Select Size</h3>

            {/* size option */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {cakeSizes.map((size) => (
                <button
                  key={size.name}
                  type="button"
                  onClick={() => setSelectedSize(size.name)}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium ${
                    selectedSize === size.name
                      ? "border-red-600 bg-red-100 text-red-600"
                      : "border-gray-300 bg-white text-gray-700"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">{size.name}</span>
                    <span className="text-xs">
                      Rs. {size.price.toLocaleString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="mb-3 font-semibold">Quantity</h3>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>

              <span className="text-lg font-semibold">{quantity}</span>

              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="rounded-lg border border-gray-300 px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          {/* optional cake message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cakeMessage" className="text-muted font-semibold">
              Cake Message (Optional)
            </label>

            <textarea
              id="cakeMessage"
              value={cakeMessage}
              onChange={(e) => setCakeMessage(e.target.value)}
              placeholder="E.g. Happy Birthday!"
              maxLength={100}
              rows={3}
              className="border-border focus:border-primary focus:ring-primary w-full rounded border px-4 py-2 transition-colors outline-none focus:ring-1 md:rounded-lg"
            />

            <p className="text-muted text-right text-sm">
              {cakeMessage.length}/100
            </p>
          </div>

          {/* total price */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="text-lg font-medium">Total Price</span>

            <span className="text-2xl font-bold text-red-600">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <CustomButton
              variant="outlined"
              onClick={() => navigate("/cakes")}
            >
              Back to Cakes
            </CustomButton>

            <CustomButton
              variant="primary"
              onClick={() => console.log("Add to Cart clicked")}
            >
              Add to Cart
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
