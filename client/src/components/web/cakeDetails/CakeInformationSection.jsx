import React from "react";

export default function CakeInformationSection({ cake, selectedPrice }) {
  return (
    <>
      <h1 className="text-secondary text-3xl font-bold">
        {cake.name}
      </h1>

      <p className="text-tertiary">
        {cake.description}
      </p>

      <p className="text-2xl font-bold text-red-600">
        Rs. {selectedPrice.toLocaleString()}
      </p>
    </>
  );
}
