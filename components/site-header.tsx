import { LayoutDashboard } from "lucide-react";
import FilledInput from "./customized/input/input-03";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="hidden md:flex gap-1 px-4 lg:gap-2 lg:px-6">
          {/* SIDEBAR TRIGGER */}
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <LayoutDashboard />
          <h1 className="text-base font-medium">Dashboard</h1>
        </div>
        <FilledInput />
      </div>
    </header>
  );
}
