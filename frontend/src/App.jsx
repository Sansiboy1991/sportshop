import { useState, useEffect } from "react";
import FilterSidebar from "./components/FilterSidebar";
import ProductCard from "./components/ProductCard";
import { fetchProducts, fetchCategories, fetchBrands } from "./api";

export default function App() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts(filters);
      setProducts(data.items || []);
    };
    load();
  }, [filters]);

  useEffect(() => {
    const loadInitial = async () => {
      const [catData, brandData] = await Promise.all([
        fetchCategories(),
        fetchBrands(),
      ]);
      setCategories(catData || []);
      setBrands(brandData || []);
    };
    loadInitial();
  }, []);

  return (
    <div className="relative flex bg-gray-50 min-h-screen font-[Inter]">
      {/* ====== Десктоп-сайдбар ====== */}
      <FilterSidebar
        categories={categories}
        brands={brands}
        onFilterChange={setFilters}
      />

      {/* ====== Мобільне меню фільтрів ====== */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 max-w-[80%] bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Фільтри</h3>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-3.5rem)]">
          <FilterSidebar
            categories={categories}
            brands={brands}
            onFilterChange={setFilters}
          />
        </div>
      </div>

      {/* ====== Основна частина ====== */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h18M4 8h16M5 12h14M6 16h12M7 20h10"
            />
          </svg>
          Фільтри
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          Каталог товарів
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            Товарів не знайдено 😢
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.vendorCode} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
