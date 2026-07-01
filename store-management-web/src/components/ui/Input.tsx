import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  endAdornment?: ReactNode;
  error?: string;
  icon?: ReactNode;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, endAdornment, error, icon, id, label, ...props },
  ref,
) {
  const inputId = id ?? props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-zinc-800">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex h-12 items-center rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] transition focus-within:border-yellow-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-yellow-100",
          error && "border-red-300 focus-within:border-red-500 focus-within:ring-red-100",
          className,
        )}
      >
        {icon && <div className="mr-3 text-zinc-400">{icon}</div>}

        <input
          id={inputId}
          ref={ref}
          {...props}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400"
        />

        {endAdornment && <div className="ml-3 flex shrink-0 items-center">{endAdornment}</div>}
      </div>

      {error && <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
});
