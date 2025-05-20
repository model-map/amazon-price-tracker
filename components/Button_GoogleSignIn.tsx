import { signIn } from "@/auth";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Button_GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
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
        <Image src="/google.svg" alt="Google" width={22} height={50} />
        Sign In
      </Button>
    </form>
  );
};

export default Button_GoogleSignIn;
