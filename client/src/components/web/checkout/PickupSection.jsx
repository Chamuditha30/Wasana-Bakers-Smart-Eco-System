import React from "react";
import { MapPin, Clock3 } from "lucide-react";

const pickupTimes = [
  "9:00 - 10:00 AM",
  "10:00 - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 - 3:00 PM",
  "3:00 - 4:00 PM",
  "4:00 - 5:00 PM",
];

export default function PickupSection({ pickupTime, setPickupTime, error }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      {/* Section heading */}
      <div className="mb-6 flex items-center gap-4">
        <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
          3
        </span>

        <h2 className="text-secondary text-xl font-semibold">
          Pickup Information
        </h2>
      </div>

      {/* Pickup time */}
      <div className="mb-6">
        <h3 className="text-secondary mb-3 font-semibold">
          <Clock3 className="mr-2 inline h-5 w-5" />
          Pickup Time <span className="text-primary">*</span>
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {pickupTimes.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setPickupTime(time)}
              aria-pressed={pickupTime === time}
              className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                pickupTime === time
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
              }`}
            >
              {time}
            </button>
          ))}
          {error && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Pickup location */}
      <div>
        <h3 className="text-secondary mb-3 font-semibold">
          <MapPin className="mr-2 inline h-5 w-5" />
          Pickup Location
        </h3>

        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-gray-800">
            Wasana Bakers Anuradhapura
          </p>

          <p className="mt-1 text-sm text-gray-600">
            Dharmapala Mawatha, Anuradhapura
          </p>
        </div>
      </div>
    </section>
  );
}
