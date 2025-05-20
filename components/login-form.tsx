import { cn } from "@/lib/utils";
import { signIn } from "@/auth";
import Button_GoogleSignIn from "./Button_GoogleSignIn";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        {/* HEADING */}
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Login with your Google account
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          {/* PLACEHOLDER TEXT */}
        </p>
      </div>
      <div className="grid gap-6">
        <Button_GoogleSignIn />
      </div>
      {/* <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div> */}
    </form>
  );
}
