import { useState, useEffect } from "react";
import { Menu, Search, Heart, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MegaMenuMain from "./MegaMenuMain";
import MobileMenu from "./MobileMenu";
import Container from "./Container";

export default function Header() {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-[999] bg-white/80 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <Container>
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* 🔹 Ліва частина */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Мобільний бургер */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-700 hover:text-[#0076CE]"
            >
              <Menu size={26} />
            </button>

            {/* Лого */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <img
                src="/logo.png"
                alt="FreshSport"
                className="h-8 md:h-9 transition-transform hover:scale-105"
              />
              <span className="text-[#003A70] font-extrabold text-xl md:text-2xl tracking-tight">
                Fresh<span className="text-[#0076CE]">Sport</span>
              </span>
            </div>

            {/* Кнопка каталогу */}
            {!isMobile && (
              <button
                onClick={() => setIsMegaOpen(!isMegaOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-[15px] transition ${
                  isMegaOpen
                    ? "bg-[#E8F6FF] text-[#0076CE]"
                    : "hover:bg-[#F3F8FC] text-gray-800"
                }`}
              >
                <Menu size={18} />
                Каталог
              </button>
            )}
          </div>

          {/* 🔹 Центр — пошук */}
          {!isMobile && (
            <div className="flex-1 max-w-[540px] relative group">
              <input
                type="text"
                placeholder="Пошук товарів, брендів, категорій..."
                className="w-full bg-[#F7F9FB] border border-transparent rounded-full pl-5 pr-12 py-2.5 text-[15px] text-gray-800 focus:bg-white focus:border-[#0076CE]/40 focus:ring-2 focus:ring-[#0076CE]/10 outline-none transition-all shadow-sm placeholder:text-gray-400"
              />
              <button className="absolute right-2.5 top-1.5 bg-[#0076CE] text-white p-2 rounded-full hover:bg-[#005fa3] transition">
                <Search size={18} />
              </button>
            </div>
          )}

          {/* 🔹 Права частина */}
          <div className="flex items-center gap-5 text-gray-700">
            {!isMobile && (
              <>
                <button className="hover:text-[#0076CE] transition">
                  <User size={22} />
                </button>
                <button className="hover:text-[#0076CE] transition relative">
                  <Heart size={22} />
                </button>
              </>
            )}
            <button className="hover:text-[#0076CE] transition relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-2 bg-[#0076CE] text-white text-[10px] px-[5px] py-[1px] rounded-full">
                2
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* 🔹 Мега-меню (для десктопів) */}
      {!isMobile && isMegaOpen && (
        <MegaMenuMain onClose={() => setIsMegaOpen(false)} />
      )}

      {/* 🔹 Мобільне меню */}
      {isMobile && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
