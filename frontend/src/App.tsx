import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CategoryPage } from "./pages/CategoryPage";
import { BrowsePage } from "./pages/BrowsePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
