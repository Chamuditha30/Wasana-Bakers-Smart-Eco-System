import React, { useState } from "react";
import { Search } from "lucide-react";
import PublicCakeCard from "../../ui/PublicCakeCard";
import sample1 from "../../images/sample1.webp";
import sample2 from "../../images/sample2.webp";
import sample3 from "../../images/sample3.webp";
import sample4 from "../../images/sample4.webp";
import sample5 from "../../images/sample5.webp";

const sampleCakes = [
  {
    id: 1,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with creamy chocolate frosting.",
    status: "Available",
    price: 3500,
    image: sample1,
  },
  {
    id: 2,
    name: "Butter Cake",
    description: "Soft and delicious classic butter cake.",
    status: "Limited",
    price: 2800,
    image: sample2,
  },
  {
    id: 3,
    name: "Vanilla Cake",
    description: "Light vanilla sponge cake with smooth cream frosting.",
    status: "Available",
    price: 3000,
    image: sample3,
  },
  {
    id: 4,
    name: "Red Velvet Cake",
    description: "Soft red velvet cake with creamy cheese frosting.",
    status: "Sold Out",
    price: 4200,
    image: sample4,
  },
  {
    id: 5,
    name: "Strawberry Cake",
    description: "Fresh strawberry cake with strawberry cream.",
    status: "Available",
    price: 3800,
    image: sample5,
  },
];

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

export default function CakesSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");

  return (
    <section className="w-full px-4 pb-10 md:px-8 justify-between">

      {/* Search and Filter Container */}
      <div className="rounded-2xl bg-white p-4 shadow-md">

        {/* Search Bar */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 focus-within:border-red-600">
          <Search className="h-5 w-5 text-gray-600" />

          <input
            type="text"
            placeholder="Search cakes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-gray-700 outline-none"
          />
        </div>

        {/* Filter Options */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mt-4">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  category === item ? "bg-red-600 text-white": "bg-surface text-tertiary"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* Availability Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            {availabilityOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setAvailability(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  availability === item ? "bg-gray-800 text-white": "bg-gray-100 text-gray-600"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </div>
      </div>

      {/* Cake card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {sampleCakes.map((cake) => (
          <PublicCakeCard
            key={cake.id}
            name={cake.name}
            description={cake.description}
            status={cake.status}
            price={cake.price}
            image={cake.image}
            cake={cake}
          />
        ))}
      </div>
      
    </section>
  );
}