import Link from "next/link";
import type { Feira } from "@/lib/types";
import { cn } from "@/lib/cn";
import { StatusBadge } from "./StatusBadge";
import { SaveButton } from "./SaveButton";
import { Stars } from "./ui";

/** Card grande com foto (Home — "Feiras para você"). */
export function FeiraPhotoCard({
  feira,
  className,
}: {
  feira: Feira;
  className?: string;
}) {
  return (
    <Link
      href={`/feira/${feira.id}`}
      className={cn(
        "group relative block aspect-[5/4] overflow-hidden rounded-card shadow-card sm:aspect-[16/10]",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-brand-tint bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ backgroundImage: `url(${feira.foto})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />

      <div className="absolute left-3 top-3">
        <StatusBadge status={feira.status} withLogo />
      </div>
      <div className="absolute right-3 top-3">
        <SaveButton feiraId={feira.id} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="mb-1.5 flex flex-wrap gap-1.5">
          {feira.tags.map((t) => (
            <span
              key={t}
              className="rounded-pill bg-accent px-2 py-0.5 text-[11px] font-semibold"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold leading-tight">{feira.nome}</h3>
        <p className="text-sm text-white/85">
          {feira.bairro} · {feira.statusLabel} · {feira.distanciaKm.toFixed(1)}{" "}
          km
        </p>
      </div>
    </Link>
  );
}

/** Linha horizontal com miniatura (listas de busca / resultados). */
export function FeiraRow({ feira }: { feira: Feira }) {
  return (
    <Link
      href={`/feira/${feira.id}`}
      className="flex gap-3 rounded-card border border-line bg-surface p-3 shadow-card transition-transform active:scale-[0.99]"
    >
      <div
        className="h-24 w-24 shrink-0 rounded-2xl bg-brand-tint bg-cover bg-center"
        style={{ backgroundImage: `url(${feira.foto})` }}
      />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <StatusBadge status={feira.status} />
          <SaveButton feiraId={feira.id} />
        </div>
        <h3 className="line-clamp-1 font-semibold text-ink">{feira.nome}</h3>
        <p className="text-xs text-muted">
          {feira.bairro} · {feira.statusLabel}
        </p>
        <div className="flex items-center gap-2">
          <Stars nota={feira.nota} />
          <span className="text-xs font-medium text-orange">
            {feira.distanciaKm.toFixed(1)} km
          </span>
        </div>
      </div>
    </Link>
  );
}
