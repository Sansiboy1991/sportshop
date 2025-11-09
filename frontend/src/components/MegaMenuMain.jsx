// src/components/MegaMenuMain.jsx
import React, { useState, useEffect } from "react";

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
    const i = setInterval(() => setCurrent((p) => (p + 1) % banners.length), 4500);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      className="w-full py-4"
      style={{ background: "#f8f8f6", display: "flex", justifyContent: "center" }}
    >
      <div className="flex w-full max-w-[1280px] gap-4 h-[420px] px-4">
        {/* 🔹 Категорії */}
        <div
          className="w-[28%] rounded-xl overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.15)] relative"
          style={{ background: "#2e2e2d", color: "#f8f8f6" }}
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`px-5 py-3 font-semibold text-[15px] cursor-pointer border-b border-[#3b3b3a] transition-all ${
                active === i
                  ? "bg-[#b6a762]/20 text-[#b6a762]"
                  : "hover:bg-[#3b3b3a] hover:text-[#d6c781]"
              }`}
            >
              {cat.name}
              {active === i && (
                <div
                  className="absolute top-0 left-[100%] bg-[#2e2e2d] border border-[#b6a762]/40 text-[#f8f8f6] 
                             rounded-r-xl shadow-[0_8px_20px_rgba(0,0,0,0.25)] p-6 grid gap-y-2"
                  style={{
                    width: "max-content",
                    minWidth: "280px",
                    maxWidth: "500px",
                    gridTemplateColumns:
                      categories[i].subs.length > 8 ? "repeat(2, 1fr)" : "1fr",
                  }}
                >
                  {categories[i].subs.map((sub, j) => (
                    <div
                      key={j}
                      className="text-[14px] hover:text-[#b6a762] transition-all cursor-pointer"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 🔸 Банер */}
        <div
          className="relative flex-1 rounded-xl overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.15)]"
          style={{
            background: "#1e1e1e",
          }}
        >
          {banners.map((b, i) => (
            <img
              key={b.id}
              src={b.img}
              alt=""
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 rounded-xl ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}

          {/* 🔘 Стрілки */}
          <button
            onClick={() =>
              setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#2e2e2d]/70 text-[#b6a762] 
                       hover:bg-[#b6a762]/30 hover:text-white transition-all w-10 h-10 
                       flex items-center justify-center rounded-full shadow-md"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#2e2e2d]/70 text-[#b6a762] 
                       hover:bg-[#b6a762]/30 hover:text-white transition-all w-10 h-10 
                       flex items-center justify-center rounded-full shadow-md"
          >
            ›
          </button>

          {/* 🔹 Навігаційні точки */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  i === current
                    ? "bg-[#b6a762]"
                    : "bg-white/40 hover:bg-[#b6a762]/60"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
