import React, { useState } from "react";
import Card from "../../ui/Card";
import { Plus } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Bakery Info");

  const tabs = [
    "Bakery Info",
    "Opening Hours",
    "Pickup Settings",
    "Payment",
    "Staff",
    "Notifications",
    "Festival Mode",
  ];

  // Bakery Info Form State
  const [bakeryInfo, setBakeryInfo] = useState({
    name: "Wasana Bakers",
    branch: "Anuradhapura",
    address: "45/B Main Street, Anuradhapura 50000",
    phone: "025 123 4567",
    email: "info@wasanabakers.lk",
  });

  // Opening Hours State
  const [hours, setHours] = useState([
    { day: "Monday", open: "7:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Tuesday", open: "7:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Wednesday", open: "7:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Thursday", open: "7:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Friday", open: "7:00 AM", close: "7:00 PM", isOpen: true },
    { day: "Saturday", open: "7:00 AM", close: "8:00 PM", isOpen: true },
    { day: "Sunday", open: "8:00 AM", close: "5:00 PM", isOpen: true },
  ]);

  // Pickup Settings State
  const [pickup, setPickup] = useState({
    slotDuration: "60",
    capacity: "10",
    maxOrders: "50",
    minNotice: "2",
  });

  // Payment Settings State
  const [payment, setPayment] = useState({
    bank: "Bank of Ceylon",
    branch: "Anuradhapura",
    accountName: "Wasana Bakers (Pvt) Ltd",
    accountNumber: "1234 5678 9012",
    methods: {
      bankTransfer: true,
      payOnPickup: true,
      cash: true,
      card: true,
    },
  });

  // Staff State
  const [staffList, setStaffList] = useState([
    {
      initials: "WK",
      name: "Wasana Kumari",
      role: "OWNER",
      status: "active",
      phone: "0771234567",
      since: "2018",
      color: "bg-[#c8102e]",
    },
    {
      initials: "CR",
      name: "Chaminda Rajapaksa",
      role: "MANAGER",
      status: "active",
      phone: "0712233445",
      since: "2020",
      color: "bg-[#6d4c41]",
    },
    {
      initials: "ND",
      name: "Nimali Dias",
      role: "CASHIER",
      status: "active",
      phone: "0759988776",
      since: "2022",
      color: "bg-[#d4973b]",
    },
    {
      initials: "RB",
      name: "Roshan Bandara",
      role: "STAFF",
      status: "active",
      phone: "0765544332",
      since: "2023",
      color: "bg-[#6b7280]",
    },
    {
      initials: "DP",
      name: "Dilrukshi Perera",
      role: "STAFF",
      status: "inactive",
      phone: "0778899001",
      since: "2021",
      color: "bg-[#6b7280]",
    },
  ]);

  // Notification Switches State
  const [notifications, setNotifications] = useState({
    newOrder: true,
    paymentPending: true,
    lowStock: true,
    orderReady: true,
    dailySummary: true,
  });

  // Festival Mode State
  const [festivalModeActive, setFestivalModeActive] = useState(false);
  const [festivalDetails, setFestivalDetails] = useState({
    name: "Avurudu 2027",
    startDate: "2027-04-13",
    endDate: "2027-04-14",
    preOrderOpen: "2027-04-01",
    slotCapacity: "20",
  });
  const [festivalProducts, setFestivalProducts] = useState({
    loveCake: true,
    kavum: true,
    kokis: true,
    specialRibbonCake: true,
    avuruduGiftBox: false,
  });

  return (
    <div className="min-h-screen bg-[#fcfaf7] p-8 pb-16 select-none">
      {/* Page Header */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1e1715]">
            {activeTab === "Staff" ? "Staff Management" : activeTab === "Festival Mode" ? "Festival Mode" : "Settings"}
          </h1>
          {activeTab === "Festival Mode" && (
            <p className="mt-1 text-xs text-[#8a7e78]">
              Configure high-demand period settings
            </p>
          )}
        </div>

        {activeTab === "Staff" && (
          <button className="flex items-center gap-1.5 rounded-2xl bg-[#c8102e] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#a50b24]">
            <Plus size={16} /> Add Staff
          </button>
        )}

        {activeTab === "Festival Mode" && (
          <button className="rounded-xl border border-[#d6cec7] bg-white px-4 py-1.5 text-xs font-medium text-[#2b211d] shadow-sm">
            {festivalModeActive ? "Festival Mode On" : "Festival Mode Off"}
          </button>
        )}
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-12 gap-7 items-start">
        {/* Left Side Tab Navigation */}
        <div className="col-span-3">
          <Card className="p-3 !rounded-[24px] border-[#eee9e2] space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-[#fff1f2] text-[#c8102e]"
                    : "text-[#6d635e] hover:bg-[#fbf8f4] hover:text-[#1e1715]"
                }`}
              >
                {tab}
              </button>
            ))}
          </Card>
        </div>

        {/* Right Side Content Panel */}
        <div className="col-span-9">
          {/* 1. Bakery Info Tab */}
          {activeTab === "Bakery Info" && (
            <Card className="p-7 !rounded-[24px] border-[#eee9e2]">
              <h2 className="font-serif text-base font-bold text-[#1e1715] mb-6">Bakery Information</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Bakery Name</label>
                    <input
                      type="text"
                      value={bakeryInfo.name}
                      onChange={(e) => setBakeryInfo({ ...bakeryInfo, name: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Branch</label>
                    <input
                      type="text"
                      value={bakeryInfo.branch}
                      onChange={(e) => setBakeryInfo({ ...bakeryInfo, branch: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2b211d] mb-2">Address</label>
                  <input
                    type="text"
                    value={bakeryInfo.address}
                    onChange={(e) => setBakeryInfo({ ...bakeryInfo, address: e.target.value })}
                    className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Phone</label>
                    <input
                      type="text"
                      value={bakeryInfo.phone}
                      onChange={(e) => setBakeryInfo({ ...bakeryInfo, phone: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Email</label>
                    <input
                      type="email"
                      value={bakeryInfo.email}
                      onChange={(e) => setBakeryInfo({ ...bakeryInfo, email: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button className="rounded-2xl bg-[#c8102e] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#a50b24]">
                    Save Changes
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* 2. Opening Hours Tab */}
          {activeTab === "Opening Hours" && (
            <Card className="p-7 !rounded-[24px] border-[#eee9e2]">
              <h2 className="font-serif text-base font-bold text-[#1e1715] mb-6">Opening Hours</h2>
              <div className="space-y-4">
                {hours.map((item, idx) => (
                  <div key={item.day} className="flex items-center gap-4">
                    <span className="w-24 text-xs font-semibold text-[#2b211d]">{item.day}</span>
                    <input
                      type="text"
                      value={item.open}
                      onChange={(e) => {
                        const newHours = [...hours];
                        newHours[idx].open = e.target.value;
                        setHours(newHours);
                      }}
                      className="w-48 rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none text-center"
                    />
                    <span className="text-xs text-[#8a7e78]">to</span>
                    <input
                      type="text"
                      value={item.close}
                      onChange={(e) => {
                        const newHours = [...hours];
                        newHours[idx].close = e.target.value;
                        setHours(newHours);
                      }}
                      className="w-48 rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none text-center"
                    />
                    <label className="flex items-center gap-2 text-xs font-medium text-[#2b211d] ml-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isOpen}
                        onChange={(e) => {
                          const newHours = [...hours];
                          newHours[idx].isOpen = e.target.checked;
                          setHours(newHours);
                        }}
                        className="rounded accent-[#c8102e] size-4"
                      />
                      Open
                    </label>
                  </div>
                ))}

                <div className="pt-4">
                  <button className="rounded-2xl bg-[#c8102e] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#a50b24]">
                    Save Hours
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* 3. Pickup Settings Tab */}
          {activeTab === "Pickup Settings" && (
            <Card className="p-7 !rounded-[24px] border-[#eee9e2]">
              <h2 className="font-serif text-base font-bold text-[#1e1715] mb-6">Pickup Settings</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Slot Duration (minutes)</label>
                    <input
                      type="text"
                      value={pickup.slotDuration}
                      onChange={(e) => setPickup({ ...pickup, slotDuration: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Default Capacity per Slot</label>
                    <input
                      type="text"
                      value={pickup.capacity}
                      onChange={(e) => setPickup({ ...pickup, capacity: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Max Orders per Day</label>
                    <input
                      type="text"
                      value={pickup.maxOrders}
                      onChange={(e) => setPickup({ ...pickup, maxOrders: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Minimum Notice (hours)</label>
                    <input
                      type="text"
                      value={pickup.minNotice}
                      onChange={(e) => setPickup({ ...pickup, minNotice: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button className="rounded-2xl bg-[#c8102e] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#a50b24]">
                    Save Settings
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* 4. Payment Tab */}
          {activeTab === "Payment" && (
            <Card className="p-7 !rounded-[24px] border-[#eee9e2]">
              <h2 className="font-serif text-base font-bold text-[#1e1715] mb-6">Payment Settings</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Bank Name</label>
                    <input
                      type="text"
                      value={payment.bank}
                      onChange={(e) => setPayment({ ...payment, bank: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Branch</label>
                    <input
                      type="text"
                      value={payment.branch}
                      onChange={(e) => setPayment({ ...payment, branch: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Account Name</label>
                    <input
                      type="text"
                      value={payment.accountName}
                      onChange={(e) => setPayment({ ...payment, accountName: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-2">Account Number</label>
                    <input
                      type="text"
                      value={payment.accountNumber}
                      onChange={(e) => setPayment({ ...payment, accountNumber: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2.5 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#2b211d] mb-3">Accepted Payment Methods</p>
                  <div className="space-y-2.5">
                    {[
                      { key: "bankTransfer", label: "Bank Transfer" },
                      { key: "payOnPickup", label: "Pay on Pickup" },
                      { key: "cash", label: "Cash (Walk-in)" },
                      { key: "card", label: "Card (Walk-in)" },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-2.5 text-xs font-medium text-[#2b211d] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={payment.methods[item.key]}
                          onChange={(e) =>
                            setPayment({
                              ...payment,
                              methods: { ...payment.methods, [item.key]: e.target.checked },
                            })
                          }
                          className="rounded accent-[#c8102e] size-4"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button className="rounded-2xl bg-[#c8102e] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#a50b24]">
                    Save Settings
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* 5. Staff Tab */}
          {activeTab === "Staff" && (
            <div className="grid grid-cols-12 gap-5 items-start">
              {/* Staff List */}
              <div className="col-span-8 space-y-3">
                {staffList.map((member, idx) => (
                  <Card key={member.name} className="flex items-center justify-between p-4.5 !rounded-2xl border-[#eee9e2]">
                    <div className="flex items-center gap-3.5">
                      <div className={`flex size-11 items-center justify-center rounded-full text-xs font-bold text-white ${member.color}`}>
                        {member.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#1e1715]">{member.name}</p>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            member.role === "OWNER" ? "bg-rose-50 text-rose-600" :
                            member.role === "MANAGER" ? "bg-stone-100 text-stone-700" :
                            member.role === "CASHIER" ? "bg-amber-50 text-amber-700" : "bg-neutral-100 text-neutral-600"
                          }`}>
                            {member.role}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                            member.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-neutral-100 text-neutral-400"
                          }`}>
                            {member.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8a7e78] mt-0.5">
                          {member.phone} · Since {member.since}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const updated = [...staffList];
                        updated[idx].status = member.status === "active" ? "inactive" : "active";
                        setStaffList(updated);
                      }}
                      className={`rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition ${
                        member.status === "active"
                          ? "border-[#e09119] text-[#e09119] hover:bg-[#fff9f0]"
                          : "border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {member.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </Card>
                ))}
              </div>

              {/* Right Side Permissions Placeholder */}
              <div className="col-span-4">
                <Card className="p-8 text-center !rounded-2xl border-[#eee9e2] min-h-[160px] flex items-center justify-center">
                  <p className="text-xs font-medium text-[#8a7e78]">
                    Select a staff member to view permissions
                  </p>
                </Card>
              </div>
            </div>
          )}

          {/* 6. Notifications Tab */}
          {activeTab === "Notifications" && (
            <Card className="p-7 !rounded-[24px] border-[#eee9e2]">
              <h2 className="font-serif text-base font-bold text-[#1e1715] mb-6">Notification Settings</h2>
              <div className="divide-y divide-[#f2eeea]">
                {[
                  {
                    key: "newOrder",
                    title: "New order received",
                    desc: "Get notified when a customer places an order",
                  },
                  {
                    key: "paymentPending",
                    title: "Payment pending",
                    desc: "Alert when a bank transfer needs verification",
                  },
                  {
                    key: "lowStock",
                    title: "Low stock warning",
                    desc: "Notify when a product is running low",
                  },
                  {
                    key: "orderReady",
                    title: "Order ready for pickup",
                    desc: "Remind staff when an order is marked Ready",
                  },
                  {
                    key: "dailySummary",
                    title: "Daily sales summary",
                    desc: "End-of-day sales report notification",
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-xs font-bold text-[#1e1715]">{item.title}</p>
                      <p className="text-[11px] text-[#8a7e78] mt-0.5">{item.desc}</p>
                    </div>

                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          [item.key]: !notifications[item.key],
                        })
                      }
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        notifications[item.key] ? "bg-[#c8102e]" : "bg-neutral-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications[item.key] ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* 7. Festival Mode Tab */}
          {activeTab === "Festival Mode" && (
            <div className="space-y-6">
              {/* Festival Mode Activation Card */}
              <Card className="flex items-center justify-between p-6 !rounded-2xl border-[#eee9e2]">
                <div>
                  <h3 className="text-xs font-bold text-[#1e1715]">Activate Festival Mode</h3>
                  <p className="text-[11px] text-[#8a7e78] mt-0.5">
                    Enables expanded slots, special products, and high-capacity settings
                  </p>
                </div>

                <button
                  onClick={() => setFestivalModeActive(!festivalModeActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    festivalModeActive ? "bg-[#c8102e]" : "bg-neutral-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      festivalModeActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </Card>

              {/* Festival Details & Products Grid */}
              <div className="grid grid-cols-2 gap-6 items-start">
                {/* Festival Details Card */}
                <Card className="p-6 !rounded-2xl border-[#eee9e2] space-y-4">
                  <h3 className="font-serif text-sm font-bold text-[#1e1715]">Festival Details</h3>
                  <div>
                    <label className="block text-xs font-bold text-[#2b211d] mb-1.5">Festival Name</label>
                    <input
                      type="text"
                      value={festivalDetails.name}
                      onChange={(e) => setFestivalDetails({ ...festivalDetails, name: e.target.value })}
                      className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-4 py-2 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2b211d] mb-1.5">Start Date</label>
                      <input
                        type="date"
                        value={festivalDetails.startDate}
                        onChange={(e) => setFestivalDetails({ ...festivalDetails, startDate: e.target.value })}
                        className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-3 py-2 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2b211d] mb-1.5">End Date</label>
                      <input
                        type="date"
                        value={festivalDetails.endDate}
                        onChange={(e) => setFestivalDetails({ ...festivalDetails, endDate: e.target.value })}
                        className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-3 py-2 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2b211d] mb-1.5">Pre-order Opens</label>
                      <input
                        type="date"
                        value={festivalDetails.preOrderOpen}
                        onChange={(e) => setFestivalDetails({ ...festivalDetails, preOrderOpen: e.target.value })}
                        className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-3 py-2 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2b211d] mb-1.5">Slot Capacity</label>
                      <input
                        type="text"
                        value={festivalDetails.slotCapacity}
                        onChange={(e) => setFestivalDetails({ ...festivalDetails, slotCapacity: e.target.value })}
                        className="w-full rounded-2xl border border-[#e2ddd8] bg-[#fdfdfc] px-3 py-2 text-xs text-[#1e1715] focus:border-[#c8102e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button className="w-full rounded-2xl bg-[#cb9236] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#b57f2a]">
                      Save Festival Settings
                    </button>
                  </div>
                </Card>

                {/* Festival Products Card */}
                <div className="space-y-4">
                  <Card className="p-6 !rounded-2xl border-[#eee9e2]">
                    <h3 className="font-serif text-sm font-bold text-[#1e1715] mb-1">Festival Products</h3>
                    <p className="text-[11px] text-[#8a7e78] mb-4">
                      Select products available during the festival period.
                    </p>

                    <div className="space-y-3">
                      {[
                        { key: "loveCake", label: "Love Cake" },
                        { key: "kavum", label: "Kavum" },
                        { key: "kokis", label: "Kokis" },
                        { key: "specialRibbonCake", label: "Special Ribbon Cake" },
                        { key: "avuruduGiftBox", label: "Avurudu Gift Box" },
                      ].map((prod) => (
                        <label key={prod.key} className="flex items-center gap-2.5 text-xs font-semibold text-[#2b211d] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={festivalProducts[prod.key]}
                            onChange={(e) =>
                              setFestivalProducts({
                                ...festivalProducts,
                                [prod.key]: e.target.checked,
                              })
                            }
                            className="rounded accent-[#cb9236] size-4"
                          />
                          {prod.label}
                        </label>
                      ))}
                    </div>
                  </Card>

                  {/* Customer Notice Info Box */}
                  <div className="rounded-2xl border border-[#f5dcba] bg-[#fdf8f0] p-4 text-xs">
                    <span className="font-bold text-[#b57f2a]">Customer Notifications: </span>
                    <span className="text-[#8a6834]">
                      When festival mode is enabled, customers can see the festival banner on the website.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}