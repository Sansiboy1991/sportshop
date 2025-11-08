import { Router } from 'express'
import { db } from '../db/memory.js'

const r = Router()

// 🔹 /api/categories — список категорій
r.get('/categories', (req, res) => {
  const cats = (db.categories || []).map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug
  }))
  res.json({ ok: true, total: cats.length, items: cats })
})

// 🔹 /api/brands — унікальні бренди для фільтрів
r.get('/brands', (req, res) => {
  const brands = Array.from(
    new Set(db.products.map(p => p.brand).filter(Boolean))
  ).sort()
  res.json({ ok: true, total: brands.length, items: brands })
})

// 🔹 /api/products/:id — повна картка товару
r.get('/product/:id', (req, res) => {
  const id = req.params.id
  const item = db.products.find(p => p.vendorCode === id)
  if (!item) return res.status(404).json({ ok: false, message: 'Товар не знайдено' })
  res.json({ ok: true, item })
})

export default r
