import React from "react";
import CustomButton from "../../../ui/CustomButton";
import {
  SearchCheck,
  Sparkles,
  CreditCard,
  Package,
  ChevronsRight,
  Check,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Browse",
    description: "Explore our fresh cakes and choose your favourite.",
    icon: SearchCheck,
  },
  {
    number: 2,
    title: "Customize",
    description: "Choose the size, quantity and add your special cake message.",
    icon: Sparkles,
  },
  {
    number: 3,
    title: "Order",
    description: "Enter your details, select a pickup time and place your order.",
    icon: CreditCard,
  },
  {
    number: 4,
    title: "Pickup",
    description: "Complete your payment and collect your freshly prepared cake.",
    icon: Package,
  },
];

export default function SimpleProcessSection() {
  return (
    <div className="flex w-full flex-col items-center gap-2 px-4 py-12 md:px-10 md:py-10">
      {/* Section label */}
      <p className="text-sm font-medium text-red-600">SIMPLE PROCESS</p>

      {/* Heading */}
      <h2 className="text-center text-3xl font-semibold text-gray-800">
        How It Works
      </h2>

      {/* Description */}
      <p className="text-tertiary text-sm font-medium md:text-sm">
        Order your favourite cake in four easy steps
      </p>

      {/* Process Steps */}
      <div className="mt-6 grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div key={step.number} className="relative">
              {/* Rectangle Card */}
              <div className="relative flex h-100 flex-col items-center justify-center gap-4 rounded-xl border border-tertiary bg-white px-4 py-8 text-center shadow-sm">
                {/* Step Number */}
                <div className="absolute -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-semibold text-white">
                  {step.number}
                </div>

                {/* Step Icon */}
                <Icon className="h-10 w-10 text-red-600" />

                {/* Step Title */}
                <h3 className="font-semibold text-gray-800">{step.title}</h3>

                {/* Step Description */}
                <p className="text-tertiary text-sm">{step.description}</p>
              </div>

              {/* Next Arrow / Final Check */}
              <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 text-red-600 lg:block">
                {step.number === 4 ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <ChevronsRight className="h-6 w-6" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Cakes Button */}
      <CustomButton variant="outlined" size="sm" className="mt-6">
        Browse Now
      </CustomButton>
    </div>
  );
}
