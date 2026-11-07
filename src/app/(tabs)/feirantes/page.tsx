import Link from "next/link";
import { ArrowLeft, Store } from "lucide-react";
import { FEIRANTES, getCategoria, getFeira } from "@/lib/data";
import { GradientHeader } from "@/components/GradientHeader";
import { Icon } from "@/components/Icon";
import { Stars } from "@/components/ui";

export default function FeirantesPage() {
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
            <h1 className="text-2xl font-bold tracking-tight">Feirantes</h1>
            <p className="text-sm text-white/90">
              Encontre quem vende o que você procura
            </p>
          </div>
        </div>
      </GradientHeader>

      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
        {FEIRANTES.map((v) => {
          const cat = getCategoria(v.categoria);
          const feira = getFeira(v.feiraId);
          return (
            <Link
              key={v.id}
              href={`/feira/${v.feiraId}`}
              className="flex gap-3 rounded-card border border-line bg-surface p-3 shadow-card transition-transform active:scale-[0.99]"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-dark">
                <Icon name={v.icon} size={30} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="line-clamp-1 font-semibold text-ink">
                    {v.nome}
                  </h3>
                  <Stars nota={v.nota} />
                </div>
                <p className="inline-flex items-center gap-1 text-xs text-muted">
                  <Store size={12} /> {feira?.nome}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span className="inline-flex items-center gap-1 rounded-pill bg-brand-soft px-2 py-0.5 text-[11px] text-brand-dark">
                    {cat && <Icon name={cat.icon} size={11} />} {cat?.label}
                  </span>
                  {v.produtos.slice(0, 2).map((p) => (
                    <span
                      key={p}
                      className="rounded-pill bg-canvas px-2 py-0.5 text-[11px] text-muted"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
