import React, { useState } from "react";
import MegaMenuMain from "../components/MegaMenuMain";
import MegaMenuModal from "../components/MegaMenuModal";
import ProductSection from "../components/ProductSection";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pt-[10px]">
      <MegaMenuMain onOpen={() => setModalOpen(true)} />
      <MegaMenuModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <ProductSection />
      

    </div>
  );
}
