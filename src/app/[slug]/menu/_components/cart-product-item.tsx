import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/_components/ui/button"
import { formatCurrency } from "@/_utils/formatCurrency"

import type { CartProduct } from "../_contexts/cart"


interface CartItemProps {
  product: CartProduct
}

export default function CartProductItem({ product }: CartItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
        <Image src={product.imageUrl} alt={product.name} fill />
        </div>

        <div className="space-y-1">
          <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
          <div className="flex items-center gap-1 text-center">
            <Button className="w-7 h-7 rounded-lg" variant="outline">
              <ChevronLeftIcon />
            </Button>
            <p className="text-xs w-7">{product.quantity}</p>
            <Button className="w-7 h-7 rounded-lg" variant="destructive">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <Button className="h-7 w-7 rounded-lg" variant="outline">
        <TrashIcon />
      </Button>
    </div>
  )
}