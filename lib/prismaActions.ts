import { PrismaClient } from "@/generated/prisma";
import { IProduct } from "./types";
import getSession from "./session";
import { getLogger } from "./logger";

const logger = getLogger();

const prisma = new PrismaClient();

export async function getProductsById(productID: string) {
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

export async function getUserProducts() {
  const session = await getSession();
  const userEmail = session?.user?.email as string;
  const userProducts = await prisma.product.findMany({
    where: { userEmail: userEmail },
  });
  return userProducts;
}

export async function getAllProducts() {
  const allProducts = await prisma.product.findMany();
  return allProducts;
}

export async function setUserProducts(product: IProduct) {
  await prisma.product.create({
    data: product,
  });

  const allProducts = await getProductsById(product.asin);
  logger.info(allProducts, { depth: null });
}

// IN ProductHistory schema

export async function getLatestProductHistory(productID: string) {
  const productLatestHistory = await prisma.productDataHistory.findFirst({
    where: { asin: productID },
  });

  return productLatestHistory ?? null;
}

export async function setProductHistory(productData: {
  asin: string;
  price: number;
  title: string;
  img: string;
  reviews_count: number;
  rating: number;
}) {
  await prisma.productDataHistory.create({
    data: productData,
  });
  logger.info(`Updated product history for ProductID: ${productData.asin}`);
}
