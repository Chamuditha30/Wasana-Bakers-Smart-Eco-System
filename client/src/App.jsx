import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebLayout from "./layouts/WebLayout";
import HomePage from "./pages/web/HomePage";
import CakesPage from "./pages/web/CakesPage";
import POSLayout from "./layouts/POSLayout";
import LoginPage from "./pages/pos/LoginPage";
import DashboardPage from "./pages/pos/DashboardPage";
import SalesPage from "./pages/pos/SalesPage";
import OrdersPage from "./pages/pos/OrdersPage";
import ProductsPage from "./pages/pos/ProductsPage";
import InventoryPage from "./pages/pos/InventoryPage";
import PaymentsPage from "./pages/pos/PaymentsPage";
import PickupSlotsPage from "./pages/pos/PickupSlotsPage";
import CustomersPage from "./pages/pos/CustomersPage";
import ExpensesPage from "./pages/pos/ExpensesPage";
import ReportsPage from "./pages/pos/ReportsPage";
import NotificationsPage from "./pages/pos/NotificationsPage";
import SettingsPage from "./pages/pos/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<WebLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cakes" element={<CakesPage />} />
        </Route>

        {/* POS */}
        <Route element={<POSLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/pickup-slots" element={<PickupSlotsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
