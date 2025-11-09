import {
  X,
  Phone,
  Send,
  MessageCircle,
  Instagram,
  List,
} from "lucide-react";

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") onClose();
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/40 z-[9999]"
    >
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-2xl p-5 flex flex-col justify-between rounded-r-2xl animate-slide-right">
        {/* Верх */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Меню</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Каталог товарів — головний акцент */}
          <a
            href="#"
            className="flex items-center gap-2 text-base font-semibold text-blue-600 hover:text-blue-700 mb-5"
          >
            <List size={19} />
            Каталог товарів
          </a>

          {/* Інші категорії — нижній блок перед контактами */}
          <nav className="space-y-2 text-gray-600 text-[13px] tracking-wide mt-10">
            <a href="#" className="block hover:text-gray-900 transition">
              Доставка і оплата
            </a>
            <a href="#" className="block hover:text-gray-900 transition">
              Повернення, обмін
            </a>
            <a href="#" className="block hover:text-gray-900 transition">
              Про нас
            </a>
            <a href="#" className="block hover:text-gray-900 transition">
              Статті
            </a>
          </nav>
        </div>

        {/* Низ меню */}
        <div>
          <div className="border-t border-gray-200 my-4"></div>

          {/* Контакти */}
          <div className="text-gray-700 text-sm space-y-3">
            <h3 className="font-medium text-gray-800 mb-2">
              Зв’язок з нами
            </h3>

            <div className="space-y-1">
              <a
                href="tel:+380673454343"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 067 345 43 43
              </a>
              <a
                href="tel:+380633524343"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 063 352 43 43
              </a>
              <a
                href="tel:+380663544343"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <Phone size={15} strokeWidth={1.5} /> 066 354 43 43
              </a>
            </div>

            <div className="flex gap-4 pt-2 pl-1">
              <a href="https://t.me/your_telegram" target="_blank">
                <Send size={18} className="text-blue-500 hover:scale-110 transition" />
              </a>
              <a href="viber://chat?number=%2B380633524343">
                <MessageCircle
                  size={18}
                  className="text-purple-500 hover:scale-110 transition"
                />
              </a>
              <a
                href="https://www.instagram.com/yourprofile/"
                target="_blank"
              >
                <Instagram
                  size={18}
                  className="text-pink-500 hover:scale-110 transition"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
