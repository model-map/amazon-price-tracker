import { signOut } from "@/auth";
import { Button } from "./ui/button";
import Image from "next/image";

const Button_GoogleSignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay of 1 second

        await signOut();
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
        Sign Out
      </Button>
    </form>
  );
};

export default Button_GoogleSignOut;
