import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// 🔹 ROUTES
import productsRoute from './src/routes/products.js'
import clientsRoute from './src/routes/clients.js'
import ordersRoute from './src/routes/orders.js'
import supplierRoute from './src/routes/supplier.js'
import metaRoute from './src/routes/meta.js'

// 🔹 DATA LOADER
import { loadSupplierData } from './src/utils/loadXML.js'

dotenv.config()
const app = express()

// 🔹 MIDDLEWARE
app.use(cors())
app.use(express.json())

// 🔹 TEST ROUTE
app.get('/', (req, res) => res.json({ ok: true }))

// 🔹 API ROUTES
app.use('/api/products', productsRoute)
app.use('/api/clients', clientsRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/supplier', supplierRoute)
app.use('/api', metaRoute)

// 🔹 PORT
const port = process.env.PORT || 4000

// 🔹 AUTOLOAD SUPPLIER DATA AND START SERVER
;(async () => {
  try {
    await loadSupplierData()
    app.listen(port, () =>
      console.log(`✅ API listening on http://localhost:${port}`)
    )
  } catch (err) {
    console.error('❌ Помилка при старті сервера:', err.message)
  }
})()
