import { Input } from "@/components/ui/input";

export default function FilledInput() {
  return (
    <Input
      type="email"
      placeholder="Search Products"
      className="bg-secondary border-none shadow-none w-full md:w-1/2 lg:1/4"
    />
  );
}
