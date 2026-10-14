import React from 'react';

export default function DashboardOverview() {
  const recentOrders = [
    {
      ref: 'WB1047',
      status: 'Waiting Payment',
      statusStyle: 'border border-amber-400 text-amber-600 bg-amber-50/50',
      name: 'Priya Jayawardena',
      time: '10:00 AM - 11:00 AM',
      amount: 'Rs. 2600',
      payStatus: 'Pending',
      payStyle: 'border border-amber-400 text-amber-600 bg-amber-50/50'
    },
    {
      ref: 'WB1046',
      status: 'Preparing',
      statusStyle: 'border border-rose-400 text-rose-600 bg-rose-50/50',
      name: 'Kasun',
      time: '2:00 PM - 3:00 PM',
      amount: 'Rs. 1750',
      payStatus: 'Pending',
      payStyle: 'border border-amber-400 text-amber-600 bg-amber-50/50'
    },
    {
      ref: 'WB1045',
      status: 'Ready',
      statusStyle: 'border border-emerald-400 text-emerald-600 bg-emerald-50/50',
      name: 'Nimal',
      time: '11:00 AM - 12:00 PM',
      amount: 'Rs. 2700',
      payStatus: 'Confirmed',
      payStyle: 'border border-emerald-400 text-emerald-600 bg-emerald-50/50'
    },
    {
      ref: 'WB1044',
      status: 'Completed',
      statusStyle: 'border border-stone-400 text-stone-500 bg-stone-50',
      name: 'Dilini',
      time: '9:00 AM - 10:00 AM',
      amount: 'Rs. 3200',
      payStatus: 'Confirmed',
      payStyle: 'border border-emerald-400 text-emerald-600 bg-emerald-50/50'
    },
    {
      ref: 'WB1043',
      status: 'Confirmed',
      statusStyle: 'border border-blue-400 text-blue-600 bg-blue-50/50',
      name: 'Chamara',
      time: '3:00 PM - 4:00 PM',
      amount: 'Rs. 600',
      payStatus: 'Pending',
      payStyle: 'border border-amber-400 text-amber-600 bg-amber-50/50'
    }
  ];

  const lowStockItems = [
    { name: 'Ribbon Cake', count: '2 left', isOut: false },
    { name: 'Wedding Cake', count: '1 left', isOut: false },
    { name: 'Red Velvet Cake', count: 'Sold out', isOut: true }
  ];

  return (
    <div className="p-8 font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Good Evening, Wasana</h1>
          <p className="text-xs text-stone-500 mt-1">Friday, 30 October 2026 , Anuradhapura</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#c8102e] hover:bg-[#b00d27] text-white text-xs font-bold py-2.5 px-5 rounded-lg shadow-sm transition-colors cursor-pointer">
            + New Sale
          </button>
          <button className="bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors cursor-pointer">
            Add Product
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-stone-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] font-bold text-stone-500 tracking-wider uppercase">TODAY'S SALES</div>
          <div className="text-2xl font-extrabold text-stone-900 my-1">Rs. 49k</div>
          <div className="text-[11px] text-stone-400">+12% vs yesterday</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] font-bold text-stone-500 tracking-wider uppercase">ORDERS TODAY</div>
          <div className="text-2xl font-extrabold text-stone-900 my-1">3</div>
          <div className="text-[11px] text-stone-400">3 online | 2 walk-in</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] font-bold text-stone-500 tracking-wider uppercase">PENDING ACTION</div>
          <div className="text-2xl font-extrabold text-stone-900 my-1">2</div>
          <div className="text-[11px] text-stone-400">Require confirmation</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] font-bold text-stone-500 tracking-wider uppercase">READY FOR PICKUP</div>
          <div className="text-2xl font-extrabold text-stone-900 my-1">1</div>
          <div className="text-[11px] text-stone-400">waiting for customer</div>
        </div>
      </div>

      {/* Content Columns: Recent Orders & Alerts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column: Recent Orders (2 cols) */}
        <div className="col-span-2 bg-white rounded-xl border border-stone-200/70 p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-stone-900">Recent Orders</h3>
            <span className="text-xs font-bold text-[#c8102e] cursor-pointer hover:underline">View All</span>
          </div>

          <div className="divide-y divide-stone-100">
            {recentOrders.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-3.5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-xs text-[#c8102e]">{item.ref}</span>
                    <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${item.statusStyle}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {item.name} | {item.time}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-xs text-stone-900 mb-1">
                    {item.amount}
                  </div>
                  <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${item.payStyle}`}>
                    {item.payStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Low Stock Alert & Pending Payments (1 col) */}
        <div className="flex flex-col gap-5">
          {/* Low Stock Alert Card */}
          <div className="bg-white rounded-xl border border-stone-200/70 p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-stone-900">Low Stock Alert</h4>
              <span className="text-xs font-bold text-[#c8102e] cursor-pointer hover:underline">Manage</span>
            </div>
            <div className="space-y-2.5">
              {lowStockItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-0.5">
                  <span className="text-stone-700 font-medium">{item.name}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.isOut 
                      ? 'border border-rose-300 text-rose-600 bg-rose-50/50' 
                      : 'border border-amber-300 text-amber-600 bg-amber-50/50'
                  }`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Payments Card */}
          <div className="bg-white rounded-xl border border-stone-200/70 p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-stone-900">Pending Payments</h4>
              <span className="text-xs font-bold text-[#c8102e] cursor-pointer hover:underline">Review</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="font-extrabold text-[#c8102e]">WB1047</span>
              <span className="font-extrabold text-stone-900">Rs. 2600</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}