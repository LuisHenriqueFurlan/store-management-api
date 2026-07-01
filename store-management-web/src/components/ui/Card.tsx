import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
