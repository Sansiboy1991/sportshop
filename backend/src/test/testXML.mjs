import axios from "axios";
import { parseStringPromise } from "xml2js";

const FEED_ALL = "https://dsn.com.ua/content/export/5e7d01b1572a22ad5f57652a01780f98.xml";
const FEED_AVAILABLE = "https://dsn.com.ua/content/export/019e038c33d39d4f2d5f519b3e852c06.xml";

const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

async function load(url) {
  const { data: xml } = await axios.get(url, { responseType: "text", timeout: 20000 });
  const parsed = await parseStringPromise(xml, { explicitArray: false });
  return asArray(parsed?.yml_catalog?.shop?.offers?.offer);
}

(async () => {
  console.log("📦 Завантаження двох вигрузок...");
  const [all, avail] = await Promise.all([load(FEED_ALL), load(FEED_AVAILABLE)]);

  console.log("✅ Усього товарів:", all.length);
  console.log("✅ У наявності (вигрузка):", avail.length);

  // Виведемо перші 5 збігів
  for (let i = 0; i < 5; i++) {
    const o = all[i];
    const params = asArray(o.param);
    const barcode = params.find((p) => p.$?.name === "Штрихкод")?._ || "";
    console.log({
      id: o.$?.id,
      available: o.$?.available,
      quantity_in_stock: o.quantity_in_stock,
      vendor: o.vendor,
      name: o.name_ua || o.name,
      barcode,
    });
  }
})();
