"use client";

import type { Product } from "@prisma/client";
import { createContext, type ReactNode, useState } from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {}
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addProduct = (product: CartProduct) => {
    const productIndex = products.findIndex((p) => p.id === product.id);
    if (productIndex === -1) {
      setProducts((prev) => [...prev, { ...product, quantity: product.quantity }]);
    } else {
      setProducts((prev) => {
        return prev.map((p, index) =>
          index === productIndex
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
