import {
  BellRing,
  Blocks,
  Bot,
  ChartPie,
  Film,
  List,
  MessageCircle,
  Palette,
  Settings2,
  Shield,
  TrendingUpDown,
  Workflow,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: TrendingUpDown,
    title: "Real-Time Price Tracking",
    description:
      "Monitor Amazon product prices in real-time and receive updates whenever there's a price drop or change. ",
  },
  {
    icon: List,
    title: "Personalised Product List",
    description:
      "Create and manage your own list of products to track, tailored to your shopping preferences and needs. ",
  },
  {
    icon: BellRing,
    title: "Smart Notifications",
    description:
      "Get instant alerts via email or app notifications when the price of a product you're watching drops below your desired threshold.",
  },
  {
    icon: Shield,
    title: "Secure User Authentication ",
    description:
      "Enjoy a seamless and secure login experience with NextAuth/Auth.js, ensuring your data and tracked products are safe.",
  },
  {
    icon: Workflow,
    title: "Automated Price Scraping ",
    description:
      "Leverage automated cronjobs to fetch and update product prices regularly without any manual effort.",
  },
  {
    icon: Palette,
    title: "Sleek & Customizable UI",
    description:
      "A modern, responsive design powered by Tailwind CSS and Shadcn components for an intuitive and visually appealing user experience.",
  },
];

const Features01Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div>
        {/* HEADING */}
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          WHAT MAKES US BETTER
        </h2>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border rounded-xl py-6 px-5
              "
            >
              <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features01Page;
