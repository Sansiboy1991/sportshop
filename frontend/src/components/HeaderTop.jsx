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

    // Закриття при кліку поза модалками
    const handleClickOutside = (event) => {
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target)
      ) setIsAboutOpen(false);

      if (
        contactRef.current &&
        !contactRef.current.contains(event.target)
      ) setIsContactOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="w-full bg-[#333333] text-[#ebebeb] border-b border-[#c2c2c2] text-sm relative z-50">
      <div className="max-w-[1350px] mx-auto flex justify-between items-center px-5 py-2">
        {/* 🔹 Ліва частина */}
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#4e88ca] transition">
            Доставка і оплата
          </a>
          <a href="#" className="hover:text-[#4e88ca] transition">
            Повернення, обмін
          </a>
          <button
            onClick={() => {
              setIsAboutOpen(!isAboutOpen);
              setIsContactOpen(false);
            }}
            className="hover:text-[#4e88ca] transition"
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
          className="flex items-center gap-2 font-medium hover:text-[#4e88ca] transition"
        >
          <Phone size={14} strokeWidth={1.5} />
          <span>Зв’язок з нами</span>
          <span className="text-xs text-[#ebebeb]/70">▼</span>
        </button>
      </div>

      {/* 🔸 Модалка “Про нас” */}
      {isAboutOpen && (
        <div
          ref={aboutRef}
          className="absolute left-5 top-[42px] w-[300px] bg-[#333333] border border-[#c2c2c2]
                     rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-[9999] animate-slide-down"
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#c2c2c2]">
            <h2 className="font-semibold text-[#ebebeb] text-sm tracking-wide mx-auto">
              Про наш магазин
            </h2>
            <button
              onClick={() => setIsAboutOpen(false)}
              className="text-[#ebebeb]/70 hover:text-[#4e88ca] transition absolute right-3"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="p-4 text-[#ebebeb]/90 text-sm space-y-3">
            <p>
              Ми спеціалізуємося на спортивному харчуванні, вітамінах та
              аксесуарах для здорового способу життя.
            </p>
            <p>
              Наша мета — зробити якісні добавки доступними кожному спортсмену в Україні.
            </p>
            <div className="pt-3 border-t border-[#c2c2c2] text-xs text-[#ebebeb]/70">
              <p>🕐 Пн – Нд: 10:00 – 19:00</p>
              <p>📍 Доставка по всій Україні</p>
            </div>
          </div>
        </div>
      )}

      {/* 🔸 Модалка “Зв’язок з нами” */}
      {isContactOpen && (
        <div
          ref={contactRef}
          className="absolute right-5 top-[42px] w-[270px] bg-[#333333] border border-[#c2c2c2]
                     rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-[9999] animate-slide-down"
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#c2c2c2]">
            <h2 className="font-semibold text-[#ebebeb] text-sm tracking-wide mx-auto">
              Зв’язок з нами
            </h2>
            <button
              onClick={() => setIsContactOpen(false)}
              className="text-[#ebebeb]/70 hover:text-[#4e88ca] transition absolute right-3"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="p-4 text-[#ebebeb]/90 text-sm space-y-3">
            <div className="space-y-1 text-center">
              <a
                href="tel:+380673454343"
                className="flex items-center justify-center gap-2 hover:text-[#4e88ca] transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 067 345 43 43
              </a>
              <a
                href="tel:+380633524343"
                className="flex items-center justify-center gap-2 hover:text-[#4e88ca] transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 063 352 43 43
              </a>
              <a
                href="tel:+380663544343"
                className="flex items-center justify-center gap-2 hover:text-[#4e88ca] transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 066 354 43 43
              </a>
            </div>

            <div className="pt-2 space-y-2 text-center">
              <a
                href="https://t.me/your_telegram"
                target="_blank"
                className="flex justify-center items-center gap-2 hover:text-[#4e88ca] transition"
              >
                <Send size={15} strokeWidth={1.5} /> Telegram
              </a>
              <a
                href="viber://chat?number=%2B380633524343"
                className="flex justify-center items-center gap-2 hover:text-[#4e88ca] transition"
              >
                <MessageCircle size={15} strokeWidth={1.5} /> Viber
              </a>
              <a
                href="https://www.instagram.com/yourprofile/"
                target="_blank"
                className="flex justify-center items-center gap-2 hover:text-[#4e88ca] transition"
              >
                <Instagram size={15} strokeWidth={1.5} /> Instagram
              </a>
            </div>

            <div className="pt-3 border-t border-[#c2c2c2] text-xs text-[#ebebeb]/70">
              <p className="font-medium text-[#ebebeb]">
                Графік опрацювання:
              </p>
              <p>Пн – Нд: 10:00 – 19:00</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
