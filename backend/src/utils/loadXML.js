import axios from "axios";
import { parseStringPromise } from "xml2js";
import fs from "fs";
import { db } from "../db/memory.js";

// 🇺🇦 XML-фіди DSN
const FEED_ALL = "https://dsn.com.ua/content/export/5e7d01b1572a22ad5f57652a01780f98.xml"; // усі товари
const FEED_AVAILABLE = "https://dsn.com.ua/content/export/019e038c33d39d4f2d5f519b3e852c06.xml"; // лише в наявності

// Перетворює значення в масив
const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

// Парсимо XML
async function parseFeed(url) {
  try {
    const { data: xml } = await axios.get(url, { responseType: "text", timeout: 15000 });
    const parsed = await parseStringPromise(xml, { explicitArray: false });
    return parsed?.yml_catalog?.shop || {};
  } catch (err) {
    console.error("❌ Не вдалося завантажити XML:", url, err.message);
    return null;
  }
}

// 🧠 Головна функція
export async function loadSupplierData() {
  console.log("📦 Завантаження товарів з DSN (2 вигрузки)...");

  const [shopAll, shopAvail] = await Promise.all([parseFeed(FEED_ALL), parseFeed(FEED_AVAILABLE)]);
  if (!shopAll) {
    console.warn("⚠️ Не вдалося завантажити основну вигрузку");
    return db.products;
  }

  // === Категорії ===
  const categoriesArr = asArray(shopAll.categories?.category);
  db.categories = categoriesArr.map((c) => ({
    id: String(c.$.id),
    name: (c._ || "").trim(),
    parentId: c.$?.parentId ? String(c.$.parentId) : null,
  }));

  // === Продукти ===
  const offersAll = asArray(shopAll.offers?.offer);
  const offersAvail = new Set(asArray(shopAvail?.offers?.offer).map((o) => o.$?.id?.trim()));

  db.products = offersAll.map((o) => {
    const pictures = asArray(o.picture);
    const params = asArray(o.param);
    const attrs = {};

    for (const p of params) {
      const name = p?.$?.name?.toLowerCase() || "";
      const value = (p._ || "").trim();
      if (name) attrs[name] = value;
    }

    const flavor = attrs["смак"] || attrs["вкус"] || attrs["аромат"] || "";
    const weight = attrs["фасування"] || attrs["вес"] || attrs["упаковка"] || "";
    const type = attrs["тип"] || "";

    const id = (o.$?.id || "").trim();
    const available = offersAvail.has(id); // ✅ перевірка по другій вигрузці
    const price = Number(o.price) || 0;

    return {
      id,
      vendorCode: (o.vendorCode || id).trim(),
      title: (o.name_ua || o.name || "").trim(),
      brand: (o.vendor || "").trim(),
      price,
      categoryId: o.categoryId ? String(o.categoryId) : "",
      categoryName: (o.category || "").trim(),
      available,
      quantity: available ? 1 : 0,
      image: pictures[0] || "",
      images: pictures,
      description: (o.description_ua || o.description || "").trim(),
      attrs,
      flavor,
      weight,
      type,
      url: o.url || "",
    };
  });

  // 🔢 Лог
  const total = db.products.length;
  const availableCount = db.products.filter((p) => p.available).length;

  console.log(`✅ Завантажено ${total} товарів`);
  console.log(`🟢 В наявності: ${availableCount}`);
  console.log(`🔴 Відсутні: ${total - availableCount}`);

  // 🧾 Зберігаємо у файли
  if (!fs.existsSync("./data")) fs.mkdirSync("./data");
  fs.writeFileSync("./data/products.json", JSON.stringify(db.products, null, 2));
  fs.writeFileSync("./data/categories.json", JSON.stringify(db.categories, null, 2));

  return db.products;
}
