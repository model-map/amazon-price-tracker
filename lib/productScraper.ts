import { getLogger } from "./logger";
import getSession from "./session";
import { IProduct } from "./types";

const logger = getLogger();

export const productScraper = async (productId: string) => {
  const session = await getSession();

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
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
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
      const userEmail = session?.user?.email as string;

      // THE OBJECT TO STORE IN PRISMA
      const data: IProduct = {
        userEmail,
        url,
        asin,
        price,
        title,
        img,
        reviews_count,
        rating,
      };

      return data;
    }
  }
};
