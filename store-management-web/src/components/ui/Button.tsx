import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-zinc-950 text-white shadow-lg shadow-zinc-950/15 hover:bg-zinc-800 focus-visible:ring-yellow-200",
  secondary: "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 focus-visible:ring-zinc-200",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-200",
  ghost: "text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-200",
};

export function Button({
  children,
  className,
  fullWidth = false,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}
