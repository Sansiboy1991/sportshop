import React, { useEffect, useRef, useState } from "react";

// Можеш сміливо міняти ці посилання/тексти під себе
const BANNERS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1581391483221-74fefef79b7b?q=80&w=1600&auto=format&fit=crop",
    text: "🔥 Знижки до −40% на протеїн",
    sub: "Обери свій смак і форму",
    cta: "Перейти в протеїни",
    href: "#proteins",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1600&auto=format&fit=crop",
    text: "💪 Нові BCAA з Японії",
    sub: "EAA/BCAA – чисті амінокислоти для відновлення",
    cta: "Дивитись BCAA",
    href: "#bcaa",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1600",
    text: "⚡ Креатин для максимуму енергії",
    sub: "Класика результату: моногідрат / HCL",
    cta: "Обрати креатин",
    href: "#creatine",
  },
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);

  const go = (dir) => {
    setIndex((prev) => {
      const next = (prev + dir + BANNERS.length) % BANNERS.length;
      return next;
    });
  };

  useEffect(() => {
    if (hovered) return; // пауза при наведенні
    timerRef.current = setInterval(() => go(1), 4500);
    return () => clearInterval(timerRef.current);
  }, [hovered]);

  // для свайпу на мобілці
  const touchStartX = useRef(null);
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-lg select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ height: "clamp(220px, 32vw, 420px)" }} // адаптивна висота
    >
      {/* Слайди */}
      <div
        className="h-full w-full flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {BANNERS.map((b) => (
          <div key={b.id} className="relative min-w-full h-full">
            <img
              src={b.image}
              alt={b.text}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Градієнт для читабельності тексту */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
            {/* Текст/CTA */}
            <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-white">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm mb-3 border border-white/20">
                Новинки & Акції
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow">
                {b.text}
              </h3>
              {b.sub && (
                <p className="mt-2 text-sm md:text-base text-white/90 max-w-xl">
                  {b.sub}
                </p>
              )}
              {b.cta && (
                <a
                  href={b.href || "#"}
                  className="inline-flex items-center gap-2 mt-4 md:mt-6 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
                >
                  {b.cta} <span className="-mr-1">→</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Стрілки */}
      <button
        aria-label="Prev"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 md:h-10 md:w-10 rounded-full bg-black/40 hover:bg-black/55 text-white grid place-items-center"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 md:h-10 md:w-10 rounded-full bg-black/40 hover:bg-black/55 text-white grid place-items-center"
      >
        ›
      </button>

      {/* Крапки-індикатори */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
