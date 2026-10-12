import React from "react";
import CustomButton from "../../ui/CustomButton";

export default function HomePage() {
  return (
    <div className="bg-orange-50 w-full">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-between gap-10 px-4 py-12 md:flex-row md:px-10 md:py-20">

        {/* left side content */}
        <div className="flex w-full flex-col gap-6 md:w-1/2">

          {/* Branch name */}
          <div className="w-fit bg-red-100 px-3 py-1 rounded-full border border-red-700">
            <p className="text-sm font-medium text-red-700">
              Anuradhapura Branch
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Freshly Baked for Every{" "}
              <span className="text-red-700">
                Special Moment
              </span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-lg leading-relaxed text-gray-600">
            Explore our handcrafted cakes and place your order for convenient pickup at our Anuradhapura branch. Made with love, ready when you are.
          </p>

          {/* buttons*/}
          <div className="flex flex-wrap gap-2">
            <CustomButton size="sm">
              Order Now
            </CustomButton>

            <CustomButton variant="outlined" size="sm">
              View Cakes
            </CustomButton >
          </div>
        </div>
        
        {/* right side content */}
        <div className="flex h-80 w-full items-center justify-center rounded-2xl md:h-96 md:w-1/2">
          <img
            src="/images/hero-cake.png"
            alt="Hero Cake"
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
        
      </section>
    </div>
  );
}
