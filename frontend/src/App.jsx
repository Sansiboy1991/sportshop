import { useEffect, useState } from "react"
import { fetchProducts } from "./api"
import FilterSidebar from "./components/FilterSidebar"
import ProductCard from "./components/ProductCard"

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 20

  useEffect(() => {
    setLoading(true)

    // 🧠 Перетворюємо масиви (для чекбоксів) у рядки перед запитом
    const activeFilters = { ...filters }
    if (Array.isArray(activeFilters.brand)) {
      activeFilters.brand = activeFilters.brand.join(',')
    }
    if (Array.isArray(activeFilters.categoryId)) {
      activeFilters.categoryId = activeFilters.categoryId.join(',')
    }

    fetchProducts({ ...activeFilters, page, limit })
      .then((data) => {
        setProducts(data.items || [])
        setTotal(data.total || 0)
      })
      .finally(() => setLoading(false))
  }, [filters, page])

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="border-b border-surface p-4 text-center text-accent text-3xl font-semibold">
        SPORT<span className="text-text">SHOP</span>
      </header>

      <main className="max-w-7xl mx-auto p-4 flex gap-6">
        <FilterSidebar filters={filters} setFilters={setFilters} />

        <section className="flex-1">
          {loading ? (
            <div className="text-center text-accent mt-10">Завантаження...</div>
          ) : products.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard key={p.vendorCode} p={p} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-10">
              Нічого не знайдено 😕
            </div>
          )}

          {/* Пагінація */}
          {total > limit && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1)
                .slice(0, 5)
                .map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-3 py-1 rounded-md ${
                      page === num
                        ? "bg-accent text-background"
                        : "bg-surface text-text"
                    }`}
                  >
                    {num}
                  </button>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
