import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderTop from "./components/HeaderTop";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";


export default function App() {
  return (
    <BrowserRouter>
      {/* Верхня смуга + основний хедер */}
      <div className="bg-white">
        <HeaderTop />
        <Header />
      </div>

      {/* Єдиний контейнер */}
      <main className="max-w-[1250px] mx-auto px-3 md:px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
