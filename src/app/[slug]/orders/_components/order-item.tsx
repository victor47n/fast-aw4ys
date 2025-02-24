import { OrderStatus, Prisma } from "@prisma/client";
import Image from "next/image";

import { Card, CardContent } from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { formatCurrency } from "@/_utils/formatCurrency";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PENDING") return "Pendente";
  return "";
};

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <Card key={order.id}>
      <CardContent className="space-y-4 p-5">
        <div
          className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${
            order.status === OrderStatus.FINISHED
              ? "bg-green-500 text-white"
              : order.status === OrderStatus.IN_PREPARATION
                ? "bg-yellow-100 text-[#FFB100]"
                : "bg-gray-200 text-gray-500"
          } `}
        >
          {getStatusLabel(order.status)}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <Image
              src={order.restaurant.avatarImageUrl}
              alt={order.restaurant.name}
              className="rounded-sm"
              fill
            />
          </div>
          <p className="text-sm font-semibold">{order.restaurant.name}</p>
        </div>

        <Separator />

        <div className="space-y-2">
          {order.orderProducts.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                {orderProduct.quantity}
              </div>
              <p className="text-sm">{orderProduct.product.name}</p>
            </div>
          ))}
        </div>
        <Separator />
        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
      </CardContent>
    </Card>
  );
}
