import type { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";

import { getRestaurantBySlugWithCategoriesAndProducts } from "@/_data/get-restaurant-by-slug-with-categories-and-products";

import RestaurantCategories from "./_components/categories";
import RestaurantHeader from "./_components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethod = (value: string): value is ConsumptionMethod => {
  return ["DINE_IN", "TAKEAWAY"].includes(value.toUpperCase());
};

export default async function RestaurantMenuPage({
  params,
  searchParams,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethod(consumptionMethod)) return notFound();

  const restaurant = await getRestaurantBySlugWithCategoriesAndProducts(slug);

  if (!restaurant) return notFound();

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
