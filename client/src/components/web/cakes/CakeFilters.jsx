import React from "react";

const categories = [
  "All",
  "Birthday Cakes",
  "Regular Cakes",
  "Celebration Cakes",
];

const availabilityOptions = [
  "All",
  "Available",
  "Limited",
  "Sold Out",
];

export default function CakeFilters({
  category,
  setCategory,
  availability,
  setAvailability,
}) {
    
  return (
    <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row">

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${
              category === item
                ? "bg-red-600 text-white"
                : "bg-surface text-tertiary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Availability Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {availabilityOptions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setAvailability(item)}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${
              availability === item
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

    </div>
  );
}
