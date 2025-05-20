import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ComponentProps } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    designation: "Frequent Shopper",
    company: "Amazon Enthusiast",
    testimonial:
      "This app has completely changed how I shop online! The real-time price tracking helps me grab the best deals effortlessly.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg ",
  },
  {
    id: 2,
    name: "James Wilson",
    designation: "Bargain Hunter",
    company: "Smart Buyer",
    testimonial:
      "I love the personalized product lists feature. It keeps all my tracked items organized, and the notifications are spot-on!",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg ",
  },
  {
    id: 3,
    name: "Laura Bennett",
    designation: "Deal Seeker",
    company: "Savings Pro",
    testimonial:
      "The smart notifications are a game-changer. I get instant alerts when prices drop, so I never miss out on a great deal.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg ",
  },
  {
    id: 4,
    name: "David Clark",
    designation: "Tech Enthusiast",
    company: "Gadget Guru",
    testimonial:
      "This tool is a must-have for anyone who shops on Amazon. The automated price scraping ensures I always have the latest info.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg ",
  },
  {
    id: 5,
    name: "Michelle Roberts",
    designation: "Online Shopper",
    company: "Retail Expert",
    testimonial:
      "The sleek and customizable UI makes this app a joy to use. It’s intuitive, responsive, and works flawlessly every time.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg ",
  },
  {
    id: 6,
    name: "Chris Evans",
    designation: "Budget Shopper",
    company: "Discount Finder",
    testimonial:
      "Secure authentication gives me peace of mind. This app truly caters to customers like me who value privacy and security.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg ",
  },
];

const Testimonial01 = () => (
  <div className="flex justify-center items-center px-6">
    <div>
      <h2 className="mb-14 text-5xl md:text-6xl font-bold text-center tracking-tight">
        Testimonials
      </h2>
      <div className="max-w-screen-xl mx-auto columns-2 lg:columns-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="mb-8 bg-accent rounded-xl p-6 break-inside-avoid"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" target="_blank">
                  <TwitterLogo className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

export default Testimonial01;
