import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/pos/Navbar";

export default function POSLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fbf9f4]">
      <Navbar />
      <main className="flex-1 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}