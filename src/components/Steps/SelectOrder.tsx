import React, { useState } from "react";
import { Product } from "@/types";
import { useModal } from "@/hooks/useModal";
import { useGetProducts } from "@/hooks/useApi";
import { ProductCard } from "@/components/Product/ProductCard";
import { Modal } from "@/components/Modal";
import { ProductOptions } from "@/components/Product/ProductOptions";
import { ShoppingCart } from "@/components/ShoppingCart";

interface Props {
  enableNextButton: () => void;
}

export const SelectOrder: React.FC<Props> = ({ enableNextButton }) => {
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
      <div className="flex justify-between px-2">
        <h3 className="text-2xl font-bold">Menu</h3>
        <ShoppingCart />
      </div>
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
            enableNextButton={enableNextButton}
          />
        ) : null}
      </Modal>
    </>
  ) : (
    <p>Something failed</p>
  );
};
