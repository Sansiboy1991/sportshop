export default function ProductCard({ p }) {
  return (
    <div className="bg-surface border border-[#3C3C2E] rounded-xl p-3 flex flex-col items-center hover:shadow-lg hover:shadow-[#9CA37A33] transition-all">
      <img
        src={p.image}
        alt={p.title}
        className="w-40 h-40 object-contain mb-3 rounded-lg bg-[#1F1F15]"
      />
      <h3 className="text-sm font-medium text-text text-center line-clamp-2 mb-2">
        {p.title}
      </h3>
      <p className="text-accent font-semibold text-lg mb-1">
        {p.price} ₴
      </p>
      <p className="text-xs text-gray-400 mb-3 text-center">
        {p.brand || 'Без бренду'}
      </p>
      <button className="w-full bg-accent text-background py-2 rounded-md font-semibold hover:bg-[#b5ba87] transition">
        У кошик
      </button>
    </div>
  )
}
