import { useState, useEffect, useRef } from "react";
import { Phone, X, Instagram, Send, MessageCircle } from "lucide-react";

export default function HeaderTop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Закриваємо модалку при кліку поза нею
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Не показуємо HeaderTop на мобільних
  if (isMobile) return null;

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 text-sm text-gray-700 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-1.5">
        {/* ==== Ліва частина ==== */}
        <div className="flex items-center gap-5 sm:gap-8">
          <a
            href="#"
            className="cursor-pointer hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-400"
          >
            Доставка і оплата
          </a>
          <a
            href="#"
            className="cursor-pointer hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-400"
          >
            Повернення, обмін
          </a>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            ref={buttonRef}
            className="cursor-pointer hover:text-gray-900 hover:underline underline-offset-4 decoration-gray-400"
          >
            Контакти
          </button>
        </div>

        {/* ==== Права частина ==== */}
        <div className="flex items-center">
          <button
            ref={buttonRef}
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex items-center gap-1 font-medium text-gray-800 hover:text-blue-600 transition"
          >
            <Phone size={14} strokeWidth={1.5} />
            <span>Зв’язок з нами</span>
            <span className="text-gray-500 text-xs">▼</span>
          </button>
        </div>
      </div>

      {/* ==== Модалка контактів ==== */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute right-4 top-[42px] w-[260px] bg-white shadow-2xl border border-gray-200 rounded-xl z-[9999] animate-slide-down text-center"
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm tracking-wide mx-auto">
              Приймаємо замовлення
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-700 transition absolute right-3"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="p-4 text-gray-700 text-sm space-y-3">
            <div className="space-y-1">
              <a
                href="tel:+380673454343"
                className="flex items-center justify-center gap-2 hover:text-blue-600 transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 067 345 43 43
              </a>
              <a
                href="tel:+380633524343"
                className="flex items-center justify-center gap-2 hover:text-blue-600 transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 063 352 43 43
              </a>
              <a
                href="tel:+380663544343"
                className="flex items-center justify-center gap-2 hover:text-blue-600 transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 066 354 43 43
              </a>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href="https://t.me/your_telegram"
                target="_blank"
                className="flex justify-center items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <Send size={15} strokeWidth={1.5} /> Telegram
              </a>
              <a
                href="viber://chat?number=%2B380633524343"
                className="flex justify-center items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <MessageCircle size={15} strokeWidth={1.5} /> Viber
              </a>
              <a
                href="https://www.instagram.com/yourprofile/"
                target="_blank"
                className="flex justify-center items-center gap-2 text-gray-600 hover:text-pink-600"
              >
                <Instagram size={15} strokeWidth={1.5} /> Instagram
              </a>
            </div>

            <div className="pt-3 border-t border-gray-200 text-xs text-gray-500">
              <p className="font-medium text-gray-600">
                Графік опрацювання замовлень:
              </p>
              <p>Пн – Нд: 10:00 – 19:00</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
