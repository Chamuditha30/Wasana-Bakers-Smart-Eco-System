import React from "react";
import Navbar from "../components/web/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/web/Footer";

export default function WebLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
