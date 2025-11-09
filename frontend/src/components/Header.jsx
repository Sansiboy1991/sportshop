import { useState, useEffect, useRef } from "react";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import MegaMenuModal from "./MegaMenuModal";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showSearch && searchRef.current) searchRef.current.focus();
  }, [showSearch]);

  return (
    <>
      <header
        className="w-full sticky top-0 z-40 border-b shadow-[0_2px_6px_rgba(0,0,0,0.05)]"
        style={{
          backgroundColor: "var(--color-bg-page)",
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
        }}
      >
        <div className="max-w-[1350px] mx-auto flex items-center justify-between px-5 py-4 gap-6">
          {/* ==== Лого + бургер ==== */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="md:hidden transition"
              style={{
                color: "var(--color-text)",
              }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={26} />
            </button>

            <div className="flex items-center">
              <img
                src="/logo.svg"
                alt="SportShop"
                className="w-[140px] h-auto select-none"
              />
            </div>
          </div>

          {/* ==== Кнопка Каталогу ==== */}
          {!isMobile && (
            <button
              onClick={() => setShowCatalog(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-[15px]
                         shadow-md hover:shadow-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-accent)")
              }
            >
              <Menu size={20} />
              Каталог товарів
            </button>
          )}

          {/* ==== Пошук ==== */}
          {!isMobile && (
            <div className="flex-1 max-w-[620px] mx-4 relative">
              <input
                type="text"
                placeholder="Пошук товарів, брендів, категорій..."
                className="w-full rounded-full py-3 pl-5 pr-14 text-[15px] transition"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-block)",
                  color: "var(--color-text)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-3 transition"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent)")
                }
              >
                <Search size={18} />
              </button>
            </div>
          )}

          {/* ==== Іконки справа ==== */}
          <div className="flex items-center gap-6">
            {isMobile && (
              <button
                onClick={() => setShowSearch(true)}
                className="flex flex-col items-center text-xs transition"
                style={{ color: "var(--color-text)" }}
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
            )}
            <button
              className="flex flex-col items-center text-xs transition"
              style={{ color: "var(--color-text)" }}
            >
              <User size={22} strokeWidth={1.5} />
              {!isMobile && <span className="mt-1">Увійти</span>}
            </button>
            <button
              className="flex flex-col items-center text-xs transition"
              style={{ color: "var(--color-text)" }}
            >
              <Heart size={22} strokeWidth={1.5} />
              {!isMobile && <span className="mt-1">Улюблене</span>}
            </button>
            <button
              className="flex flex-col items-center text-xs transition relative"
              style={{ color: "var(--color-text)" }}
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {!isMobile && <span className="mt-1">Кошик</span>}
              <span
                className="absolute -top-1.5 -right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "#fff",
                }}
              >
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ==== Мобільний пошук ==== */}
      {showSearch && isMobile && (
        <div
          className="fixed inset-0 z-[9999] animate-slide-down flex flex-col px-4 pt-4"
          style={{ backgroundColor: "var(--color-bg-page)" }}
          onClick={() => setShowSearch(false)}
        >
          <div
            className="flex items-center justify-between border-b pb-2"
            style={{ borderColor: "var(--color-border)" }}
          >
            <input
              ref={searchRef}
              type="text"
              placeholder="Пошук..."
              className="flex-1 text-base focus:outline-none"
              style={{
                color: "var(--color-text)",
                backgroundColor: "transparent",
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="ml-3"
              style={{ color: "var(--color-text)" }}
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

      {/* ==== Модалка каталогу ==== */}
      <MegaMenuModal isOpen={showCatalog} onClose={() => setShowCatalog(false)} />
    </>
  );
}
