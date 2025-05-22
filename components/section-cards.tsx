import ProductCard from "./ProductCard";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
      <ProductCard
        description="Testing Product Description"
        currentAmount={240}
      />
      <ProductCard
        description="Testing Another Product Description"
        currentAmount={1140}
      />
    </div>
  );
}
