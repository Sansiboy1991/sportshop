import React from "react";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 py-8 mt-10">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} SportShop. Усі права захищено.
        </p>
        <div className="flex gap-5 text-sm">
          <a href="#" className="hover:text-white transition">Умови</a>
          <a href="#" className="hover:text-white transition">Конфіденційність</a>
          <a href="#" className="hover:text-white transition">Контакти</a>
        </div>
      </Container>
    </footer>
  );
}
