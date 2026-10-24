import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/pos/Navbar";

export default function POSLayout() {
  return (
    <div className="flex">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
