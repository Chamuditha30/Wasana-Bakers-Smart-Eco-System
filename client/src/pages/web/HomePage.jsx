import React from "react";
import HeroSection from "../../components/web/HeroSection";
import PopularCakes from "../../components/web/PopularCakes";
import SimpleProcess from "../../components/web/SimpleProcess";
import AboutUs from "../../components/web/AboutUs";
import FindUs from "../../components/web/FindUs";

export default function HomePage() {
  return (
    <div className="bg-surface w-full">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Cakes Section */}
      <PopularCakes />

      {/* Simple Process Section */}
      <SimpleProcess />

      {/* About Us Section */}
      <AboutUs />

      {/* Find Us Section */}
      <FindUs />

    </div>
  );
}
