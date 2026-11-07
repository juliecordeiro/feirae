import { STATUS_META } from "@/lib/data";
import type { StatusFeira } from "@/lib/types";
import { cn } from "@/lib/cn";
import { LogoMark } from "./Logo";

export function StatusBadge({
  status,
  withLogo = false,
  className,
}: {
  status: StatusFeira;
  withLogo?: boolean;
  className?: string;
}) {
  const m = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-semibold shadow-sm",
        m.pill,
        className,
      )}
    >
      {withLogo && <LogoMark size={13} className="text-white" />}
      {m.label}
    </span>
  );
}
