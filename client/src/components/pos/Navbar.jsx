import React from "react";
import {
  Home,
  Calculator,
  Box,
  CakeSlice,
  Layers,
  CreditCard,
  Timer,
  UsersRound,
  BanknoteArrowDown,
  BarChart3,
  BellRing,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../../images/logo.webp";
import { NavLink, useNavigate } from "react-router-dom";

const navigations = [
  { name: "Dashboard", link: "/dashboard", icon: Home },
  { name: "Sales", link: "/sales", icon: Calculator },
  { name: "Orders", link: "/orders", icon: Box, badge: 2 },
  { name: "Products", link: "/products", icon: CakeSlice },
  { name: "Inventory", link: "/inventory", icon: Layers },
  { name: "Payments", link: "/payments", icon: CreditCard, badge: 1 },
  { name: "Pickup Slots", link: "/pickup-slots", icon: Timer },
  { name: "Customers", link: "/customers", icon: UsersRound },
  { name: "Expenses", link: "/expenses", icon: BanknoteArrowDown },
  { name: "Reports", link: "/reports", icon: BarChart3 },
  { name: "Notifications", link: "/notifications", icon: BellRing },
  { name: "Settings", link: "/settings", icon: Settings },
];

const user = { name: "Wasana Kumari", role: "Owner" };

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <aside className="bg-[#211a17] hidden h-screen w-[240px] shrink-0 flex-col justify-between border-r border-[#2f2521] md:flex overflow-hidden">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 shrink-0">
        <div className="size-10 shrink-0 overflow-hidden rounded-full bg-[#c8102e] p-0.5 flex items-center justify-center shadow-md">
          <img 
            src={logo} 
            alt="Wasana Bakers" 
            className="size-full rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }} 
          />
        </div>
        <div className="leading-tight">
          <p className="text-white text-sm font-bold tracking-tight">Wasana Bakers</p>
          <p className="text-[11px] text-[#8e807a]">POS System</p>
        </div>
      </div>

      {/* Scrollable Navigation List */}
      <nav 
        className="flex-1 overflow-y-auto px-3.5 py-1 space-y-1"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#3e322c transparent"
        }}
      >
        {navigations.map((nav) => {
          const Icon = nav.icon;
          return (
            <NavLink
              key={nav.link}
              to={nav.link}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#c8102e] font-semibold text-white shadow-sm"
                    : "text-[#aba09a] hover:bg-[#2c2320] hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={18} strokeWidth={2} />
                <span>{nav.name}</span>
              </div>
              {nav.badge && (
                <span className="flex size-4.5 items-center justify-center rounded-full bg-[#c8102e] text-[10px] font-bold text-white shadow-sm">
                  {nav.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer User Profile & Logout */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-[#2f2521] shrink-0 bg-[#1c1613]">
        <div className="flex items-center gap-3">
          <div className="bg-[#c8102e] flex size-8.5 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm">
            WK
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-white">{user.name}</p>
            <p className="text-[10px] text-[#8e807a]">{user.role}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/login")}
          title="Logout"
          className="rounded-lg p-1.5 text-[#8e807a] transition-colors hover:text-white"
        >
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  );
}