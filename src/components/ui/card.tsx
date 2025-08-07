import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "div";

  // Si c’est un Fragment, on ne passe pas le ref
  if (asChild) {
    return (
      <Comp {...props} className={cn("rounded-lg border border-gray-200 bg-white shadow-sm", className)} />
    );
  }

  return (
    <Comp
      ref={ref}
      {...props}
      className={cn("rounded-lg border border-gray-200 bg-white shadow-sm", className)}
    />
  );
});

Card.displayName = "Card";

export { Card };
