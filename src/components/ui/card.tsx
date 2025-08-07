import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("rounded-lg border border-gray-200 bg-white shadow-sm", className)}
    />
  );
});

Card.displayName = "Card";

export { Card };
