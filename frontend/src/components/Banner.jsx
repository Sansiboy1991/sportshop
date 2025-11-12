import React from "react";

export default function Banner() {
  const brands = [
    { name: "MyProtein", logo: "https://dummyimage.com/120x40/0076CE/fff&text=MyProtein" },
    { name: "BiotechUSA", logo: "https://dummyimage.com/120x40/111/fff&text=BiotechUSA" },
    { name: "Optimum Nutrition", logo: "https://dummyimage.com/120x40/333/fff&text=Optimum" },
    { name: "Prozis", logo: "https://dummyimage.com/120x40/f00/fff&text=Prozis" },
    { name: "Now Foods", logo: "https://dummyimage.com/120x40/f68b1e/fff&text=Now+Foods" },
  ];

  return (
    <div className="relative w-full bg-[#003A70] text-white overflow-hidden border-b border-[#005fa3]">
      {/* 🔹 Рухомі логотипи брендів */}
      <div className="flex items-center gap-12 py-3 animate-scroll whitespace-nowrap">
        {[...brands, ...brands].map((brand, i) => (
          <div key={i} className="flex flex-col items-center justify-center opacity-90 hover:opacity-100 transition">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-8 md:h-10 object-contain"
            />
          </div>
        ))}
      </div>

      {/* 🔹 Акційний текст поверх */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#003a70]/60 to-[#005fa3]/60 text-white font-semibold text-sm md:text-base tracking-wide backdrop-blur-[1px]">
        <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10">
          🔥 Знижки до -30% на бренди цього тижня!
        </span>
      </div>

      {/* 🔹 Анімація */}
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
