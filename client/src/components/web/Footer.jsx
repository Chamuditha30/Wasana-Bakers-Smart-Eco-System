import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Copyright } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-secondary flex w-full flex-col items-center justify-center gap-10 p-10">
      <div className="border-tertiary flex w-full flex-col items-start justify-between gap-4 border-y px-4 py-10 md:flex-row md:items-center">
        {/* quick links container */}
        <div className="flex flex-col justify-start gap-2">
          <p className="text-white">QUICK LINKS</p>

          <div className="text-surface/50 flex flex-col justify-start gap-1">
            <Link to={"/"}>Home</Link>
            <Link to={"/cakes"}>Cake Catalogue</Link>
            <Link to={"/"}>Track Your Order</Link>
          </div>
        </div>

        {/* opening hours container */}
        <div className="flex flex-col justify-start gap-2">
          <p className="text-white">OPENING HOURS</p>

          <div className="text-surface/50 flex flex-col justify-start gap-1">
            <p>Monday - Friday</p>
            <p>8:00 AM - 7:00 PM</p>
          </div>
        </div>

        {/* contact container */}
        <div className="flex flex-col justify-start gap-2">
          <p className="text-white">CONTACT</p>

          <div className="text-surface/50 flex flex-col justify-start gap-1">
            <p className="flex items-start gap-2 md:items-center">
              <Phone className="size-5 text-red-600" /> +94 77 836 4052
            </p>
            <p className="flex items-start gap-2 md:items-center">
              <MapPin className="size-5 text-red-600" />
              Dharmapala Mawatha, Anuradhapura
            </p>
          </div>
        </div>
      </div>

      <p className="text-surface/50 flex items-start text-center text-sm md:items-center md:gap-2">
        <Copyright className="size-4" /> 2026 Horana Wasana Bakers. All rights
        reserved.
      </p>
    </div>
  );
}
