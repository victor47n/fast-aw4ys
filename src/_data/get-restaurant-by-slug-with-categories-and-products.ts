import { db } from "@/_lib/prisma";

export const getRestaurantBySlugWithCategoriesAndProducts = async (
  slug: string,
) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  });

  return restaurant;
};
