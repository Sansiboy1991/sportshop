import { useEffect, useState } from 'react'
import { fetchCategories, fetchBrands } from '../api'

export default function FilterSidebar({ filters, setFilters }) {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  // завантаження фільтрів
  useEffect(() => {
    async function loadData() {
      try {
        const catRes = await fetchCategories()
        const brandRes = await fetchBrands()

        const cats = catRes.items || catRes.categories || []
        const brs =
          Array.isArray(brandRes.items)
            ? brandRes.items.map(name => ({ name }))
            : brandRes.brands?.map(name => ({ name })) || []

        setCategories(cats)
        setBrands(brs)
      } catch (err) {
        console.error('Помилка завантаження фільтрів:', err)
      }
    }
    loadData()
  }, [])

  // зміна чекбоксів
  const toggleFilterValue = (key, value) => {
    setFilters(prev => {
      const arr = prev[key] || []
      const exists = arr.includes(value)
      return {
        ...prev,
        [key]: exists ? arr.filter(v => v !== value) : [...arr, value]
      }
    })
  }

  // чекбокс для наявності
  const toggleAvailable = () => {
    setFilters(prev => ({ ...prev, available: !prev.available }))
  }

  return (
<aside className="bg-surface p-5 rounded-xl border border-[#3C3C2E] w-64 h-fit sticky top-4 flex flex-col gap-5">
      <h2 className="text-accent text-lg mb-3 font-semibold">Фільтри</h2>

      {/* Категорії */}
<div className="mb-5">
  <label className="block text-sm mb-2 font-medium">Категорія</label>
  <select
    className="w-full bg-background border border-[#3C3C2E] p-2 rounded-md focus:outline-none focus:border-accent"
    value={filters.categoryId || ""}
    onChange={(e) =>
      setFilters((prev) => ({ ...prev, categoryId: e.target.value }))
    }
  >
    <option value="">Всі категорії</option>
    {categories.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>


      {/* Бренди */}
      <div className="mb-5">
        <label className="block text-sm mb-2">Бренди</label>
        <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
          {brands.map((b, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm cursor-pointer hover:text-accent"
            >
              <input
                type="checkbox"
                checked={filters.brand?.includes(b.name) || false}
                onChange={() => toggleFilterValue('brand', b.name)}
                className="accent-accent"
              />
              {b.name}
            </label>
          ))}
        </div>
      </div>

      {/* Наявність */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.available || false}
          onChange={toggleAvailable}
          className="accent-accent w-4 h-4"
        />
        <span className="text-sm">Є в наявності</span>
      </div>
    </aside>
  )
}
