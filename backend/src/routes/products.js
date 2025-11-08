import express from 'express'
import { getSupplierProducts } from '../utils/loadXML.js'

const router = express.Router()

router.get('/', (req, res) => {
  const {
    categoryId = '',
    brand = '',
    available = '',
    q = '',
    page = '1',
    limit = '20',
  } = req.query

  const pageNum = Math.max(parseInt(page, 10) || 1, 1)
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100)

  let items = getSupplierProducts()

  if (categoryId) {
    items = items.filter(p => String(p.categoryId) === String(categoryId))
  }
  if (brand) {
    const b = String(brand).trim().toLowerCase()
    items = items.filter(p => (p.brand || '').toLowerCase().includes(b))
  }
  if (available === 'true') items = items.filter(p => p.available === true)
  if (available === 'false') items = items.filter(p => p.available === false)
  if (q) {
    const needle = String(q).trim().toLowerCase()
    items = items.filter(p =>
      (p.title || '').toLowerCase().includes(needle) ||
      (p.description || '').toLowerCase().includes(needle)
    )
  }

  const total = items.length
  const start = (pageNum - 1) * limitNum
  const pageItems = items.slice(start, start + limitNum)

  res.json({ total, page: pageNum, limit: limitNum, items: pageItems })
})

export default router
