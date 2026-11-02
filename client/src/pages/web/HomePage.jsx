import React from "react";
import HeroSection from "../../components/web/home/HeroSection";
import PopularCakes from "../../components/web/home/PopularCakesSection";
import SimpleProcess from "../../components/web/home/SimpleProcessSection";
import AboutUs from "../../components/web/home/AboutUsSection";
import FindUs from "../../components/web/home/FindUsSection";

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
