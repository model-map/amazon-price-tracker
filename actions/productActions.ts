"use server";

import { getProductsById, setUserProducts } from "@/lib/prismaActions";

import { getLogger } from "@/lib/logger";
import { productScraper } from "@/lib/productScraper";
import { IProduct } from "@/lib/types";
import { NextResponse } from "next/server";

export async function addProduct(productId: string) {
  const logger = getLogger();

  // CHECK IF ProductID already exists in DB
  logger.info(
    `Checking if product with productID: ${productId} is already in DB`
  );
  const isProductInDB = !!(await getProductsById(productId));

  if (isProductInDB) {
    logger.info(
      `Product with the productId: ${productId} already exists in DB.`
    );
    return {
      success: false,
      message: "Product is already being tracked",
    };
  } else
    try {
      const scrapedData = (await productScraper(productId)) as IProduct;
      // ADD PRODUCT TO PRODUCTS DB
      await setUserProducts(scrapedData);

      // REFRESHING PRICE HISTORY
      // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/refresh`);

      return {
        success: true,
        message: "Product is now being tracked",
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        return { success: false, message: error.message };
      } else {
        logger.error("Unexpected error occured while adding product to DB");
        return {
          success: false,
          message: "Unexpected error occured, please try again later.",
        };
      }
    }
}
