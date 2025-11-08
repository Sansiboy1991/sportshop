import { Router } from 'express'
import { db, addClient } from '../db/memory.js'
const r = Router()

r.get('/', (_, res) => res.json({ items: db.clients }))
r.post('/', (req, res) => {
  const client = addClient(req.body)
  res.json({ message: 'Клієнт доданий', client })
})

export default r
