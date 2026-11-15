import React from "react";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

export default function PublicCakeCard({
  cake,
  name,
  description,
  status,
  price,
  image,
}) {

  const navigate = useNavigate();

  return (
    <div className="bg-surface group relative cursor-pointer overflow-hidden rounded-xl transition-shadow duration-300 ease-out hover:shadow-lg">
      <p
        className={`absolute top-2 left-2 z-10 rounded-full border px-4 py-1 font-semibold ${status == "Available" ? "border-green-600 bg-green-100 text-green-600" : status == "Limited" ? "border-yellow-600 bg-yellow-100 text-yellow-600" : "border-red-600 bg-red-100 text-red-600"}`}
      >
        {status}
      </p>

      <div className="transition-transform duration-500 ease-out group-hover:scale-110">
        <Carousel images={images} />
      </div>

      <div className="bg-surface p-4">
        <p className="text-secondary text-lg font-semibold md:text-2xl">
          {name}
        </p>
        <p className="text-tertiary min-h-14 md:text-lg">{description}</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="w-1/2">
            <p className="text-tertiary md:text-lg">From</p>
            <p className="text-lg font-semibold md:text-2xl">{price}</p>
          </div>
          <CustomButton
            onClick={() => 
              navigate(`/cakes/${cake.id}`, {
                state: { cake: cake},
              })
            }
          >
            View Details
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
