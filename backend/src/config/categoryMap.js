// src/config/categoryMap.js
// Приклад: ID тут — це реальні categoryId з XML. Розшириш за потреби.
export const categoryMap = {
  // Головна категорія "Протеїн"
  "1381": {
    name: "Протеїн",
    children: {
      // Підкатегорії-предикати як фільтри (приклади)
      "protein-whey":   { name: "Сироватковий", filter: { param: "тип", value: "сироватковий" } },
      "protein-casein": { name: "Казеїновий",   filter: { param: "тип", value: "казеїновий" } },
      "protein-soy":    { name: "Соєвий",       filter: { param: "тип", value: "соєвий" } },
    }
  },
  // Інші приклади
  "1390": { name: "Амінокислоти", children: {} },
  "1400": { name: "Вітаміни", children: {} },
};
