import { Router } from 'express'
import { db } from '../db/memory.js'

const r = Router()

// 🔹 /api/products
r.get('/', (req, res) => {
  // 🔍 ДІАГНОСТИКА ЗАПИТУ
  console.log('===============================')
  console.log('👉 Запит отримано:', req.query)
  console.log('👉 Перші 3 продукти:')
  console.log(
    (db.products || []).slice(0, 3).map(p => ({
      id: p.categoryId,
      title: p.title,
      brand: p.brand
    }))
  )
  console.log('===============================')
  const { 
    categoryId,
    brand,
    available,
    search,
    limit = 20,
    page = 1
  } = req.query
  if (!db.products || db.products.length === 0) {
  console.log('⚠️  db.products порожня! Ймовірно, ще не завантажили XML.')
}
  let items = db.products || []

// --- 🟩 ФІЛЬТР ПО КАТЕГОРІЇ ---
if (categoryId) {
  const cats = categoryId.split(',').map(x => x.trim().toLowerCase())
  items = items.filter(p => {
    const category = String(p.categoryName || p.categoryId || '').toLowerCase()
    return cats.some(cat => category.includes(cat))
  })
}

  // --- 🟩 ФІЛЬТР ПО БРЕНДУ ---
  if (brand) {
    const brands = brand.split(',').map(b => b.trim().toLowerCase())
    items = items.filter(p => brands.includes((p.brand || '').toLowerCase()))
  }

  // --- 🟩 ФІЛЬТР ПО НАЯВНОСТІ ---
  if (available === 'true') {
    items = items.filter(p => p.available)
  }

  // --- 🟩 ПОШУК ПО НАЗВІ АБО БРЕНДУ ---
  if (search) {
    const q = search.toLowerCase()
    items = items.filter(p =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.brand || '').toLowerCase().includes(q)
    )
  }

  // --- 🟩 ПАГІНАЦІЯ ---
  const total = items.length
  const start = (page - 1) * limit
  const end = start + Number(limit)
  const paged = items.slice(start, end)

  // --- 🟩 ФОРМАТ ВІДПОВІДІ ---
  const data = paged.map(p => ({
    vendorCode: p.vendorCode,
    title: p.title,
    brand: p.brand,
    price: p.price,
    image: p.image,
    categoryId: p.categoryId,
    available: p.available,
    flavor: p.attrs?.flavor || '',
    weight: p.attrs?.weight || '',
    description: (p.description || '').substring(0, 250)
  }))

  res.json({
    ok: true,
    total,
    page: Number(page),
    limit: Number(limit),
    pages: Math.ceil(total / limit),
    items: data
  })
})

// 🔹 Експортуємо маршрутизатор
export default r
