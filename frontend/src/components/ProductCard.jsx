import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block transition hover:scale-[1.02] hover:shadow-lg"
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        opacity: product.available ? 1 : 0.6,
        position: "relative",
        background: "var(--color-bg-block)",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <h3
        style={{
          fontSize: "16px",
          marginTop: "10px",
          color: "var(--color-text)",
        }}
      >
        {product.title}
      </h3>
      <p style={{ color: "#555", fontSize: "14px" }}>{product.brand}</p>
      <p style={{ fontWeight: "bold", color: "var(--color-accent)" }}>
        {product.price} грн
      </p>

      {!product.available && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "0",
            right: "0",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "4px 0",
            fontSize: "13px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          ❌ Немає в наявності
        </div>
      )}
    </Link>
  );
}
