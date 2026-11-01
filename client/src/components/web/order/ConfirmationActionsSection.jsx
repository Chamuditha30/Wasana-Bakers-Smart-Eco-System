
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../ui/CustomButton";

export default function OrderActionsSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">

      {/* Download Receipt */}
      <CustomButton
        variant="primary"
        onClick={() => {
          console.log("Download receipt - not implemented yet");
        }}
      >
        Download Order Receipt
      </CustomButton>

      {/* Track Order */}
      <CustomButton
        variant="outlined"
        onClick={() => {
          console.log("Track Order - not connected yet");
        }}
      >
        Track Order
      </CustomButton>

      {/* Back to Home */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="text-tertiary mt-1 cursor-pointer text-sm transition-colors hover:text-primary"
      >
        Back to Home
      </button>

    </div>
  );
}
