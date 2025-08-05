import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "div";
  return (
    <Comp
      className={cn(
        "rounded-lg border border-gray-200 bg-white shadow-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Card.displayName = "Card";

export { Card };
