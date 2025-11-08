export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams(filters)
  const res = await fetch(`http://localhost:4000/api/products?${params}`)
  return await res.json()
}

export async function fetchCategories() {
  const res = await fetch('http://localhost:4000/api/categories')
  return await res.json()
}

export async function fetchBrands() {
  const res = await fetch('http://localhost:4000/api/brands')
  return await res.json()
}
