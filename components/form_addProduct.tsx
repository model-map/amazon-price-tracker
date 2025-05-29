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
import { addProduct } from "@/actions/productActions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const Form_addProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(<></>);

  const formSchema = z.object({
    productLink: z.custom<string>((val) => {
      // CHECKS IF THE LINK INCLUDES AMAZON.IN
      // AND
      // IF IT CONTAINS A 10-DIGIT ASIN NUMBER
      return (
        !!val.includes("amazon.in") && val.match(/\/([A-Z0-9]{10})(?:[\/?]|$)/i)
      );
    }, "Invalid Amazon India product link"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productLink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // SET isLoading true
    setIsLoading(true);
    // GETTING AMAZON PRODUCT ID
    const link = values.productLink as string;
    const match = link.match(/\/([A-Z0-9]{10})(?:[\/?]|$)/i);
    const productID = match ? match[1] : null;

    if (!productID) {
      console.error("Failed to extract product ID.");
      return;
    }

    try {
      const response = await addProduct(productID);
      form.reset(); // Optional: reset form after successful submission
      if (response.success) {
        setServerMessage(
          <span className="text-green-500 font-semibold">
            {response.message}
          </span>
        );
      } else {
        setServerMessage(
          <span className="text-red-500 font-semibold">{response.message}</span>
        );
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
        // onFocus={() => setServerMessage(<></>)}
      >
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
                  placeholder="https://www.amazon.in/gp/product/B0F676KRMN "
                  className="lg:w-[37vw]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Paste Amazon product link here</FormDescription>
              {serverMessage && (
                <FormDescription>{serverMessage}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button
            disabled
            className="bg-blue-500 
          text-primary-foreground dark:text-primary font-semibold"
          >
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-blue-500 
          text-primary-foreground dark:text-primary font-semibold"
          >
            Add Product
          </Button>
        )}
      </form>
    </Form>
  );
};

export default Form_addProduct;
