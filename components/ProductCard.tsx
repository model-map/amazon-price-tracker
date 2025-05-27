"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const ProductCard = ({
  title,
  img,
  price,
  url,
  updatedAt,
}: {
  title: string;
  img: string;
  price: number;
  url: string;
  updatedAt: Date;
}) => {
  // console.log(product);

  return (
    <Card className=" shadow-none flex flex-col justify-center gap-4">
      <CardContent className="text-[15px] text-muted-foreground px-5 flex flex-col items-center gap-4">
        <p>{title}</p>
        <div className="">
          <Image src={img} alt={title} width={150} height={20} />
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col items-start gap-2">
        <div className="font-semibold mt-auto flex">
          {process.env.NEXT_PUBLIC_CURRENCY} {price}
        </div>
        <div className="text-muted-foreground mt-auto flex gap-1">
          updated <ReactTimeAgo date={updatedAt} locale="en-US" />
        </div>
        <Button className="bg-blue-500 text-primary-foreground dark:text-primary w-full">
          <Link
            href={url}
            target="_blank"
            className="flex flex-row items-center gap-2 font-bold"
          >
            View Price History <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
