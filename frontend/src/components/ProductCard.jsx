export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        opacity: product.available ? 1 : 0.5,
        position: "relative",
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
      <h3 style={{ fontSize: "16px", marginTop: "10px" }}>{product.title}</h3>
      <p style={{ color: "#555", fontSize: "14px" }}>{product.brand}</p>
      <p style={{ fontWeight: "bold", color: "#007bff" }}>{product.price} грн</p>

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
    </div>
  );
}
