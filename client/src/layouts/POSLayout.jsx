import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/pos/Navbar";

export default function POSLayout() {
  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
