import React from "react";
import PublicCakeCard from "../../../ui/PublicCakeCard";

export default function CakeGrid({ cakes }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cakes.map((cake) => (
        <PublicCakeCard
          key={cake.id}
          name={cake.name}
          description={cake.description}
          status={cake.status}
          price={cake.price}
          image={cake.image}
          cake={cake}
        />
      ))}
    </div>
  );
}
