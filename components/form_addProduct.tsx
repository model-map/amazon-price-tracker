"use client";

import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  // productLink: z.string().min(2),
  productLink: z.custom<string>((val) => {
    // CHECKS IF THE LINK INCLUDES AMAZON.IN
    // AND
    // IF IT CONTAINS A 10-DIGIT ASIN NUMBER
    return (
      !!val.includes("amazon.in") && val.match(/\/([A-Z0-9]{10})(?:[\/?]|$)/i)
    );
  }, "Invalid Amazon India product link"),
});

const Form_addProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productLink: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // GETTING AMAZON PRODUCT ID
    const link = values.productLink as string;
    const match = link.match(/\/([A-Z0-9]{10})(?:[\/?]|$)/i);
    const productID = match ? match[1] : null;
    console.log(productID);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="productLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Track New Product
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://www.amazon.in/gp/product/B0F676KRMN"
                  className="lg:w-[37vw]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="">
                Paste Amazon product link here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-blue-500 
          text-primary-foreground 
          dark:text-primary
          font-semibold"
        >
          Add Product
        </Button>
      </form>
    </Form>
  );
};

export default Form_addProduct;
