import React, { useState } from "react";
import { useGetProducts } from "@/hooks/useApi";
import { ProductCard } from "@/components/Product/ProductCard";
import { Modal } from "@/components/Modal";
import { useModal } from "@/hooks/useModal";
import { Product } from "@/types";
import { ProductOptions } from "@/components/Product/ProductOptions";

export const SelectOrder: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const { data, isLoading, error } = useGetProducts();

  const handleOpen = (id: string) => {
    setSelectedId(id);
    openModal();
  };

  return isLoading ? (
    <p>Loading</p>
  ) : error ? (
    <p>{error.message}</p>
  ) : data?.data?.length ? (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.data.map(({ id, name, description, price, image }) => (
          <ProductCard
            key={id}
            data={{ name, description, price, image }}
            onClick={() => handleOpen(id)}
          />
        ))}
      </div>
      <Modal
        modalOpen={isOpen}
        onClose={closeModal}
        title="Product details"
        full
        noScroll
      >
        {selectedId ? (
          <ProductOptions
            product={data.data.find(({ id }) => id === selectedId) as Product}
            closeModal={closeModal}
          />
        ) : null}
      </Modal>
    </>
  ) : (
    <p>Something failed</p>
  );
};
