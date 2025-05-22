import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "./ui/badge";

const ProductCard = ({
  description,
  currentAmount,
}: {
  description: string;
  currentAmount: number;
}) => {
  return (
    <Card className="@container/card mb-4">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {process.env.CURRENCY}
          {currentAmount}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
