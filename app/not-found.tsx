import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    // IF USER IS NOT LOGGED IN
    <div className="mt-24 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* HEADING */}
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          This page does not exist
        </h1>
        <Link
          href="/"
          className="mt-12 flex items-center justify-center w-full"
        >
          <Button
            type="submit"
            className="
      font-bold
      bg-button-1
      hover:bg-button-1/70
      text-primary-foreground
      dark:text-primary
      "
          >
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
