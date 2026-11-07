import Link from "next/link";
import type { IconName } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { Folha } from "./GradientHeader";

export function ActionCard({
  href,
  title,
  subtitle,
  icon,
  color = "brand",
}: {
  href: string;
  title: string;
  subtitle: string;
  icon: IconName;
  color?: "brand" | "accent";
}) {
  const accent = color === "accent";
  return (
    <Link
      href={href}
      className="relative overflow-hidden rounded-card border border-line bg-surface p-4 shadow-card transition-transform active:scale-[0.98]"
    >
      <Folha
        className="-right-1 -top-1 h-12 w-12 rotate-12"
        cor={accent ? "#e00000" : "#01791a"}
      />
      <span
        className={cn(
          "relative grid h-12 w-12 place-items-center rounded-2xl border-2",
          accent
            ? "border-accent/40 bg-accent-soft text-accent"
            : "border-brand/40 bg-brand-soft text-brand",
        )}
      >
        <Icon name={icon} size={22} strokeWidth={2} />
      </span>
      <h3 className="relative mt-3 text-base font-semibold text-ink">{title}</h3>
      <p className="relative text-xs text-muted">{subtitle}</p>
    </Link>
  );
}
