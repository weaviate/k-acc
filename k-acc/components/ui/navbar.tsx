import React from "react";
import { cn } from "@/lib/utils";

const Navbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-row items-center justify-between gap-2 w-full",
      className
    )}
    {...props}
  />
));

export default Navbar;
