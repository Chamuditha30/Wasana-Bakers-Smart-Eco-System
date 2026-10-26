import React from "react";
import sample1 from "../../images/sample1.webp";
import sample2 from "../../images/sample2.webp";
import sample3 from "../../images/sample3.webp";
import sample4 from "../../images/sample4.webp";
import sample5 from "../../images/sample5.webp";
import CakesSection from "../../components/web/CakesSection";

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

export default function CakesPage() {
  return (
    <div className="bg-surface w-full">

      {/* Heading */}
      <div className="px-4 py-10 md:px-8">     
        <h1 className="text-4xl leading-tight font-bold text-gray-800 md:text-5xl">
          Cake Catalogue
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-tertiary">
          Browse our full range of handcrafted cakes.
        </p>
      </div>

      {/* Cakes */}
      <CakesSection/>


    </div>
  );
}
