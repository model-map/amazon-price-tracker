import { PrismaClient } from "@/generated/prisma";

interface IProduct {
  url: string;
  asin: string;
  price: number;
  title: string;
  img: string;
  reviews_count: number;
  rating: number;
}

const prisma = new PrismaClient();

export async function getPrismaDataById(productID: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { asin: productID },
    });
    return product;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

export async function getPrismaData() {
  const allProducts = await prisma.product.findMany();
  console.log("[in /lib/prismaActions.ts] ALL PRODUCTS: ", allProducts);
}

export async function setPrismaData(product: IProduct) {
  await prisma.product.create({
    data: product,
  });

  const allProducts = await getPrismaData();
  console.dir(allProducts, { depth: null });
}
