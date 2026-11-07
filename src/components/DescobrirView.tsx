"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Navigation,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { CATEGORIAS, FEIRAS, SEMANA, STATUS_META } from "@/lib/data";
import type { CategoryId, Feira, Weekday } from "@/lib/types";
import { cn } from "@/lib/cn";
import { GradientHeader } from "./GradientHeader";
import { StatusBadge } from "./StatusBadge";
import { SaveButton } from "./SaveButton";

export function DescobrirView() {
  const router = useRouter();
  const [dias, setDias] = useState<Weekday[]>([]);
  const [periodo, setPeriodo] = useState<"dia" | "noite" | null>(null);
  const [cats, setCats] = useState<CategoryId[]>([]);
  const [selId, setSelId] = useState<string>(FEIRAS[1]?.id ?? FEIRAS[0].id);
  const [rota, setRota] = useState(false);

  const toggle = <T,>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const feiras = useMemo(
    () =>
      FEIRAS.filter((f) => {
        const okDia = dias.length === 0 || f.dias.some((d) => dias.includes(d));
        const okPer = !periodo || f.periodo === periodo;
        const okCat =
          cats.length === 0 || f.categorias.some((c) => cats.includes(c));
        return okDia && okPer && okCat;
      }),
    [dias, periodo, cats],
  );

  const sel =
    feiras.find((f) => f.id === selId) ?? feiras[0] ?? FEIRAS[0];

  return (
    <div className="space-y-3">
      {/* Cabeçalho */}
      <GradientHeader variant="descobrir" className="py-4">
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Voltar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/20 lg:hidden"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Descobrir</h1>
            <p className="inline-flex items-center gap-1 text-xs text-white/90">
              <MapPin size={12} /> Terminal Boqueirão — Origem Totem
            </p>
          </div>
        </div>
        <div className="relative mt-3 flex items-center gap-2 rounded-pill bg-white px-4 py-2.5 text-muted">
          <Search size={18} className="text-brand" />
          <span className="text-sm">Feiras, produtos, categorias…</span>
        </div>
      </GradientHeader>

      {/* Dias da semana */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {SEMANA.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDias((s) => toggle(s, d))}
            className={cn(
              "shrink-0 rounded-pill border px-4 py-1.5 text-sm font-medium transition-colors",
              dias.includes(d)
                ? "border-brand bg-brand text-white"
                : "border-line bg-surface text-muted",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Período + categorias */}
      <div className="flex items-center gap-1">
        <ChevronLeft size={16} className="shrink-0 text-faint" />
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          <Filtro
            ativo={periodo === "dia"}
            onClick={() => setPeriodo((p) => (p === "dia" ? null : "dia"))}
          >
            <Sun size={14} /> Dia
          </Filtro>
          <Filtro
            ativo={periodo === "noite"}
            onClick={() => setPeriodo((p) => (p === "noite" ? null : "noite"))}
          >
            <Moon size={14} /> Noite
          </Filtro>
          {CATEGORIAS.map((c) => (
            <Filtro
              key={c.id}
              ativo={cats.includes(c.id)}
              onClick={() => setCats((s) => toggle(s, c.id))}
            >
              {c.label}
            </Filtro>
          ))}
        </div>
        <ChevronRight size={16} className="shrink-0 text-faint" />
      </div>

      {/* Mapa */}
      <Mapa
        feiras={feiras}
        selId={sel?.id}
        onSelect={(id) => {
          setSelId(id);
          setRota(false);
        }}
      />

      {/* Card da feira selecionada */}
      {sel && (
        <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
          <div className="relative h-36">
            <div
              className="absolute inset-0 bg-brand-tint bg-cover bg-center"
              style={{ backgroundImage: `url(${sel.foto})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute left-3 top-3">
              <StatusBadge status={sel.status} />
            </div>
            <div className="absolute right-3 top-3">
              <SaveButton feiraId={sel.id} />
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-ink">{sel.nome}</h3>
            <p className={cn("text-sm font-medium", STATUS_META[sel.status].cor)}>
              {sel.tags[0]} — {sel.statusLabel}
            </p>
            <p className="text-sm font-medium text-orange">
              {sel.distanciaKm.toFixed(1)} km · {sel.tempo}
            </p>

            {rota ? (
              <div className="mt-3 flex items-center gap-2 rounded-pill bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark">
                <Navigation size={16} /> Rota iniciada até {sel.nome}
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <Link
                  href={`/feira/${sel.id}`}
                  className="flex flex-1 items-center justify-center gap-1 rounded-pill border-2 border-brand px-4 py-2.5 text-sm font-semibold text-brand"
                >
                  Ver feira →
                </Link>
                <button
                  type="button"
                  onClick={() => setRota(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  <Navigation size={16} /> Iniciar rota
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Filtro({
  children,
  ativo,
  onClick,
}: {
  children: React.ReactNode;
  ativo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-pill border px-3.5 py-1.5 text-sm font-medium transition-colors",
        ativo
          ? "border-brand bg-brand text-white"
          : "border-line bg-surface text-muted",
      )}
    >
      {children}
    </button>
  );
}

function Mapa({
  feiras,
  selId,
  onSelect,
}: {
  feiras: Feira[];
  selId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-[#eef1ea] shadow-card">
      <div className="relative h-80 w-full lg:h-96">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path d="M60 15 Q82 18 88 34 Q84 46 66 42 Q54 30 60 15Z" fill="#dbe8d2" />
          <ellipse cx="22" cy="74" rx="18" ry="9" fill="#dbe8d2" />
          <g stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M-5 54 Q35 44 70 56 T108 50" />
            <path d="M20 -5 Q26 40 18 105" />
            <path d="M58 -5 Q52 50 66 105" />
          </g>
          <g stroke="#dfe3d8" strokeWidth="1.6" strokeLinecap="round" fill="none">
            <path d="M-5 30 Q40 24 105 32" />
            <path d="M-5 82 Q45 78 105 86" />
            <path d="M40 -5 Q44 50 38 105" />
            <path d="M84 -5 Q80 50 86 105" />
          </g>
        </svg>

        {feiras.map((f) => {
          const ativo = f.id === selId;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onSelect(f.id)}
              aria-label={f.nome}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${f.mapX}%`, top: `${f.mapY}%`, zIndex: ativo ? 20 : 10 }}
            >
              <span
                className={cn(
                  "grid -rotate-45 place-items-center rounded-full rounded-bl-none border-2 border-white shadow-md transition-all",
                  STATUS_META[f.status].pin,
                  ativo ? "h-9 w-9" : "h-7 w-7",
                )}
              >
                <span className="h-2 w-2 rotate-45 rounded-full bg-white" />
              </span>
            </button>
          );
        })}

        {/* você */}
        <span
          className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1a1a1a]"
          style={{ left: "62%", top: "88%" }}
          aria-label="Você está aqui"
        />
      </div>
    </div>
  );
}
