import { cn } from "@/lib/cn";

/** Folha decorativa (listrada) como no Figma. */
export function Folha({
  className,
  cor = "#01791a",
}: {
  className?: string;
  cor?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("pointer-events-none absolute", className)}
      aria-hidden="true"
    >
      <path
        d="M70 10C40 10 12 34 10 68c34-2 58-30 58-58 0 0-20 6-30 20"
        fill={cor}
      />
      <g stroke="rgba(255,255,255,.5)" strokeWidth="2.5" fill="none">
        <path d="M22 60C34 44 50 30 64 22" />
        <path d="M30 58c6-10 12-16 18-20" />
        <path d="M24 50c6-8 12-13 18-16" />
      </g>
    </svg>
  );
}

export function GradientHeader({
  variant = "brand",
  className,
  children,
}: {
  variant?: "brand" | "descobrir";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card px-5 py-5 text-white shadow-card",
        variant === "descobrir" ? "grad-descobrir" : "grad-brand",
        className,
      )}
    >
      {children}
    </div>
  );
}
