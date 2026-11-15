import React from "react";
import CustomButton from "./CustomButton";
import Carousel from "./Carousel";

export default function PosCakeCard({
  name,
  description,
  status,
  price,
  images,
  onEdit,
  onDisable,
  isUpdating,
}) {
  return (
    <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white transition-shadow duration-300 ease-out hover:shadow-lg">
      <p
        className={`absolute top-2 left-2 z-10 rounded-full border px-4 py-1 font-semibold ${status == "Available" ? "border-green-600 bg-green-100 text-green-600" : status == "Limited" ? "border-yellow-600 bg-yellow-100 text-yellow-600" : "border-red-600 bg-red-100 text-red-600"}`}
      >
        {status}
      </p>

      <div className="transition-transform duration-500 ease-out group-hover:scale-110">
        <Carousel images={images} />
      </div>

      <div className="flex flex-1 flex-col bg-white p-4">
        <p className="text-secondary text-lg font-semibold md:text-2xl">
          {name}
        </p>
        <p className="text-tertiary min-h-14 md:text-lg">{description}</p>

        <div className="my-4 flex items-center gap-4">
          <p className="text-tertiary md:text-lg">From</p>
          <p className="text-lg font-semibold md:text-2xl">Rs. {price}</p>
        </div>

        <div className="mt-auto flex w-full items-center justify-center gap-2">
          <CustomButton onClick={onEdit}>Edit</CustomButton>
          <CustomButton onClick={onDisable} variant="secondary">
            {isUpdating
              ? status === "Unavailable"
                ? "Enabling..."
                : "Disabling..."
              : status === "Unavailable"
                ? "Enable"
                : "Disable"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
