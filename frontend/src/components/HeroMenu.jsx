import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroMenu() {
  const navigate = useNavigate();

  const brands = [
    {
      name: "MyProtein",
      image: "https://app.box.com/shared/static/qy8qjmup3ioppfbktcdybz3nrbo6h5ry/img/myprotein-banner.jpg",
      logo: "https://app.box.com/shared/static/qy8qjmup3ioppfbktcdybz3nrbo6h5ry/img/myprotein-logo.png",
      desc: "Легендарний британський бренд спортивного харчування №1 у Європі.",
      link: "/brands/myprotein",
      color: "#00AEEF",
    },
    {
      name: "OstroVit",
      image: "https://app.box.com/shared/static/qy8qjmup3ioppfbktcdybz3nrbo6h5ry/img/ostrovit-banner.jpg",
      logo: "https://app.box.com/shared/static/qy8qjmup3ioppfbktcdybz3nrbo6h5ry/img/ostrovit-logo.png",
      desc: "Польська якість, яка довела свою ефективність. Твій вибір для кожного дня.",
      link: "/brands/ostrovit",
      color: "#50267A",
    },
    {
      name: "BioTechUSA",
      image: "https://app.box.com/shared/static/qy8qjmup3ioppfbktcdybz3nrbo6h5ry/img/biotech-banner.jpg",
      logo: "https://app.box.com/shared/static/qy8qjmup3ioppfbktcdybz3nrbo6h5ry/img/biotech-logo.png",
      desc: "Бестселер з Угорщини: преміум-добавки для спортсменів і активних людей.",
      link: "/brands/biotechusa",
      color: "#000",
    },
    {
      name: "MST Nutrition",
      image: "https://app.box.com/shared/static/qy8qjmup3ioppfbktcdybz3nrbo6h5ry/img/mst-banner.jpg",
      logo: "https://app.box.com/shared/static/qy8qjmup3ioppfbktcdybz3nrbo6h5ry/img/mst-logo.png",
      desc: "Німецька формула потужності. Сила, яку відчуваєш після кожного тренування.",
      link: "/brands/mst",
      color: "#D81921",
    },
  ];

  return (
    <section className="relative w-full bg-white rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.08)] mt-6">
      <div className="relative">
        {/* 🔹 Hero — велика секція з брендом */}
        <div
          className="relative bg-cover bg-center text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-10 md:py-16 transition-all duration-500"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.1)), url(${brands[0].image})`,
          }}
        >
          <div className="max-w-[500px]">
            <img
              src={brands[0].logo}
              alt={brands[0].name}
              className="w-40 md:w-52 mb-6 drop-shadow-lg"
            />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              {brands[0].name} <span className="text-[#00AEEF]">Forever Fit</span>
            </h2>
            <p className="text-lg text-white/90 mb-6">{brands[0].desc}</p>
            <button
              onClick={() => navigate(brands[0].link)}
              className="bg-[#00AEEF] hover:bg-[#008FCC] text-white font-semibold px-6 py-3 rounded-xl transition shadow-md"
            >
              Обрати бренд
            </button>
          </div>

          <div className="hidden md:block w-[400px]">
            <img
              src={brands[0].image}
              alt="Brand products"
              className="w-full object-contain rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* 🔹 Бренди нижче */}
        <div className="flex flex-wrap justify-center items-center gap-8 py-6 bg-[#F9FCFF] border-t border-gray-200">
          {brands.map((b, i) => (
            <div
              key={i}
              onClick={() => navigate(b.link)}
              className="flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:shadow-md transition">
                <img
                  src={b.logo}
                  alt={b.name}
                  className="w-16 h-16 object-contain grayscale group-hover:grayscale-0 transition"
                />
              </div>
              <span className="text-sm font-semibold text-gray-800 mt-2 group-hover:text-[#0076CE]">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
