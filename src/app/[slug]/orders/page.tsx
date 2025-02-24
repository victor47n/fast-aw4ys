import { db } from "@/_lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/_helpers/cpf";
import CpfForm from "./_components/cpf-form";
import OrderList from "./_components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { cpf } = await searchParams;

  if (!cpf) {
    return <CpfForm />;
  }

  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return <OrderList orders={orders} />;
}
