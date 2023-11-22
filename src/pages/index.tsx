import { Card } from "@/components/Card";
import { Modal } from "@/components/Modal";
import { ProductOptions } from "@/components/Product/ProductOptions";
import { useModal } from "@/hooks/useModal";
import React, { useState } from "react";

const data = [
  {
    id: 1,
    image: "/hamburger.jpg",
    title: "Hamburger",
    details: "$80.00",
    buttonLabel: "Add",
  },
  {
    id: 2,
    image: "/hamburger.jpg",
    title: "Hot dog",
    details: "$35.00",
    buttonLabel: "Add",
  },
  {
    id: 3,
    image: "/hamburger.jpg",
    title: "Nachos",
    details: "$60.00",
    buttonLabel: "Add",
  },
  {
    id: 4,
    image: "/hamburger.jpg",
    title: "Burritos",
    details: "$20.00",
    buttonLabel: "Add",
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { isOpen, closeModal, openModal } = useModal();

  const handleOpen = (id: number) => {
    setSelectedId(id);
    openModal();
  };

  const handleClose = () => {
    setSelectedId(null);
    closeModal();
  };

  return (
    <main>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {data.map(({ id, title, buttonLabel, details, image }) => (
          <Card
            key={id}
            image={image}
            title={title}
            details={details}
            buttonLabel={buttonLabel}
            onClick={() => handleOpen(id)}
          />
        ))}
        {data.map(({ id, title, buttonLabel, details, image }) => (
          <Card
            key={id}
            image={image}
            title={title}
            details={details}
            buttonLabel={buttonLabel}
            onClick={() => handleOpen(id)}
          />
        ))}
      </section>
      <Modal onClose={handleClose} title="Order" modalOpen={isOpen}>
        {selectedId ? <ProductOptions data={data[selectedId - 1]} /> : null}
      </Modal>
    </main>
  );
}
