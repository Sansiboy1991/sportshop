import HeroMenu from "../components/HeroMenu"; // ✅ новий імпорт
import ProductSection from "../components/ProductSection";

export default function HomePage() {
  return (
    <main className="w-full bg-[#f8f9fb]">
      {/* 🔹 Герой-секція */}
      <HeroMenu />

     

      {/* 🔹 Популярні товари */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#ffffff] py-10 border-t border-gray-200">
        <div className="w-full px-6 md:px-10 max-w-[1600px] mx-auto">
          <ProductSection />
        </div>
      </section>
    </main>
  );
}
