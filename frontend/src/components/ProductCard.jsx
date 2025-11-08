export default function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* бейдж */}
      {product.available ? (
        <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
          В наявності
        </span>
      ) : (
        <span className="absolute top-3 left-3 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
          Немає
        </span>
      )}

      {/* зображення */}
      <div className="flex justify-center items-center h-48 bg-gray-50 overflow-hidden">
        <img
          src={product.image || "/no-image.png"}
          alt={product.title}
          className="object-contain h-full w-auto group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* контент */}
      <div className="flex flex-col flex-1 p-4 text-center">
        <h3
          className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
          title={product.title}
        >
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>

        <div className="mt-auto">
          <p className="text-lg font-bold text-blue-600 mb-3">
            {product.price ? `${product.price.toFixed(2)} ₴` : "—"}
          </p>

          <button
            disabled={!product.available}
            className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all ${
              product.available
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {product.available ? "Додати в кошик" : "Немає в наявності"}
          </button>
        </div>
      </div>
    </div>
  );
}
