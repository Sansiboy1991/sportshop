// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderTop from "./components/HeaderTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import BrandsPage from "./pages/BrandsPage";
import CategoriesPage from "./pages/CategoriesPage";
import Container from "./components/Container";

export default function App() {
  return (
    <BrowserRouter>
      {/* 🔝 Верхній блок */}
      <div className="bg-white shadow-sm">
        <HeaderTop />
        <Header />
      </div>

      {/* 🔹 Контент сайту */}
      <main className="bg-[#f8fafc] min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col gap-16">
                {/* Повноекранні секції */}
                <div className="w-full">
                  <HomePage />
                </div>
              </div>
            }
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </main>

      {/* 🔻 Футер */}
      <Footer />
    </BrowserRouter>
  );
}
