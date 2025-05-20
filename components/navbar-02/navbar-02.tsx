import { NavMenu } from "./nav-menu";

import { ModeToggle } from "../ModeToggle";
import Button_GoogleSignIn from "../Button_GoogleSignIn";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const Navbar02Page = () => {
  return (
    <div className="bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <TrendingUp size={30} />
              <h1 className="text-xl">Amazon Price Tracker</h1>
            </Link>

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            <Button_GoogleSignIn />
            <ModeToggle />

            {/* Mobile Menu */}
            {/* <div className="md:hidden">
              <NavigationSheet />
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar02Page;
