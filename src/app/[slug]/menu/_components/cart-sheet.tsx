import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";

import { CartContext } from "../_contexts/cart";
import CartProductItem from "./cart-product-item";

export default function CartSheet() {
  const { isOpen, toggleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="w-[80%]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <div className="py-5">
          {
            products.map(product => (
              <CartProductItem key={product.id} product={product} />
            ))
          }
          </div>
        </SheetContent>
      </Sheet>
  )
}