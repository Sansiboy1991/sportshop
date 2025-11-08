export default function FilterSidebar({ categories = [], brands = [], onFilterChange }) {
  return (
    <aside className="hidden lg:block w-64 h-screen overflow-y-auto bg-white border-r border-gray-200 shadow-sm p-4">
      <div>
        <h3 className="text-gray-800 font-semibold border-b pb-2 mb-3">Категорії</h3>
        <ul className="space-y-1">
          {categories.map((c) => (
            <li
              key={c.id}
              onClick={() => onFilterChange({ categoryId: c.id })}
              className="px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-gray-800 font-semibold border-b pb-2 mb-3">Бренди</h3>
        <ul className="space-y-1">
          {brands.map((b) => (
            <li
              key={b}
              onClick={() => onFilterChange({ brand: b })}
              className="px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center space-x-2">
        <input
          id="available"
          type="checkbox"
          onChange={(e) => onFilterChange({ available: e.target.checked })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="available" className="text-sm text-gray-700">
          Лише в наявності
        </label>
      </div>
    </aside>
  );
}
