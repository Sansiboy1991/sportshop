import React from "react";

export default function CategoriesBlock() {
  const categories = [
    { name: "Протеїни", img: "https://dummyimage.com/200x200/0076CE/fff&text=Protein" },
    { name: "Креатин", img: "https://dummyimage.com/200x200/795548/fff&text=Creatine" },
    { name: "Амінокислоти", img: "https://dummyimage.com/200x200/009688/fff&text=Amino" },
    { name: "Вітаміни", img: "https://dummyimage.com/200x200/283593/fff&text=Vitamins" },
    { name: "Жироспалювачі", img: "https://dummyimage.com/200x200/f57c00/fff&text=Fat+Burners" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer border border-gray-100"
        >
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="p-3 text-center">
            <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#0076CE]">
              {cat.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
