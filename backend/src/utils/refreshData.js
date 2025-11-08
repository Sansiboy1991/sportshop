// src/utils/refreshData.js
import fs from "fs";
import { loadSupplierData } from "./loadXML.js";
import { db } from "../db/memory.js";

const DATA_DIR = "./data";
export let lastUpdate = null;

function timeStamp() {
  const now = new Date();
  return now.toLocaleString("uk-UA", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
}

export async function refreshSupplierData() {
  console.log(`\n📦 [${timeStamp()}] Початок оновлення DSN...`);
  const start = Date.now();

  try {
    await loadSupplierData(); // оновлює db.products та db.categories
    const duration = ((Date.now() - start) / 1000).toFixed(2);

    lastUpdate = timeStamp();

    console.log(`✅ [${lastUpdate}] Оновлено ${db.products.length} товарів`);
    console.log(`💾 Кешування...`);

    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
    fs.writeFileSync(`${DATA_DIR}/products.json`, JSON.stringify(db.products, null, 2));
    fs.writeFileSync(`${DATA_DIR}/categories.json`, JSON.stringify(db.categories, null, 2));

    console.log(`💾 Кеш оновлено о ${lastUpdate} (${duration}s)`);
  } catch (err) {
    console.error(`❌ Помилка оновлення: ${err.message}`);

    if (fs.existsSync(`${DATA_DIR}/products.json`)) {
      console.log("⚠️ Використовується кешована версія.");
      db.products = JSON.parse(fs.readFileSync(`${DATA_DIR}/products.json`, "utf8"));
      db.categories = JSON.parse(fs.readFileSync(`${DATA_DIR}/categories.json`, "utf8"));
    } else {
      console.error("🚨 Кеш відсутній!");
    }
  }
}
