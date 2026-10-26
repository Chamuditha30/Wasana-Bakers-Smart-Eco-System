import React from "react";
import CustomButton from "../../ui/CustomButton";

export default function FindUsSection() {
  return (
    <section className="flex flex-col items-center justify-between gap-10 px-4 py-12 md:flex-row md:px-10 md:py-20">
      
      {/* left side content */}
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        {/* Section label */}
        <p className="text-sm font-medium text-red-600">FIND US</p>

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-800">
          Visit Wasana Bakers
        </h2>

        <div></div>

        {/* buttons*/}
        <div className="flex flex-wrap gap-2">
          <CustomButton size="sm">Call Us</CustomButton>

          <CustomButton variant="outlined" size="sm">
            WhatsApp
          </CustomButton>
        </div>
      </div>

      {/* right side content */}
      <div className="flex h-full w-full items-center justify-center rounded-2xl md:h-96 md:w-1/2"></div>
    </section>
  );
}
