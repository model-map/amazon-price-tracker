import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import Button_GoogleSignIn from "../Button_GoogleSignIn";

const Hero01 = () => {
  return (
    <div className="mt-24 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* HEADING */}
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Track Prices, Save More
        </h1>
        {/* DESCRIPTION */}
        <p className="mt-6 text-[17px] md:text-lg">
          Keep an eye on Amazon prices with our user-friendly app, perfect for
          smart shoppers like you! Simplify your shopping and maximize your
          savings with our handy tools designed to work as hard as you do!
        </p>
        <div className="mt-12 flex items-center justify-center w-full ">
          <Button_GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default Hero01;
