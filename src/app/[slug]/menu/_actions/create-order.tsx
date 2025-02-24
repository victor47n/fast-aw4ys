"use server";

import type { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/_lib/prisma";

import { removeCpfPunctuation } from "../_helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCPF: string;
  products: {
    id: string;
    quantity: number;
  }[];
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export default async function createOrder(input: CreateOrderInput) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) throw new Error("Restaurant not found");

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCPF),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
      status: "PENDING",
      total: productsWithPricesAndQuantities.reduce((acc, product) => {
        const productPrice = product.price * product.quantity;
        return acc + productPrice;
      }, 0),
    },
  });

  redirect(
    `/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCPF)}`,
  );
}
