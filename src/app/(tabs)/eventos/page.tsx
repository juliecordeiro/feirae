import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GradientHeader } from "@/components/GradientHeader";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { EVENTOS } from "@/lib/data";

export default function EventosPage() {
  const eventos = [...EVENTOS].sort((a, b) => a.data.localeCompare(b.data));

  return (
    <div className="space-y-4">
      <GradientHeader className="py-5">
        <div className="relative flex items-center gap-2">
          <Link
            href="/"
            aria-label="Voltar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/20 text-white lg:hidden"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Eventos</h1>
            <p className="text-sm text-white/90">Festivais e celebrações</p>
          </div>
        </div>
      </GradientHeader>

      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
        {eventos.map((ev) => {
          const data = new Date(ev.data + "T00:00:00");
          return (
            <div
              key={ev.id}
              className="flex items-center gap-3 rounded-card border border-line bg-surface p-3 shadow-card"
            >
              <div className="flex w-14 shrink-0 flex-col items-center rounded-2xl bg-brand-soft py-2 text-brand-dark">
                <span className="text-xl font-bold leading-none">
                  {data.toLocaleDateString("pt-BR", { day: "2-digit" })}
                </span>
                <span className="text-[10px] uppercase">
                  {data.toLocaleDateString("pt-BR", { month: "short" })}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className={cn(
                    "mb-1 inline-block rounded-pill px-2 py-0.5 text-[10px] font-semibold uppercase",
                    ev.tipo === "celebracao"
                      ? "bg-accent-soft text-accent"
                      : "bg-brand-soft text-brand-dark",
                  )}
                >
                  {ev.tipo === "celebracao" ? "Celebração" : "Feira"}
                </span>
                <p className="line-clamp-1 font-semibold text-ink">{ev.nome}</p>
                <p className="text-xs text-muted">{ev.local}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-canvas text-brand">
                <Icon name={ev.icon} size={22} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
