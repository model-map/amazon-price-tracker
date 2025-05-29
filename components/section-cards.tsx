import { getUserProducts } from "@/lib/prismaActions";
import ProductCard from "./ProductCard";
import { IProduct } from "@/lib/types";

export async function SectionCards() {
  const getAllProducts = await getUserProducts();

  return (
    <>
      {getAllProducts.map((product: IProduct) => {
        const { title, img, price, url, updatedAt } = product;

        return (
          <ProductCard
            key={product.asin}
            title={title}
            img={img}
            price={price}
            url={url}
            updatedAt={updatedAt}
          />
        );
      })}
    </>
  );
}
