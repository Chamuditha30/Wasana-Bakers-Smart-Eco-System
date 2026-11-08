import React from "react";
import {
  LayoutDashboard,
  Calculator,
  Box,
  CakeSlice,
  Layers,
  Timer,
  UsersRound,
  BanknoteArrowDown,
  CreditCard,
  ChartNoAxesCombined,
  BellRing,
  Settings,
  LogOut,
  Ellipsis,
} from "lucide-react";
import logo from "../../images/logo.webp";
import { NavLink, useLocation } from "react-router-dom";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

//navigation links
const navigations = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Sales",
    link: "/sales",
    icon: Calculator,
  },
  {
    name: "Orders",
    link: "/orders",
    icon: Box,
  },
  {
    name: "Payments",
    link: "/payments",
    icon: CreditCard,
  },
  {
    name: "Products",
    link: "/products",
    icon: CakeSlice,
  },
  {
    name: "Inventory",
    link: "/inventory",
    icon: Layers,
  },
  {
    name: "Pickup Slots",
    link: "/pickup-slots",
    icon: Timer,
  },
  {
    name: "Customers",
    link: "/customers",
    icon: UsersRound,
  },
  {
    name: "Expenses",
    link: "/expenses",
    icon: BanknoteArrowDown,
  },
  {
    name: "Reports",
    link: "/reports",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: BellRing,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: Settings,
  },
];

//sample user
const user = { name: "Wasana Kumari", role: "Admin" };

export default function Navbar() {
  //initialize useLocation
  const location = useLocation();

  return (
    <>
      {/* desktop navbar */}
      <div className="bg-secondary hidden h-screen w-1/6 flex-col justify-between p-6 md:flex">
        {/* logo container */}
        <div className="border-b-tertiary flex items-center gap-2 border-b pb-4">
          <img src={logo} alt="logo" className="size-12" />

          <div>
            <p className="font-semibold text-white">Horana</p>
            <p className="text-primary text-lg font-bold">Wasana Bakers</p>
          </div>
        </div>

        {/* navigations container */}
        <div className="flex flex-col">
          {navigations.map((nav) => {
            const Icon = nav.icon;

            return (
              <NavLink
                key={nav.link}
                to={nav.link}
                end
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-lg px-4 py-3 transition-colors duration-300 ease-out ${
                    isActive
                      ? "bg-primary font-semibold text-white"
                      : "hover:bg-tertiary text-white/75 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {nav.name}
              </NavLink>
            );
          })}
        </div>

        {/* profile/logout container */}
        <div className="border-t-tertiary flex items-center justify-between gap-1 border-t pt-4">
          <div className="bg-primary pointer-events-none rounded-full p-2 font-semibold text-white select-none">
            <p>
              {user.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </p>
          </div>

          <div>
            <p className="text-white">{user.name}</p>
            <p className="text-xs text-white/75">{user.role}</p>
          </div>

          <LogOut className="cursor-pointer text-white/75 transition-colors duration-300 ease-out hover:font-semibold hover:text-white" />
        </div>
      </div>

      {/* mobile bottom navbar */}
      <div className="bg-secondary fixed right-0 bottom-0 left-0 z-10 flex w-full items-center justify-between gap-1 py-2 md:hidden">
        {[
          ...navigations
            .filter((nav) =>
              ["/dashboard", "/sales", "/orders", "/payments"].includes(
                nav.link,
              ),
            )
            .map((nav) => {
              const Icon = nav.icon;

              return (
                <NavLink
                  key={nav.link}
                  to={nav.link}
                  end
                  className={({ isActive }) =>
                    `flex flex-1 flex-col items-center gap-1 py-1 text-xs transition-colors duration-300 ease-out ${
                      isActive ? "text-primary" : "text-white/75"
                    }`
                  }
                >
                  <Icon size={22} />
                  <p>{nav.name}</p>
                </NavLink>
              );
            }),
        ]}

        <Menu as={"div"} className="relative flex flex-1 justify-center">
          <MenuButton
            className={`flex flex-1 flex-col items-center gap-1 py-1 text-xs transition-colors duration-300 ease-out ${
              [
                "/products",
                "/inventory",
                "/pickup-slots",
                "/customers",
                "/expenses",
                "/reports",
                "/notifications",
                "/settings",
              ].includes(location.pathname)
                ? "text-primary"
                : "text-white/75"
            }`}
          >
            <Ellipsis size={22} />
            <p>More</p>
          </MenuButton>

          <MenuItems className="bg-secondary border-tertiary absolute right-0 bottom-full mb-3 w-52 origin-bottom-right rounded-xl border p-2 shadow-xl focus:outline-none">
            {navigations
              .filter((nav) =>
                [
                  "/products",
                  "/inventory",
                  "/pickup-slots",
                  "/customers",
                  "/expenses",
                  "/reports",
                  "/notifications",
                  "/settings",
                ].includes(nav.link),
              )
              .map((nav) => {
                const Icon = nav.icon;

                return (
                  <MenuItem key={nav.link}>
                    <NavLink
                      to={nav.link}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                          isActive
                            ? "bg-primary text-white"
                            : "data-focus:bg-tertiary text-white/75 data-focus:text-white"
                        }`
                      }
                    >
                      <Icon size={18} />
                      <p>{nav.name}</p>
                    </NavLink>
                  </MenuItem>
                );
              })}

            <div className="border-tertiary my-2 border-t" />

            <MenuItem>
              <Button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400">
                {" "}
                <LogOut size={18} />
                <p>Logout</p>
              </Button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
}
