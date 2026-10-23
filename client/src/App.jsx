import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebLayout from "./layouts/WebLayout";
import HomePage from "./pages/web/HomePage";
import CakesPage from "./pages/web/CakesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WebLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cakes" element={<CakesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
