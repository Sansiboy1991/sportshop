// src/utils/catalogHelpers.js
export function buildCategoryTree(categories) {
  const map = {};
  categories.forEach(c => map[c.id] = { ...c, children: [] });
  const tree = [];
  categories.forEach(c => {
    if (c.parentId && map[c.parentId]) map[c.parentId].children.push(map[c.id]);
    else tree.push(map[c.id]);
  });
  return tree;
}

// Базова назва без дужок "(Шоколад)" тощо
const baseTitle = (title) => title.replace(/\(.*?\)/g, "").trim().toLowerCase();

// Групуємо товари у "моделі" з варіантами (смак/фасування)
export function groupProducts(products) {
  const grouped = new Map();

  for (const p of products) {
    // 1️⃣ Чистимо назву від усього після " - "
    let baseName = p.title.split(" - ")[0].trim().toLowerCase();

    // 2️⃣ Альтернативно: якщо назва містить вагу (1000g, 1kg, 500g тощо) — відкидаємо її
    baseName = baseName.replace(/\b\d+(g|гр|kg|ml|капсул|таб)\b/gi, "").trim();

    // 3️⃣ Формуємо ключ групи
    const key = `${baseName}|${p.brand.toLowerCase()}|${p.categoryId}`;

    // 4️⃣ Якщо групи ще немає — створюємо
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: key,
        title: baseName,
        brand: p.brand,
        categoryId: p.categoryId,
        description: p.description,
        image: p.image,
        images: p.images,
        minPrice: p.price || 0,
        anyAvailable: p.available,
        variants: []
      });
    }

    // 5️⃣ Додаємо варіант у групу
    const g = grouped.get(key);
    g.variants.push({
      id: p.vendorCode,
      fullTitle: p.title,
      flavor: p.flavor || p.attrs["смак"] || p.attrs["вкус"] || "",
      weight: p.weight || p.attrs["фасування"] || p.attrs["вес"] || "",
      price: p.price,
      available: p.available,
      image: p.image
    });

    if (p.price && (g.minPrice === 0 || p.price < g.minPrice)) g.minPrice = p.price;
    if (p.available) g.anyAvailable = true;
  }

  // 6️⃣ Сортуємо варіанти — доступні зверху
  for (const g of grouped.values()) {
    g.variants.sort((a, b) => Number(b.available) - Number(a.available));
  }

  return Array.from(grouped.values());
}