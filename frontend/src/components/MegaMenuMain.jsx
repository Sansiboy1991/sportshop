import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroMenu() {
  const navigate = useNavigate();

  const categories = [
    "Протеїни",
    "Креатин",
    "Амінокислоти",
    "Вітаміни та БАДи",
    "Жироспалювачі",
    "Передтренувальні комплекси",
    "Суперфуди",
    "Колаген",
    "Пробіотики",
  ];

  const promo = {
    title: "MyProtein – Forever Fit 💪",
    desc: "Європейський лідер у спортивному харчуванні. Відчуй якість кожного шейку!",
    image:
      "https://cdn.myprotein.com/image/upload/f_auto,q_auto/v1674044253/banners/uk/mp_hp_hero_proteinrange_v2.jpg",
    link: "/brands/myprotein",
  };

  const popularProducts = [
    {
      id: 1,
      title: "Impact Whey Protein - 1000g",
      brand: "MyProtein",
      price: "2 269 грн",
      image:
        "https://cdn.myprotein.com/image/upload/f_auto,q_auto/v1674034253/banners/uk/impact-whey-protein.png",
    },
    {
      id: 2,
      title: "Creatine Monohydrate - 500g",
      brand: "OstroVit",
      price: "1 049 грн",
      image:
        "https://static.ostrovit.com/productpictures/800_800/25572.jpg",
    },
  ];

  return (
    <section className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden mt-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr]">
        {/* 🔹 Ліва частина — Категорії */}
        <aside className="bg-[#f8fafc] p-4 border-r border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">
            Каталог товарів
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {categories.map((cat, i) => (
              <li
                key={i}
                className="hover:bg-[#0076CE]/10 px-3 py-2 rounded-md cursor-pointer transition"
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* 🔹 Центральний блок — Промо */}
        <div
          className="relative bg-cover bg-center flex flex-col justify-center px-6 md:px-12 py-12 text-white"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.25)), url(${promo.image})`,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
            {promo.title}
          </h2>
          <p className="text-white/90 max-w-[500px] mb-6">{promo.desc}</p>
          <button
            onClick={() => navigate(promo.link)}
            className="bg-[#00AEEF] hover:bg-[#008FCC] px-6 py-3 rounded-xl text-white font-semibold transition shadow-lg w-fit"
          >
            Перейти до бренду →
          </button>
        </div>

        {/* 🔹 Права частина — Популярні товари */}
        <aside className="bg-[#f9fafc] border-l border-gray-200 p-4 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Гарячі новинки 🔥
          </h3>
          {popularProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-3 flex flex-col items-center text-center cursor-pointer"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-28 h-28 object-contain mb-3"
              />
              <h4 className="text-sm font-medium text-gray-800 mb-1">
                {p.title}
              </h4>
              <span className="text-xs text-[#0076CE] font-semibold">
                {p.brand}
              </span>
              <p className="text-gray-900 font-bold text-sm mt-1">{p.price}</p>
              <button className="mt-2 bg-[#0076CE] hover:bg-[#005fa3] text-white text-xs px-4 py-2 rounded-lg transition">
                Купити
              </button>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
