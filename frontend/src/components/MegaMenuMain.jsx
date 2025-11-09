// src/components/MegaMenuMain.jsx
import { useState, useEffect } from "react";

const categories = [
  { name: "Протеїни", subs: ["Сироватковий", "Ізолят", "Казеїн", "Комплексний", "Веганський", "Low Carb"] },
  { name: "Креатин", subs: ["Моногідрат", "HCL", "Мікронізований", "Капсульований", "Комплексний"] },
  { name: "Амінокислоти", subs: ["BCAA", "EAA", "Глютамін", "Аргінін", "Таурин"] },
  { name: "Вітаміни", subs: ["Вітамін C", "D3", "B-комплекс", "Омега-3", "Магній"] },
];

const banners = [
  { id: 1, img: "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1600&auto=format&fit=crop" },
  { id: 2, img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1600&auto=format&fit=crop" },
  { id: 3, img: "https://images.unsplash.com/photo-1594737625785-cff93ef1c7c1?q=80&w=1600&auto=format&fit=crop" },
];

export default function MegaMenuMain() {
  const [active, setActive] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full flex justify-center bg-white py-8 border-t border-gray-200">
      <div className="flex w-full max-w-[1280px] gap-5 px-5 h-[440px] relative">
        {/* 🔹 Ліва панель категорій */}
        <aside className="w-[27%] rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white relative z-20">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`group px-5 py-3 font-medium text-[15px] border-b border-gray-100 cursor-pointer relative transition-all ${
                active === i
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 hover:text-blue-600"
              }`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {cat.name}

              {/* 🔸 Підменю (випадає збоку) */}
              <div
                className={`absolute top-0 left-full bg-white border border-gray-200 rounded-xl shadow-xl p-6 grid gap-y-2 min-w-[280px] max-w-[480px] transition-all duration-200 ease-out ${
                  active === i
                    ? "opacity-100 translate-x-0 visible"
                    : "opacity-0 -translate-x-4 invisible"
                }`}
              >
                {cat.subs.map((sub, j) => (
                  <div
                    key={j}
                    className="text-[14px] text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* 🔸 Банер */}
        <div className="relative flex-1 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          {banners.map((b, i) => (
            <img
              key={b.id}
              src={b.img}
              alt=""
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}

          {/* 🔘 Стрілки */}
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 text-blue-600 
                       hover:bg-blue-100 transition-all w-10 h-10 flex items-center 
                       justify-center rounded-full shadow-md z-30"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 text-blue-600 
                       hover:bg-blue-100 transition-all w-10 h-10 flex items-center 
                       justify-center rounded-full shadow-md z-30"
          >
            ›
          </button>

          {/* 🔹 Навігаційні точки */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {banners.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  i === current
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-blue-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
