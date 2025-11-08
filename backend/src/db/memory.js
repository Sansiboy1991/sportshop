import { v4 as uuid } from 'uuid'


export function addClient({ name, phone, email }) {
  const c = { id: uuid(), name, phone, email }
  db.clients.push(c)
  return c
}

export function addOrder({ clientId, items, total }) {
  const o = { id: uuid(), clientId, items, total, status: 'new', createdAt: Date.now() }
  db.orders.push(o)
  return o
}
export const db = {
  products: [
    // ...твої демо-товари можна лишити
  ],
  clients: [],
  orders: [],
  categories: [] // ⬅️ додали
}
