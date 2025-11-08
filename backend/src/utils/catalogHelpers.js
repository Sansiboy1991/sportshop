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
    const key = `${baseTitle(p.title)}|${p.brand.toLowerCase()}|${p.categoryId}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: key, // можна потім захешувати/зробити slug
        title: baseTitle(p.title), // базова назва
        brand: p.brand,
        categoryId: p.categoryId,
        description: p.description, // перший опис як базовий
        image: p.image,
        images: p.images,
        // агрегати
        minPrice: p.price || 0,
        anyAvailable: !!p.available,
        variants: []
      });
    }

    const g = grouped.get(key);
    g.variants.push({
      id: p.vendorCode,
      flavor: p.attrs["смак"] || p.attrs["вкус"] || "",     // різні фіди можуть мати "вкус"
      weight: p.attrs["фасування"] || p.attrs["вес"] || "",
      type:   p.attrs["тип"] || "",
      price: p.price,
      available: p.available,
      image: p.image
    });

    if (p.price && (g.minPrice === 0 || p.price < g.minPrice)) g.minPrice = p.price;
    if (p.available) g.anyAvailable = true;
  }

  // сортуємо варіанти: доступні → недоступні
  for (const g of grouped.values()) {
    g.variants.sort((a, b) => Number(b.available) - Number(a.available));
  }

  return Array.from(grouped.values());
}
