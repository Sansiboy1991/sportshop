const API_URL = "http://localhost:4000/api";

export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/products?${params}`);
  if (!res.ok) throw new Error("Помилка завантаження товарів");
  return await res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Помилка завантаження категорій");
  return await res.json();
}

export async function fetchBrands() {
  const res = await fetch(`${API_URL}/brands`);
  if (!res.ok) throw new Error("Помилка завантаження брендів");
  return await res.json();
}
