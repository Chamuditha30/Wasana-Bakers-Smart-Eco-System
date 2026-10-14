import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WebLayout from "./layouts/WebLayout";
import HomePage from "./pages/web/HomePage";
import CakesPage from "./pages/web/CakesPage";

// POS Pages & Layouts
import StaffLogin from "./pages/web/pos/StaffLogin";
import PosLayout from "./layouts/PosLayout";
import DashboardOverview from "./pages/web/pos/DashboardOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Public Pages */}
        <Route element={<WebLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cakes" element={<CakesPage />} />
        </Route>

        {/* Staff Login Screen */}
        <Route path="/pos/login" element={<StaffLogin />} />

        {/* POS Dashboard with Sidebar */}
        <Route path="/pos" element={<PosLayout />}>
          <Route index element={<Navigate to="/pos/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;