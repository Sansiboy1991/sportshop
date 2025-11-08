import { Router } from 'express'
import { db, addOrder, addClient } from '../db/memory.js'
const r = Router()

r.get('/', (_, res) => {
  const items = db.orders.map(o => ({
    ...o,
    client: db.clients.find(c => c.id === o.clientId)
  }))
  res.json({ items })
})

r.post('/', (req, res) => {
  const { name, phone, email, items, total } = req.body
  let client = db.clients.find(c => c.phone === phone)
  if (!client) client = addClient({ name, phone, email })
  const order = addOrder({ clientId: client.id, items, total })
  res.json({ message: 'Замовлення створено', order })
})

export default r
