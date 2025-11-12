import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:4000/api/products?limit=4");
        const data = await res.json();
        setProducts(data.items || []);
      } catch (err) {
        console.error("Помилка завантаження товарів:", err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="max-w-[1280px] mx-auto px-4 py-10 bg-[var(--color-bg-page)]">
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 text-center">
        Популярні товари
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Завантаження...</p>
      )}
    </section>
  );
}
