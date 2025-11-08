const API_URL = "http://localhost:4000/api";

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/products?${query}`);
  if (!res.ok) throw new Error("HTTP error " + res.status);
  return await res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("HTTP error " + res.status);
  return await res.json();
}

export async function fetchBrands() {
  const res = await fetch(`${API_URL}/brands`);
  if (!res.ok) throw new Error("HTTP error " + res.status);
  return await res.json();
}
