import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function loadProducts(page = 1) {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/products?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setProducts(data.items || []);
      setTotal(data.total || 0);
      setPage(page);
    } catch (err) {
      console.error("Помилка завантаження:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🛒 Товари ({total})</h1>

      {loading && <p>Завантаження...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* ====== ПАГІНАЦІЯ ====== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          gap: "10px",
        }}
      >
        <button
          onClick={() => loadProducts(page - 1)}
          disabled={page <= 1}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            background: page <= 1 ? "#ccc" : "#007bff",
            color: "#fff",
            cursor: page <= 1 ? "not-allowed" : "pointer",
          }}
        >
          ⬅️ Назад
        </button>

        <span>
          Сторінка {page} із {totalPages}
        </span>

        <button
          onClick={() => loadProducts(page + 1)}
          disabled={page >= totalPages}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            background: page >= totalPages ? "#ccc" : "#007bff",
            color: "#fff",
            cursor: page >= totalPages ? "not-allowed" : "pointer",
          }}
        >
          Вперед ➡️
        </button>
      </div>
    </div>
  );
}
