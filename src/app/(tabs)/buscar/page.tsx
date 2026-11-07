"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Store } from "lucide-react";
import {
  CATEGORIAS,
  FEIRANTES,
  FEIRAS,
  getCategoria,
  getFeira,
} from "@/lib/data";
import type { CategoryId } from "@/lib/types";
import { cn } from "@/lib/cn";
import { GradientHeader } from "@/components/GradientHeader";
import { FeiraRow } from "@/components/FeiraCards";
import { Icon } from "@/components/Icon";
import { Stars } from "@/components/ui";

export default function BuscarPage() {
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<CategoryId[]>([]);

  const toggle = (id: CategoryId) =>
    setCats((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const feiras = useMemo(() => {
    const t = q.trim().toLowerCase();
    return FEIRAS.filter((f) => {
      const okCat =
        cats.length === 0 || f.categorias.some((c) => cats.includes(c));
      const okT =
        t === "" ||
        f.nome.toLowerCase().includes(t) ||
        f.bairro.toLowerCase().includes(t) ||
        f.tags.some((x) => x.toLowerCase().includes(t));
      return okCat && okT;
    });
  }, [q, cats]);

  const feirantes = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t === "") return [];
    return FEIRANTES.filter(
      (v) =>
        v.nome.toLowerCase().includes(t) ||
        v.produtos.some((p) => p.toLowerCase().includes(t)),
    );
  }, [q]);

  return (
    <div className="space-y-4">
      <GradientHeader className="py-4">
        <div className="relative flex items-center gap-2">
          <Link
            href="/"
            aria-label="Voltar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/20 text-white lg:hidden"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Buscar</h1>
        </div>
        <div className="relative mt-3 flex items-center gap-2 rounded-pill bg-white px-4 py-2.5">
          <Search size={18} className="text-brand" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Feiras, produtos, categorias…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint"
          />
        </div>
      </GradientHeader>

      {/* Filtros */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => toggle(c.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-pill border px-3.5 py-1.5 text-sm font-medium transition-colors",
              cats.includes(c.id)
                ? "border-brand bg-brand text-white"
                : "border-line bg-surface text-muted",
            )}
          >
            <Icon name={c.icon} size={15} /> {c.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted">
        {feiras.length} feira{feiras.length !== 1 && "s"}
      </p>

      {feirantes.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-faint">Feirantes</h2>
          {feirantes.map((v) => {
            const cat = getCategoria(v.categoria);
            const feira = getFeira(v.feiraId);
            return (
              <Link
                key={v.id}
                href={`/feira/${v.feiraId}`}
                className="flex items-center gap-3 rounded-card border border-line bg-surface p-3 shadow-card"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand-dark">
                  <Icon name={v.icon} size={24} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-1 font-semibold text-ink">
                    {v.nome}
                  </h3>
                  <p className="inline-flex items-center gap-1 text-xs text-muted">
                    <Store size={12} /> {cat?.label} · {feira?.nome}
                  </p>
                </div>
                <Stars nota={v.nota} />
              </Link>
            );
          })}
        </section>
      )}

      {feiras.length > 0 ? (
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
          {feiras.map((f) => (
            <FeiraRow key={f.id} feira={f} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-canvas text-faint">
            <Icon name="search-x" size={30} />
          </div>
          <p className="font-semibold text-ink">Nada encontrado</p>
          <p className="max-w-xs text-sm text-muted">
            Tente outra palavra ou remova os filtros.
          </p>
        </div>
      )}
    </div>
  );
}
