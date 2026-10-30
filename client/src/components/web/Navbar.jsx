import React, { useState } from "react";
import logo from "../../images/logo.webp";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  //initialize nav bar state
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* desktop navbar */}
      <div className="sticky top-0 z-50 hidden w-full items-center justify-between bg-white px-10 py-4 shadow md:flex">
        {/* logo container */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="size-16" />

          <div>
            <p className="text-secondary text-xl font-semibold">Horana</p>
            <p className="text-primary text-2xl font-bold">Wasana Bakers</p>
          </div>
        </div>

        {/* navigation links container */}
        <div className="text-secondary flex items-center gap-4 text-xl">
          <NavLink
            to={"/"}
            end
            className={({ isActive }) =>
              `transition-colors duration-300 ease-out ${isActive ? "text-primary font-semibold" : "hover:text-primary hover:font-semibold"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/cakes"}
            end
            className={({ isActive }) =>
              `transition-colors duration-300 ease-out ${isActive ? "text-primary font-semibold" : "hover:text-primary hover:font-semibold"}`
            }
          >
            Cakes
          </NavLink>
        </div>

        {/* track and cart container */}
        <div className="flex items-center gap-2">
          
          {/* Cart Icon */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            aria-label="View cart"
            className="text-secondary hover:text-primary rounded-lg p-2 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>

          <CustomButton variant="outlined">Track Order</CustomButton>

          <CustomButton onClick={() => navigate("/cakes")}>
            Order Now
          </CustomButton>
        </div>
      </div>

      {/* mobile navbar */}
      <div className="sticky top-0 z-50 flex h-20 w-full items-center justify-between bg-white px-4 shadow md:hidden">
        {/* logo container */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="size-12" />

          <div>
            <p className="text-secondary text-lg font-semibold">Horana</p>
            <p className="text-primary text-xl font-bold">Wasana Bakers</p>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3">

          {/* cart */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate("/cart");
            }}
            aria-label="View cart"
            className="text-secondary hover:text-primary"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>

          {/* burger menu icon */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="text-secondary"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

        </div>
        
      </div>

      {/* burger menu */}
      <div
        className={`border-muted fixed inset-x-0 z-40 flex h-screen flex-col items-center justify-start border-b bg-white py-10 text-lg transition-transform duration-300 ease-out ${isOpen ? "top-20 translate-y-0" : "-translate-y-full"}`}
      >
        <NavLink
          onClick={() => setIsOpen(false)}
          to={"/"}
          end
          className={({ isActive }) =>
            `transition-colors duration-300 ease-out ${isActive ? "text-primary font-semibold" : "hover:text-primary hover:font-semibold"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => setIsOpen(false)}
          to={"/cakes"}
          end
          className={({ isActive }) =>
            `transition-colors duration-300 ease-out ${isActive ? "text-primary font-semibold" : "hover:text-primary hover:font-semibold"}`
          }
        >
          Cakes
        </NavLink>

        <div className="mt-4 flex flex-col gap-2">
          <CustomButton variant="outlined" size="sm">
            Track Order
          </CustomButton>
          <CustomButton 
            size="sm"
            onClick={() => {
              setIsOpen(false);
              navigate("/cakes");
            }}
          >
            Order Now
          </CustomButton>
        </div>
      </div>
    </>
  );
}
