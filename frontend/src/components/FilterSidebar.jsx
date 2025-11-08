export default function FilterSidebar({ filters, setFilters, categories, brands }) {
  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="font-semibold text-gray-700 mb-4 text-lg">Фільтри</h2>

      {/* Категорії */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-600 mb-2">Категорія</h3>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={filters.categoryId || ""}
          onChange={(e) => handleChange("categoryId", e.target.value)}
        >
          <option value="">Всі</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Бренди */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-600 mb-2">Бренд</h3>
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={filters.brand || ""}
          onChange={(e) => handleChange("brand", e.target.value)}
        >
          <option value="">Всі</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Наявність */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-600 mb-2">Наявність</h3>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={filters.available === true}
            onChange={(e) =>
              handleChange("available", e.target.checked ? true : "")
            }
          />
          Тільки в наявності
        </label>
      </div>

      {/* Очистити */}
      <button
        onClick={() => setFilters({})}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg py-2 mt-4"
      >
        Очистити фільтри
      </button>
    </div>
  );
}
