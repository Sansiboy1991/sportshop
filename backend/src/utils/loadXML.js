// src/utils/loadXML.js
import axios from "axios";
import { parseStringPromise } from "xml2js";
import { db } from "../db/memory.js";
import fs from "fs";

const FEED = "https://dsn.com.ua/content/export/02f6f031be3bbbdac0097758e1aa8dc6.xml";
const DATA_DIR = "./data";
const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

async function parseFeed(url) {
  const { data: xml } = await axios.get(url, { responseType: "text" });
  const parsed = await parseStringPromise(xml, { explicitArray: false });
  return parsed?.yml_catalog?.shop || {};
}

export async function loadSupplierData() {
  console.log("📦 Завантаження повної вигрузки DSN...");
  const shop = await parseFeed(FEED);

  // === Категорії ===
  const categoriesArr = asArray(shop?.categories?.category);
  db.categories = categoriesArr.map((c) => ({
    id: String(c.$.id),
    name: (c._ || "").trim(),
    parentId: c.$?.parentId ? String(c.$.parentId) : null,
  }));

  // === Товари ===
  const offers = asArray(shop?.offers?.offer);
  db.products = offers.map((o) => {
    const pictures = asArray(o.picture);
    const params = asArray(o.param);
    const attrs = {};
    for (const p of params) {
      const name = p?.$?.name || "";
      if (name) attrs[name.toLowerCase()] = p._ || "";
    }

    return {
      vendorCode: (o.vendorCode || o.$?.id || "").trim(),
      title: (o.name || "").trim(),
      brand: (o.vendor || "").trim(),
      price: Number(o.price) || 0,
      categoryId: o.categoryId ? String(o.categoryId) : "",
      available: String(o.$?.available || "").toLowerCase() === "true",
      image: pictures[0] || "",
      images: pictures,
      description: (o.description || "").trim(),
      attrs,
    };
  });

  console.log(`🟢 Отримано: ${db.products.length} товарів, ${db.categories.length} категорій`);

  // === Зберігаємо у кеш ===
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  fs.writeFileSync(`${DATA_DIR}/products.json`, JSON.stringify(db.products, null, 2));
  fs.writeFileSync(`${DATA_DIR}/categories.json`, JSON.stringify(db.categories, null, 2));

  console.log("💾 Дані збережено у кеш");
}
