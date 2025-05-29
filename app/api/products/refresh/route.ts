import { getLogger } from "@/lib/logger";
import {
  getAllProducts,
  getLatestProductHistory,
  setProductHistory,
} from "@/lib/prismaActions";
import { productScraper } from "@/lib/productScraper";
import { IProduct } from "@/lib/types";
import { isToday } from "date-fns";

const logger = getLogger();

export async function GET() {
  try {
    const products = await getAllProducts();

    // return Response.json(JSON.stringify(products));

    for (const product of products) {
      // Checking if an entry for today already exists in the ProductDataHistory table
      const latestProductHistory = await getLatestProductHistory(product.asin);

      if (!latestProductHistory || !isToday(latestProductHistory.createdAt)) {
        const data = await productScraper(product.asin);
        const { asin, price, title, img, reviews_count, rating } =
          data as IProduct;

        const productHistory = {
          asin,
          price,
          title,
          img,
          reviews_count,
          rating,
        };

        await setProductHistory(productHistory);
      } else {
        logger.info("Product data already scraped today");
      }
    }
    return Response.json({
      status: 200,
      message: "Updated product history of all products",
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message });
    } else {
      return Response.json({
        message: "Unexpected error occured, Please try later.",
      });
    }
  }
}
