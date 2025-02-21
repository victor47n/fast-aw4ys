import { notFound } from "next/navigation";

import { db } from "@/_lib/prisma";

import ProductHeader from "./_components/product-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;

  const product = await db.product.findUnique({ where: { id: productId } });

  if (!product) return notFound();

  return (
    <>
      <ProductHeader product={product} />
    </>
  );
}
