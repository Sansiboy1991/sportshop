// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

import { db } from "./src/db/memory.js";
import { loadSupplierData } from "./src/utils/loadXML.js";
import { refreshSupplierData, lastUpdate } from "./src/utils/refreshData.js";
import { buildCategoryTree, groupProducts } from "./src/utils/catalogHelpers.js";
import { categoryMap } from "./src/config/categoryMap.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = "./data";
const port = process.env.PORT || 4000;

// === Завантаження кешу при старті ===
if (fs.existsSync(`${DATA_DIR}/products.json`)) {
  console.log("💾 Завантаження кешу...");
  db.products = JSON.parse(fs.readFileSync(`${DATA_DIR}/products.json`, "utf8"));
  db.categories = JSON.parse(fs.readFileSync(`${DATA_DIR}/categories.json`, "utf8"));
  console.log(`✅ Кеш завантажено (${db.products.length} товарів)`);
}

// === API ===

// Категорії деревом
app.get("/api/categories", (req, res) => {
  const tree = buildCategoryTree(db.categories || []);
  res.json(tree);
});

// Бренди
app.get("/api/brands", (req, res) => {
  const brands = [...new Set((db.products || []).map(p => p.brand))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "uk"));
  res.json(brands);
});

// Товари (груповані у моделі з варіантами, відсутні в кінці)
app.get("/api/products", (req, res) => {
  const {
    categoryId,
    sub,            // id підкатегорії з categoryMap (наприклад, 'protein-casein')
    brand,
    available,      // "true" | "false"
    q,              // пошук
    page = "1",
    limit = "24",
    sort            // "priceAsc" | "priceDesc" | "new"
  } = req.query;

  let items = db.products || [];

  // 1) Прив’язка до категорії (якщо передана)
  if (categoryId) {
    items = items.filter(p => String(p.categoryId) === String(categoryId));
  }

  // 2) Підкатегорія як фільтр (categoryMap)
  if (categoryId && sub && categoryMap[categoryId]?.children?.[sub]?.filter) {
    const { param, value } = categoryMap[categoryId].children[sub].filter;
    const paramKey = String(param).toLowerCase();
    const val = String(value).toLowerCase();
    items = items.filter(p => (p.attrs?.[paramKey] || "").toLowerCase() === val);
  }

  // 3) Бренд
  if (brand) {
    const b = String(brand).toLowerCase();
    items = items.filter(p => (p.brand || "").toLowerCase() === b);
  }

  // 4) Пошук
  if (q) {
    const needle = String(q).toLowerCase();
    items = items.filter(p =>
      p.title.toLowerCase().includes(needle) ||
      (p.description || "").toLowerCase().includes(needle) ||
      (p.brand || "").toLowerCase().includes(needle)
    );
  }

  // 5) Групування в моделі з варіантами
  let grouped = groupProducts(items);

  // 6) Фільтр доступності на рівні моделі
  if (available === "true") {
    grouped = grouped.filter(g => g.anyAvailable);
  } else if (available === "false") {
    grouped = grouped.filter(g => !g.anyAvailable);
  }

  // 7) Доступні вгорі, відсутні внизу
  grouped.sort((a, b) => Number(b.anyAvailable) - Number(a.anyAvailable));

  // 8) Додаткове сортування всередині блоків
  const applySort = (arr) => {
    if (sort === "priceAsc") arr.sort((a, b) => (a.minPrice || 0) - (b.minPrice || 0));
    else if (sort === "priceDesc") arr.sort((a, b) => (b.minPrice || 0) - (a.minPrice || 0));
    else if (sort === "new") {
      // тут можна реалізувати за createdAt, якщо буде
    } else {
      arr.sort((a, b) => a.title.localeCompare(b.title, "uk"));
    }
  };
  const inStock = grouped.filter(g => g.anyAvailable);
  const oos = grouped.filter(g => !g.anyAvailable);
  applySort(inStock);
  applySort(oos);
  grouped = [...inStock, ...oos];

  // 9) Пагінація
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 24);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;

  res.json({
    total: grouped.length,
    page: pageNum,
    limit: limitNum,
    items: grouped.slice(start, end),
  });
});

// Статус оновлення (для фронтенду/адмінки)
app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    products: db.products.length,
    categories: db.categories.length,
    lastUpdate: lastUpdate || "Немає даних (ще не оновлювалось)"
  });
});

// Перевірка
app.get("/", (req, res) => res.json({ ok: true }));

// === Старт сервера ===
(async () => {
  if (!db.products.length) {
    await loadSupplierData();
  }
  app.listen(port, () => console.log(`✅ API listening on http://localhost:${port}`));

  // Автооновлення кожні 6 годин
  setInterval(refreshSupplierData, 1000 * 60 * 60 * 6);
})();
