import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export function Stars({
  nota,
  avaliacoes,
  className,
}: {
  nota: number;
  avaliacoes?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 text-sm", className)}
      aria-label={`Nota ${nota} de 5`}
    >
      <Star size={15} className="fill-orange text-orange" />
      <span className="font-semibold text-ink">{nota.toFixed(1)}</span>
      {avaliacoes != null && (
        <span className="text-faint">({avaliacoes.toLocaleString("pt-BR")})</span>
      )}
    </span>
  );
}

export function Chip({
  children,
  active,
  as = "span",
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  as?: "span" | "button" | "link";
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base = cn(
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill border px-3.5 py-2 text-sm font-medium transition-colors",
    active
      ? "border-brand bg-brand text-white"
      : "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink",
    className,
  );
  if (as === "link" && href)
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  if (as === "button")
    return (
      <button type="button" onClick={onClick} className={base}>
        {children}
      </button>
    );
  return <span className={base}>{children}</span>;
}

export function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-2">
      <h2 className="text-lg font-semibold tracking-tight text-ink">
        {children}
      </h2>
      {action && (
        <Link
          href={action.href}
          className="text-sm font-medium text-brand hover:underline"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function OpenBadge({ aberta }: { aberta: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-semibold",
        aberta ? "bg-brand-soft text-brand-dark" : "bg-line text-muted",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          aberta ? "bg-brand animate-pulse" : "bg-faint",
        )}
      />
      {aberta ? "Aberta agora" : "Fechada"}
    </span>
  );
}

export function MetaRow({
  horario,
  endereco,
  distanciaKm,
}: {
  horario?: string;
  endereco?: string;
  distanciaKm?: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
      {horario && (
        <span className="inline-flex items-center gap-1">
          <Clock size={13} /> {horario}
        </span>
      )}
      {endereco && (
        <span className="inline-flex items-center gap-1">
          <MapPin size={13} /> {endereco}
        </span>
      )}
      {distanciaKm != null && (
        <span className="inline-flex items-center gap-1 font-medium text-brand">
          {distanciaKm.toFixed(1)} km
        </span>
      )}
    </div>
  );
}
