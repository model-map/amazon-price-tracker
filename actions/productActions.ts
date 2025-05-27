"use server";

import { getProductsById, setPrismaData } from "@/lib/prismaActions";

import { getLogger } from "@/lib/logger";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

export async function addProduct(productId: string) {
  const logger = getLogger();
  const session = await getSession();

  // CHECK IF ProductID already exists in DB
  logger.info(
    `Checking if product with productID: ${productId} is already in DB`
  );
  const isProductInDB = !!(await getProductsById(productId));

  if (isProductInDB) {
    logger.info(
      `Product with the productId: ${productId} already exists in DB.`
    );
  } else
    try {
      const scrape = async () => {
        const username = process.env.OXYLABS_USERNAME;
        const password = process.env.OXYLABS_PASSWORD;
        const body = {
          source: "amazon_product",
          parse: true,
          domain: "in",
          user_agent_type: "desktop_chrome",
          query: productId,
        };

        logger.info("Making fetch request to retrieve product data from API");
        const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              Buffer.from(`${username}:${password}`).toString("base64"),
          },
        });

        if (response) {
          const data = await response.json();
          const productInfo = data.results?.[0].content ?? null;

          if (!productInfo) {
            logger.warn(
              `Product with productId: ${productId} not found via API Request. The ASIN id is probably incorrect.`
            );
          } else {
            logger.info(
              `Adding Product with ProductId: ${productId} to the PRISMA DB`
            );
            const { url, asin, price, title, images, reviews_count, rating } =
              productInfo;
            const img = images[0];
            const userEmail = session?.user?.email;

            // THE OBJECT TO STORE IN PRISMA
            const data = {
              userEmail,
              url,
              asin,
              price,
              title,
              img,
              reviews_count,
              rating,
            };

            // ADD PRODUCT TO DB
            await setPrismaData(data);
          }
        }
      };

      await scrape();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
      } else {
        logger.error("Unexpected error occured while adding product to DB");
      }
    } finally {
      return;
    }
}
