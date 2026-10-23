import React from "react";
import CustomButton from "../../ui/CustomButton";
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

export default function PopularCakes() {
  return (
    <div className="flex w-full flex-col items-center gap-2 bg-white px-4 py-12 md:px-10 md:py-10">
      {/* Section label */}
      <p className="text-sm font-medium text-red-600">OUR SPECIALTIES</p>

      {/* Heading */}
      <h2 className="text-center text-3xl font-semibold text-gray-800">
        Popular Cakes
      </h2>

      {/* Description */}
      <p className="text-tertiary text-sm font-medium md:text-sm">
        Handcrafted with premium ingredients for every occasion
      </p>

      {/* Popular Cakes Images */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sampleCakes.slice(0, 4).map((cake) => (
          <PublicCakeCard
            key={cake.id}
            name={cake.name}
            description={cake.description}
            status={cake.status}
            price={cake.price}
            image={cake.image}
          />
        ))}
      </div>

      {/* View All Cakes Button */}
      <CustomButton variant="outlined" size="sm" className="mt-6">
        View All Cakes
      </CustomButton>
    </div>
  );
}
