import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Truck,
  CreditCard,
  RefreshCw,
  Gift,
  ShoppingCart,
  Heart,
  CheckCircle,
} from "lucide-react";
import Container from "../components/Container";
import FullWidthSection from "../components/FullWidthSection";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setMainImage(data.image);
        fetchRelated(data.categoryId);
      } catch (err) {
        console.error("❌ Помилка:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRelated(categoryId) {
      try {
        const res = await fetch(
          `http://localhost:4000/api/products?categoryId=${categoryId}&limit=4`
        );
        const data = await res.json();
        setRelated(data.items || []);
      } catch {
        setRelated([]);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[400px] text-gray-500">
        Завантаження...
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-[400px] text-red-500">
        Товар не знайдено 😢
      </div>
    );

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-10">
      {/* ==== Основна інформація ==== */}
      <Container>
        <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Галерея */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-[#fafafa] border border-[#eee] shadow-sm flex items-center justify-center h-[420px]">
              <img
                src={mainImage}
                alt={product.title}
                className="max-h-[380px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Мініатюри */}
            {product.images?.length > 1 && (
              <div className="flex gap-4 mt-5 justify-center">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    onClick={() => setMainImage(img)}
                    className={`w-[80px] h-[80px] object-cover rounded-xl cursor-pointer border transition-all duration-200 ${
                      mainImage === img
                        ? "border-[#4e88ca] ring-2 ring-[#4e88ca]"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Інформація */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-[#222] mb-2 leading-tight">
                {product.title}
              </h1>
              <p className="text-[#666] mb-6 text-[15px]">{product.brand}</p>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#4e88ca]">
                  {product.price} грн
                </span>
                {product.available && (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4e88ca] to-[#3a6ea5] text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.03]">
                  <ShoppingCart size={20} /> Купити
                </button>
                <button className="px-8 py-3 rounded-xl font-semibold text-[#4e88ca] border border-[#4e88ca] hover:bg-[#eef5ff] hover:shadow-md transition-all duration-200">
                  ⚡ В 1 клік
                </button>
                <button className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:text-[#4e88ca] hover:shadow-md transition">
                  <Heart size={20} />
                </button>
              </div>

              {/* Характеристики */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-3 text-[#333]">
                  Характеристики
                </h3>
                <div className="grid grid-cols-2 gap-y-2 text-[15px]">
                  {Object.entries(product.attrs || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between pr-3">
                      <span className="text-gray-500 capitalize">{key}</span>
                      <span className="text-gray-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ==== Доставка та оплата ==== */}
      <FullWidthSection className="mt-10">
        <Container>
          <div className="bg-white rounded-[20px] shadow-[0_8px_25px_rgba(0,0,0,0.05)] p-10">
            <h2 className="text-2xl font-semibold mb-6 text-[#222]">
              Доставка та оплата
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-[#333] text-[15px]">
              <div className="flex flex-col items-center text-center">
                <Truck size={36} className="text-[#4e88ca] mb-3" />
                <p>Доставка <b>Нова пошта / Укрпошта</b> — 1-2 дні по Україні</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CreditCard size={36} className="text-[#4e88ca] mb-3" />
                <p>Оплата карткою, при отриманні або онлайн без комісії</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw size={36} className="text-[#4e88ca] mb-3" />
                <p>Повернення/обмін протягом 14 днів після покупки</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Gift size={36} className="text-[#4e88ca] mb-3" />
                <p>Бонус -5% при повторному замовленні</p>
              </div>
            </div>
          </div>
        </Container>
      </FullWidthSection>

      {/* ==== Опис ==== */}
      <FullWidthSection className="mt-10">
        <Container>
          <div className="bg-white rounded-[20px] shadow-[0_8px_25px_rgba(0,0,0,0.05)] p-10">
            <h2 className="text-2xl font-semibold mb-5 text-[#222]">Опис</h2>
            <div
              className="prose max-w-none text-[#333] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </Container>
      </FullWidthSection>

      {/* ==== Схожі товари ==== */}
      {related.length > 0 && (
        <FullWidthSection className="mt-10">
          <Container>
            <h2 className="text-2xl font-semibold mb-6 text-[#222]">
              Схожі товари
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[200px] object-contain mb-3 rounded-lg"
                  />
                  <h3 className="text-[15px] font-medium text-[#333] line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[#4e88ca] font-semibold mt-1">
                    {item.price} грн
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </FullWidthSection>
      )}
    </div>
  );
}
