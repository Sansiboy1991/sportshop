import React, { useEffect, useRef, useState } from "react";

const categories = [
  {
    name: "Протеїни",
    subs: ["Сироватковий", "Ізолят", "Казеїн", "Комплексний", "Low Carb", "Веганський", "Gold Series"],
  },
  {
    name: "Креатин",
    subs: ["Моногідрат", "HCL", "Мікронізований", "Капсульований", "Комплексний"],
  },
  {
    name: "Амінокислоти",
    subs: ["BCAA", "EAA", "Глютамін", "Аргінін", "Цитрулін", "Таурин"],
  },
  {
    name: "Вітаміни",
    subs: ["C", "D3", "E", "B12", "Омега-3", "Цинк", "Магній", "Кальцій"],
  },
];

export default function MegaMenuModal({ isOpen, onClose }) {
  const [active, setActive] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-[100px] z-[9999]">
      <div
        ref={modalRef}
        className="flex w-[92%] max-w-[1350px] min-h-[460px] bg-white border border-black rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Ліва колонка категорій */}
        <div className="w-[280px] border-r border-black/50 bg-white flex flex-col">
          {categories.map((cat, i) => (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              className={`px-5 py-3 text-[17px] font-semibold cursor-pointer transition-all
                ${active === i
                  ? "bg-[#f9f9f9] text-[#b9ad6c] border-l-[3px] border-[#b9ad6c]"
                  : "hover:bg-gray-50 text-gray-900"}`}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* Права панель з підкатегоріями */}
        <div className="flex-1 bg-white p-8 grid grid-cols-3 gap-x-6 gap-y-3">
          {active !== null &&
            categories[active].subs.map((sub, i) => (
              <div
                key={i}
                className="cursor-pointer text-[16px] font-medium text-gray-800 hover:text-[#b9ad6c] transition"
              >
                {sub}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
