import { Router } from "express"
import axios from "axios"
import { parseStringPromise } from "xml2js"
import { db } from "../db/memory.js"

const r = Router()
const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : [])

// ключові слова, які вважаємо КАТЕГОРІЯМИ
const categoryKeywords = [
  "протеїн", "bcaa", "аміно", "гейнер", "креатин", "вітамін",
  "жироспалювач", "колаген", "ашваганда", "омега", "zma",
  "бета", "глютамін", "предтрен", "мелатонін", "цинк",
  "магній", "селен", "вітаміни", "трави", "адаптогени"
]

// сміттєві назви, які ігноруємо
const skipWords = ["🔥", "бренд", "бренди", "розпродаж", "sale", "акція", "осінній"]

r.post("/import", async (req, res) => {
  const { url } = req.body || {}
  if (!url) return res.status(400).json({ message: "Не вказано URL" })

  try {
    const { data: xml } = await axios.get(url, { responseType: "text" })
    const parsed = await parseStringPromise(xml, { explicitArray: false })
    const shop = parsed?.yml_catalog?.shop
    const rawCats = asArray(shop?.categories?.category)
    const rawOffers = asArray(shop?.offers?.offer)

    // === 1. Категорії ===
    db.categories = rawCats
      .map((c) => ({
        id: String(c.$?.id || ""),
        name: (c._ || "").trim(),
        slug: (c._ || "")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-zа-я0-9\-]/gi, ""),
      }))
      .filter(
        (c) =>
          c.name &&
          !skipWords.some((w) => c.name.toLowerCase().includes(w)) &&
          categoryKeywords.some((k) => c.name.toLowerCase().includes(k))
      )

    // === 2. Товари + бренди ===
    const brandSet = new Set()
    db.products = []

    for (const o of rawOffers) {
      const id = (o.vendorCode || o.$?.id || "").trim()
      if (!id) continue
      const available = String(o.$?.available || "").toLowerCase() === "true"
      const price = Number(o.price) || 0
      const title = (o.name || "").trim()
      const brand = (o.vendor || "").trim()
      const description = (o.description || "").trim()
      const categoryId = o.categoryId ? String(o.categoryId) : null
      const pictures = asArray(o.picture)
      const params = asArray(o.param)
      const attrs = {}

      for (const p of params) {
        const name = p.$?.name || ""
        attrs[name.toLowerCase()] = p._ || ""
      }

      if (brand && brand.length > 1) brandSet.add(brand)

      db.products.push({
        vendorCode: id,
        title,
        brand,
        price,
        available,
        categoryId,
        image: pictures[0] || "",
        images: pictures,
        description,
        attrs,
      })
    }

    // === 3. Унікальні бренди ===
    db.brands = Array.from(brandSet)
      .filter((b) => b.length > 1 && !skipWords.some((s) => b.toLowerCase().includes(s)))
      .sort()
      .map((name) => ({ name }))

    res.json({
      ok: true,
      message: "Імпорт завершено",
      categories: db.categories.length,
      brands: db.brands.length,
      products: db.products.length,
    })
  } catch (e) {
    res.status(500).json({ message: "Помилка імпорту", error: String(e?.message || e) })
  }
})

export default r
