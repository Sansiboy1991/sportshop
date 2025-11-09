import { useState, useEffect, useRef } from "react";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  return (
    <>
      <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* ==== Ліва частина ==== */}
          <div className="flex items-center gap-3">
            {/* Бургер */}
            <button
              className="text-gray-700 hover:text-blue-600 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* SVG логотип */}
            <div className="flex items-center">
              <img
                src="/logo.svg"
                alt="SportShop Logo"
                className="w-[130px] h-auto select-none"
              />
            </div>
          </div>

          {/* ==== Пошук (десктоп) ==== */}
          {!isMobile && (
            <div className="flex-1 max-w-lg mx-6 relative">
              <input
                type="text"
                placeholder="Пошук товару..."
                className="w-full border border-gray-300 rounded-full py-2.5 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          )}

          {/* ==== Іконки справа (включно з пошуком у мобільному) ==== */}
          <div className="flex items-center gap-6">
            {/* Пошук (мобільна іконка) */}
            {isMobile && (
              <button
                onClick={() => setShowSearch(true)}
                className="flex flex-col items-center text-gray-700 hover:text-blue-600 text-xs transition"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
            )}

            {/* Увійти */}
            <button className="flex flex-col items-center text-gray-700 hover:text-blue-600 text-xs transition">
              <User size={22} strokeWidth={1.5} />
              {!isMobile && <span className="mt-1">Увійти</span>}
            </button>

            {/* Улюблене */}
            <button className="flex flex-col items-center text-gray-700 hover:text-blue-600 text-xs transition">
              <Heart size={22} strokeWidth={1.5} />
              {!isMobile && <span className="mt-1">Улюблене</span>}
            </button>

            {/* Кошик */}
            <button className="flex flex-col items-center text-gray-700 hover:text-blue-600 text-xs transition relative">
              <ShoppingCart size={22} strokeWidth={1.5} />
              {!isMobile && <span className="mt-1">Кошик</span>}
              <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ==== Мобільний пошук (overlay) ==== */}
      {showSearch && isMobile && (
        <div
          className="fixed inset-0 bg-white z-[9999] animate-slide-down flex flex-col px-4 pt-4"
          onClick={() => setShowSearch(false)}
        >
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <input
              ref={searchRef}
              type="text"
              placeholder="Пошук товару..."
              className="flex-1 text-gray-800 text-base placeholder-gray-400 focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="text-gray-600 hover:text-gray-900 ml-3"
              onClick={() => setShowSearch(false)}
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}

      {/* ==== Мобільне меню ==== */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
