"use client";

import type { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/_components/ui/button";
import { ScrollArea } from "@/_components/ui/scroll-area";
import { formatCurrency } from "@/_utils/formatCurrency";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
      <div className="mt-5 flex-auto overflow-hidden">
        {/* RESTAURANT */}
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>

        {/* PRODUCT NAME */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* PRICE AND QUANTITY */}
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>

          <div className="flex items-center gap-3 text-center">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantityClick}
              disabled={quantity === 1}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* DESCRIPTION AND INGREDIENTS */}
        <ScrollArea className="h-full">
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1.5">
              <ChefHatIcon size={18} />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="text-muted-fo list-disc px-5 text-sm text-muted-foreground">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>

      <Button className="mt-6 w-full rounded-full">Adicionar a sacola</Button>
    </div>
  );
}
