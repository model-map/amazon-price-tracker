import { PrismaClient } from "@/generated/prisma";
import { IProduct } from "./types";
import getSession from "./session";

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

export async function getProducts() {
  const session = await getSession();
  const userEmail = session?.user?.email as string;
  const allProducts = await prisma.product.findMany({
    where: { userEmail: userEmail },
  });
  return allProducts;
}

export async function setPrismaData(product: IProduct) {
  await prisma.product.create({
    data: product,
  });

  const allProducts = await getProductsById(product.asin);
  console.dir(allProducts, { depth: null });
}
