import axios from 'axios'
import { parseStringPromise } from 'xml2js'
import { db } from '../db/memory.js'

const FEEDS = [
  'https://dsn.com.ua/content/export/5e7d01b1572a22ad5f57652a01780f98.xml',
  'https://dsn.com.ua/content/export/019e038c33d39d4f2d5f519b3e852c06.xml'
]

const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : [])

async function parseFeed(url) {
  const { data: xml } = await axios.get(url, { responseType: 'text' })
  const parsed = await parseStringPromise(xml, { explicitArray: false })
  return asArray(parsed?.yml_catalog?.shop?.offers?.offer)
}

export async function loadSupplierData() {
  console.log('📦 Завантаження товарів з DSN...')
  const all = []

  for (const url of FEEDS) {
    try {
      const offers = await parseFeed(url)
      console.log(`✅ Отримано ${offers.length} позицій з ${url}`)
      for (const o of offers) {
        const pictures = asArray(o.picture)
        const params = asArray(o.param)
        const attrs = {}
        for (const p of params) {
          const name = p?.$?.name || ''
          if (name) attrs[name.toLowerCase()] = p._ || ''
        }

        all.push({
  vendorCode: (o.vendorCode || o.$?.id || '').trim(),
  title: (o.name || '').trim(),
  brand: (o.vendor || '').trim(),
  price: Number(o.price) || 0,
  categoryId: o.categoryId ? String(o.categoryId) : '',
  categoryName: (o.category || '').trim(), // ✅ додаємо назву категорії
  available: String(o.$?.available || '').toLowerCase() === 'true',
  image: pictures[0] || '',
  images: pictures,
  description: (o.description || '').trim(),
  attrs
})
      }
    } catch (e) {
      console.error(`❌ Помилка завантаження ${url}:`, e.message)
    }
  }

  db.products = all
  console.log(`🟢 Всього у пам'яті товарів: ${db.products.length}`)
}
