import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const __dirname = path.resolve();
const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// 🇺🇦 Використовуємо українські версії фідів
const FEED_ALL = "https://dsn.com.ua/content/export/5e7d01b1572a22ad5f57652a01780f98.xml"; // усі товари
const FEED_AVAILABLE = "https://dsn.com.ua/content/export/019e038c33d39d4f2d5f519b3e852c06.xml"; // лише в наявності

const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

async function parseFeed(url) {
  try {
    const { data: xml } = await axios.get(url, { responseType: "text", timeout: 20000 });
    const parsed = await parseStringPromise(xml, { explicitArray: false });
    return parsed?.yml_catalog?.shop || {};
  } catch (err) {
    console.error("❌ Помилка завантаження:", url, err.message);
    return null;
  }
}

async function loadSupplierData() {
  console.log("📦 Завантаження двох фідів...");
  const [shopAll, shopAvail] = await Promise.all([parseFeed(FEED_ALL), parseFeed(FEED_AVAILABLE)]);

  if (!shopAll) {
    console.warn("⚠️ Не вдалося завантажити основний фід!");
    return;
  }

  const offersAll = asArray(shopAll.offers?.offer);
  const offersAvail = asArray(shopAvail?.offers?.offer);

  // 🧠 Формуємо список штрихкодів із наявних
  const availableBarcodes = new Set();
  for (const o of offersAvail) {
    const params = asArray(o.param);
    for (const p of params) {
      if (p?.$?.name?.toLowerCase() === "штрихкод" && p._) {
        availableBarcodes.add(p._.trim());
      }
    }
  }

  // === Категорії ===
  const categoriesArr = asArray(shopAll.categories?.category);
  const categories = categoriesArr.map((c) => ({
    id: String(c.$.id),
    name: (c._ || "").trim(),
    parentId: c.$?.parentId ? String(c.$.parentId) : null,
  }));

  // === Продукти ===
  const products = offersAll.map((o) => {
    const pictures = asArray(o.picture);
    const params = asArray(o.param);
    const attrs = {};

    for (const p of params) {
      const name = p?.$?.name?.toLowerCase() || "";
      const value = (p._ || "").trim();
      if (name) attrs[name] = value;
    }

    const barcode = attrs["штрихкод"] || "";
    const available = availableBarcodes.has(barcode);

    return {
      id: o.$?.id || "",
      vendorCode: o.vendorCode || "",
      title: o.name_ua || o.name || "",
      brand: o.vendor || "",
      price: Number(o.price) || 0,
      categoryId: String(o.categoryId || ""),
      categoryName: o.category || "",
      available,
      image: pictures[0] || "",
      images: pictures,
      description: o.description_ua || o.description || "",
      barcode,
      attrs,
      url: o.url || "",
    };
  });

  // 💾 Зберігаємо кеш
  fs.writeFileSync(path.join(DATA_DIR, "products.json"), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "categories.json"), JSON.stringify(categories, null, 2));

  const total = products.length;
  const availCount = products.filter((p) => p.available).length;
  console.log(`✅ Завантажено ${total} товарів`);
  console.log(`🟢 В наявності: ${availCount}`);
  console.log(`🔴 Відсутні: ${total - availCount}`);

  return { products, categories };
}

// ==================== КЕШ ====================
let db = { products: [], categories: [], brands: [] };

function loadCache() {
  try {
    const p = path.join(DATA_DIR, "products.json");
    const c = path.join(DATA_DIR, "categories.json");
    if (fs.existsSync(p)) db.products = JSON.parse(fs.readFileSync(p));
    if (fs.existsSync(c)) db.categories = JSON.parse(fs.readFileSync(c));
    db.brands = [...new Set(db.products.map((p) => p.brand).filter(Boolean))];
    console.log(`💾 Завантажено кеш (${db.products.length} товарів)`);
  } catch (err) {
    console.error("❌ Помилка кешу:", err.message);
  }
}

// ==================== API ====================
app.get("/api/products", (req, res) => {
  let { page = 1, limit = 20, categoryId, brand, available } = req.query;
  page = Number(page);
  limit = Number(limit);

  let filtered = [...db.products];
  if (categoryId) filtered = filtered.filter((p) => p.categoryId === categoryId);
  if (brand) filtered = filtered.filter((p) => p.brand === brand);
  if (available === "true") filtered = filtered.filter((p) => p.available);

  filtered.sort((a, b) => Number(b.available) - Number(a.available));

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  res.json({ total, page, limit, items: filtered.slice(start, end) });
});

// ✅ Отримати один товар по ID
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = db.products.find((p) => String(p.id) === String(id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.get("/api/categories", (req, res) => res.json(db.categories));
app.get("/api/brands", (req, res) => res.json(db.brands));

app.get("/api/reload", async (req, res) => {
  const data = await loadSupplierData();
  if (data) {
    db = { ...data, brands: [...new Set(data.products.map((p) => p.brand).filter(Boolean))] };
    res.json({ ok: true, total: db.products.length });
  } else res.status(500).json({ ok: false });
});

// ==================== СТАРТ ====================
(async () => {
  loadCache();
  if (!db.products.length) {
    console.log("⏳ Кеш порожній — завантажую з DSN...");
    const data = await loadSupplierData();
    if (data)
      db = { ...data, brands: [...new Set(data.products.map((p) => p.brand).filter(Boolean))] };
  }
  app.listen(PORT, () => console.log(`✅ API listening on http://localhost:${PORT}`));
})();
