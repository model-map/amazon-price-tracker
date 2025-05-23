"use server";

import {
  getPrismaData,
  getPrismaDataById,
  setPrismaData,
} from "@/lib/prismaActions";

export async function addProduct(productId: string) {
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
      const productInfo = data.results?.[0].content;
      const { url, asin, price, title, images, reviews_count, rating } =
        productInfo;
      const img = images[0];

      // THE OBJECT TO STORE IN PRISMA
      const product = {
        url,
        asin,
        price,
        title,
        img,
        reviews_count,
        rating,
      };

      // CHECKING IF PRODUCT ALREADY EXISTS IN DB

      if (!(await getPrismaDataById(asin))) {
        await setPrismaData(product);
      } else {
        console.log("Item already exists in the database");
      }
    }
  };

  scrape();
}
