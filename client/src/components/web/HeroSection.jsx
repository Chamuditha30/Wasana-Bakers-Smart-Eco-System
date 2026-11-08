import React from "react";
import CustomButton from "../../ui/CustomButton";
import sample1 from "../../images/sample1.webp";
import sample2 from "../../images/sample2.webp";
import sample3 from "../../images/sample3.webp";
import sample4 from "../../images/sample4.webp";
import sample5 from "../../images/sample5.webp";
import Carousel from "../../ui/Carousel";

//sample images
const images = [
  { src: sample1, alt: "sample1" },
  { src: sample2, alt: "sample2" },
  { src: sample3, alt: "sample3" },
  { src: sample4, alt: "sample4" },
  { src: sample5, alt: "sample5" },
];

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-between gap-10 px-4 py-12 md:flex-row md:px-10 md:py-20">
      {/* left side content */}
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        {/* Branch name */}
        <div className="w-fit rounded-full border border-red-600 bg-red-100 px-3 py-1">
          <p className="text-sm font-medium text-red-600">
            Anuradhapura Branch
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
          Freshly Baked for Every{" "}
          <span className="text-red-700">Special Moment</span>
        </h1>

        {/* Description */}
        <p className="max-w-xl text-lg leading-relaxed text-gray-600">
          Explore our handcrafted cakes and place your order for convenient
          pickup at our Anuradhapura branch. Made with love, ready when you are.
        </p>

        {/* buttons*/}
        <div className="flex flex-wrap gap-2">
          <CustomButton size="sm">Order Now</CustomButton>

          <CustomButton variant="outlined" size="sm">
            View Cakes
          </CustomButton>
        </div>
      </div>

      {/* right side content */}
      <div className="flex w-full items-start justify-center rounded-2xl md:w-140">
        <Carousel images={images} />
      </div>
    </section>
  );
}
