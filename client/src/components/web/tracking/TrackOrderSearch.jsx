import React from "react";
import CustomButton from "../../../ui/CustomButton";
import CustomInput from "../../../ui/CustomInput";

export default function TrackOrderSearch({
  orderReference,
  setOrderReference,
  phoneNumber,
  setPhoneNumber,
  onSearch,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <form onSubmit={onSearch} className="space-y-4">
        {/* Order Reference */}
        <CustomInput
          label="Order Reference"
          type="text"
          placeholder="e.g. WB1047"
          value={orderReference}
          onChange={(e) => setOrderReference(e.target.value)}
          required
        />

        {/* Phone Number */}
        <CustomInput
          label="Phone Number"
          type="tel"
          placeholder="0712345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        {/* Track Order Button */}
        <div className="flex justify-center pt-2">
          <CustomButton type="submit" variant="primary">
            Track Order
          </CustomButton>
        </div>
      </form>
    </section>
  );
}
