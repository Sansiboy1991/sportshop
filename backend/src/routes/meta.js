import express from 'express'
import { getCategories, getBrands } from '../utils/loadXML.js'

const router = express.Router()

router.get('/categories', (_req, res) => {
  res.json(getCategories())
})

router.get('/brands', (_req, res) => {
  res.json(getBrands())
})

export default router
