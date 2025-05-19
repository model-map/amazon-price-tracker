import { TrendingUp } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10 ">
        {/* LOGO */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <TrendingUp className="size-4" />
            </div>
            Amazon Price Tracker
          </Link>
        </div>
        {/* LOGIN FORM */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs  rounded-lg">
            <LoginForm className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
