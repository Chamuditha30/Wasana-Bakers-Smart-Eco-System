import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function PosLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Session or token clear 
    navigate('/pos/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/pos/dashboard', icon: '🏠' },
    { name: 'Sales', path: '/pos/sales', icon: '🛒' },
    { name: 'Orders', path: '/pos/orders', icon: '📋' },
    { name: 'Products', path: '/pos/products', icon: '📦' },
    { name: 'Inventory', path: '/pos/inventory', icon: '🏬' },
    { name: 'Payments', path: '/pos/payments', icon: '💳' },
    { name: 'Pickup Slots', path: '/pos/pickup-slots', icon: '⏱️' },
    { name: 'Customers', path: '/pos/customers', icon: '👥' },
    { name: 'Expenses', path: '/pos/expenses', icon: '🧾' },
    { name: 'Reports', path: '/pos/reports', icon: '📈' },
    { name: 'Notifications', path: '/pos/notifications', icon: '🔔' },
    { name: 'Settings', path: '/pos/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans bg-[#f7f5f0]">
      {/* Dark Sidebar */}
      <aside className="w-56 bg-[#2b211d] text-white flex flex-col justify-between py-4 px-3 shrink-0 select-none">
        <div>
          {/* Logo Brand Header */}
          <div className="flex items-center gap-2.5 px-3 py-2 mb-4">
            <img 
              src="/src/images/logo.webp" 
              alt="Logo" 
              className="w-8 h-8 rounded-full object-cover border border-amber-400" 
            />
            <div>
              <div className="font-bold text-xs leading-tight tracking-wide">Wasana Bakers</div>
              <div className="text-[10px] text-stone-400 leading-tight">POS System</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs transition-colors
                  ${isActive 
                    ? 'bg-[#c8102e] text-white font-semibold shadow-sm' 
                    : 'text-stone-300 hover:bg-white/10 hover:text-white font-medium'
                  }
                `}
              >
                <span className="text-sm opacity-90">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Profile & Logout Footer */}
        <div 
          onClick={handleLogout}
          title="Click to Logout"
          className="flex items-center justify-between border-t border-stone-700/60 pt-3 px-2 cursor-pointer hover:bg-white/5 rounded-lg transition-colors p-1"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#c8102e] flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm">
              WK
            </div>
            <div>
              <div className="text-xs font-semibold text-white leading-tight">Wasana Kumari</div>
              <div className="text-[10px] text-stone-400 leading-tight">Owner</div>
            </div>
          </div>
          <button 
            type="button"
            className="text-stone-400 hover:text-red-400 text-sm transition-colors pr-1 cursor-pointer"
          >
            ↪
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#f7f5f0]">
        <Outlet />
      </main>
    </div>
  );
}