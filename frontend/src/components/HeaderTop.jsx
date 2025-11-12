import { useState, useEffect, useRef } from "react";
import { Phone, X, Instagram, Send, MessageCircle } from "lucide-react";

export default function HeaderTop() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target))
        setIsAboutOpen(false);
      if (contactRef.current && !contactRef.current.contains(event.target))
        setIsContactOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isMobile) return null;

  return (
    <section className="relative w-full bg-gradient-to-r from-[#E8F6FF] to-[#D9EEFF] text-[#003A70] border-b border-[#cfe9ff] text-sm z-50">
      <div className="flex justify-between items-center px-8 py-2 max-w-[1600px] mx-auto">
        {/* 🔹 Ліва частина */}
        <div className="flex items-center gap-6 font-medium">
          <a href="#" className="hover:text-[#0076CE] transition">
            Доставка і оплата
          </a>
          <a href="#" className="hover:text-[#0076CE] transition">
            Повернення, обмін
          </a>
          <button
            onClick={() => {
              setIsAboutOpen(!isAboutOpen);
              setIsContactOpen(false);
            }}
            className="hover:text-[#0076CE] transition"
          >
            Про нас
          </button>
        </div>

        {/* 🔹 Права частина */}
        <button
          onClick={() => {
            setIsContactOpen(!isContactOpen);
            setIsAboutOpen(false);
          }}
          className="flex items-center gap-2 font-semibold hover:text-[#0076CE] transition"
        >
          <Phone size={14} strokeWidth={1.5} />
          <span>Зв’язок з нами</span>
          <span className="text-xs text-[#0076CE]/70">▼</span>
        </button>
      </div>

      {/* 🔸 Модалка “Про нас” */}
      {isAboutOpen && (
        <div
          ref={aboutRef}
          className="absolute left-8 top-[42px] w-[300px] bg-white border border-[#cfe9ff]
                     rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.1)] animate-slide-down z-[9999]"
        >
          <div className="px-4 py-3 border-b border-[#cfe9ff] flex justify-between items-center">
            <h2 className="font-semibold text-[#003A70] text-sm mx-auto">
              Про наш магазин
            </h2>
            <button
              onClick={() => setIsAboutOpen(false)}
              className="text-[#0076CE]/60 hover:text-[#0076CE]"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4 text-[#003A70]/80 text-sm space-y-3">
            <p>
              Спортивне харчування, вітаміни та аксесуари для здорового життя.
            </p>
            <p>
              Мета — зробити якісні добавки доступними кожному спортсмену.
            </p>
            <div className="pt-3 border-t border-[#cfe9ff] text-xs text-[#003A70]/70">
              <p>🕐 Пн–Нд: 10:00–19:00</p>
              <p>📍 Доставка по всій Україні</p>
            </div>
          </div>
        </div>
      )}

      {/* 🔸 Модалка “Контакти” */}
      {isContactOpen && (
        <div
          ref={contactRef}
          className="absolute right-8 top-[42px] w-[270px] bg-white border border-[#cfe9ff]
                     rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.1)] animate-slide-down z-[9999]"
        >
          <div className="px-4 py-3 border-b border-[#cfe9ff] flex justify-between items-center">
            <h2 className="font-semibold text-[#003A70] text-sm mx-auto">
              Зв’язок з нами
            </h2>
            <button
              onClick={() => setIsContactOpen(false)}
              className="text-[#0076CE]/60 hover:text-[#0076CE]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4 text-[#003A70]/80 text-sm space-y-3 text-center">
            <a
              href="tel:+380673454343"
              className="flex justify-center gap-2 hover:text-[#0076CE] transition"
            >
              <Phone size={15} /> 067 345 43 43
            </a>
            <a
              href="tel:+380633524343"
              className="flex justify-center gap-2 hover:text-[#0076CE] transition"
            >
              <Phone size={15} /> 063 352 43 43
            </a>
            <div className="flex justify-center gap-4 pt-3">
              <a href="https://t.me/freshsport" target="_blank">
                <Send
                  size={18}
                  className="text-[#0076CE] hover:scale-110 transition"
                />
              </a>
              <a href="viber://chat?number=%2B380633524343">
                <MessageCircle
                  size={18}
                  className="text-[#7c4dff] hover:scale-110 transition"
                />
              </a>
              <a href="https://www.instagram.com/freshsport" target="_blank">
                <Instagram
                  size={18}
                  className="text-[#E1306C] hover:scale-110 transition"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
