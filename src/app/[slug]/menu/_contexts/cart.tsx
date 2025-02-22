"use client";

import type { Product } from "@prisma/client";
import { createContext, type ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {}
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some((p) => p.id === product.id);

    if (!productIsAlreadyOnTheCart) {
      setProducts((prevProduct) => [...prevProduct, product]);
      return;
    }
    
    setProducts((prevProducts) => {
      return prevProducts.map(prevProduct =>
        prevProduct.id === product.id
          ? { ...prevProduct, quantity: prevProduct.quantity + product.quantity }
          : prevProduct
      );
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map(prevProduct => {
        if(prevProduct.id !== productId) return prevProduct;

        if(prevProduct.quantity === 1) return prevProduct;

        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
    });
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        increaseProductQuantity,
        decreaseProductQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
