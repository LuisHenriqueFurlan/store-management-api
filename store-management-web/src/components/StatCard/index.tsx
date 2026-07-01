import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  icon: LucideIcon;
  tone?: "neutral" | "success" | "warning" | "danger";
}

export default function StatCard({
  title,
  value,
  subtitle,
  color,
  icon: Icon,
  tone = "success",
}: Props) {
  const toneClass = {
    neutral: "text-zinc-500",
    success: "text-emerald-600",
    warning: "text-yellow-700",
    danger: "text-red-600",
  }[tone];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      <div className="flex min-h-[128px] items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500">
            {title}
          </p>

          <h2 className="mt-4 truncate text-[34px] font-bold leading-none text-zinc-950">
            {value}
          </h2>

          <p className={`mt-4 text-sm font-semibold ${toneClass}`}>
            {subtitle}
          </p>
        </div>

        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg shadow-lg ${color}`}>
          <Icon size={26} color="white" />
        </div>
      </div>
    </div>
  );
}
