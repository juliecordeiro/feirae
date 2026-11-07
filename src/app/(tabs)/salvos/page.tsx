"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FolderPlus,
  MoreVertical,
  FolderInput,
  Share2,
  Trash2,
  X,
  Bookmark,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { getFeira } from "@/lib/data";
import { GradientHeader } from "@/components/GradientHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Icon } from "@/components/Icon";

export default function SalvosPage() {
  const {
    pastas,
    salvos,
    toggleSalvo,
    moverFeira,
    adicionarPasta,
    hidratado,
  } = useApp();

  const [novaPasta, setNovaPasta] = useState("");
  const [menu, setMenu] = useState<string | null>(null);
  const [moverId, setMoverId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const mostrar = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2000);
  };

  const grupos = useMemo(
    () =>
      pastas
        .map((p) => ({
          pasta: p,
          itens: salvos
            .filter((s) => s.pastaId === p.id)
            .map((s) => getFeira(s.feiraId))
            .filter((f): f is NonNullable<typeof f> => Boolean(f)),
        }))
        .filter((g) => g.itens.length > 0),
    [pastas, salvos],
  );

  const criarPasta = () => {
    const nome = novaPasta.trim();
    if (!nome) return;
    adicionarPasta(nome, "folder");
    setNovaPasta("");
    mostrar("Pasta criada");
  };

  const compartilhar = async (nome: string, id: string) => {
    const url = `${location.origin}/feira/${id}`;
    try {
      if (navigator.share) await navigator.share({ title: nome, url });
      else {
        await navigator.clipboard.writeText(url);
        mostrar("Link copiado");
      }
    } catch {
      /* cancelado */
    }
    setMenu(null);
  };

  return (
    <div className="space-y-4">
      <GradientHeader className="py-5">
        <h1 className="text-3xl font-bold tracking-tight">Salvos</h1>
        <p className="text-sm text-white/90">
          {salvos.length} feira(s) guardada(s)
        </p>
      </GradientHeader>

      {/* Nova pasta */}
      <div className="flex items-center gap-2">
        <input
          value={novaPasta}
          onChange={(e) => setNovaPasta(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && criarPasta()}
          placeholder="Nova pasta…"
          className="flex-1 rounded-pill border border-line bg-surface px-5 py-3 text-sm shadow-card outline-none focus:border-brand"
        />
        <button
          type="button"
          onClick={criarPasta}
          aria-label="Criar pasta"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-brand/40 bg-surface text-brand shadow-card"
        >
          <FolderPlus size={20} />
        </button>
      </div>

      {!hidratado ? (
        <p className="text-sm text-muted">Carregando…</p>
      ) : grupos.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-brand-soft text-brand">
            <Bookmark size={34} />
          </div>
          <h2 className="text-lg font-semibold text-ink">Nada salvo ainda</h2>
          <p className="max-w-xs text-sm text-muted">
            Toque no marcador de uma feira para guardá-la aqui.
          </p>
          <Link
            href="/descobrir"
            className="mt-1 rounded-pill bg-brand px-5 py-2.5 text-sm font-semibold text-white"
          >
            Descobrir feiras
          </Link>
        </div>
      ) : (
        grupos.map(({ pasta, itens }) => (
          <section key={pasta.id} className="space-y-2">
            <h2 className="flex items-center gap-2 px-1 text-sm font-semibold text-ink">
              <span className="h-2.5 w-2.5 rounded-sm bg-brand" />
              {pasta.nome}{" "}
              <span className="font-normal text-faint">({itens.length})</span>
            </h2>

            <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-2 lg:space-y-0">
              {itens.map((feira) => (
                <div
                  key={feira.id}
                  className="relative flex items-center gap-3 rounded-card border border-line bg-surface p-2.5 shadow-card"
                >
                  <Link
                    href={`/feira/${feira.id}`}
                    className="h-16 w-16 shrink-0 rounded-2xl bg-brand-tint bg-cover bg-center"
                    style={{ backgroundImage: `url(${feira.foto})` }}
                  />
                  <Link href={`/feira/${feira.id}`} className="min-w-0 flex-1">
                    <StatusBadge status={feira.status} />
                    <h3 className="mt-1 line-clamp-1 font-bold text-brand-dark">
                      {feira.nome}
                    </h3>
                    <p className="line-clamp-1 text-xs text-muted">
                      {feira.bairro} · {feira.statusLabel}
                    </p>
                  </Link>

                  <button
                    type="button"
                    aria-label="Ações"
                    onClick={() => setMenu(menu === feira.id ? null : feira.id)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-faint hover:bg-canvas"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {menu === feira.id && (
                    <div className="absolute right-2 top-12 z-20 w-48 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
                      <button
                        type="button"
                        onClick={() => {
                          setMoverId(feira.id);
                          setMenu(null);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-ink hover:bg-canvas"
                      >
                        <FolderInput size={16} className="text-brand" /> Mover de
                        pasta
                      </button>
                      <button
                        type="button"
                        onClick={() => compartilhar(feira.nome, feira.id)}
                        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-ink hover:bg-canvas"
                      >
                        <Share2 size={16} className="text-brand" /> Compartilhar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          toggleSalvo(feira.id);
                          setMenu(null);
                          mostrar("Removida dos salvos");
                        }}
                        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-accent hover:bg-accent-soft"
                      >
                        <Trash2 size={16} /> Remover
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      {/* Sheet mover */}
      {moverId && (
        <div
          className="fixed inset-0 z-50 mx-auto flex max-w-md items-end justify-center lg:items-center"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setMoverId(null)}
            className="absolute inset-0 bg-ink/40"
          />
          <div className="relative z-10 w-full animate-fade-up rounded-t-3xl bg-surface p-5 pb-8 shadow-card lg:max-w-sm lg:rounded-3xl">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line lg:hidden" />
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ink">
                Mover para pasta
              </h3>
              <button
                type="button"
                onClick={() => setMoverId(null)}
                aria-label="Fechar"
                className="grid h-8 w-8 place-items-center rounded-full text-faint hover:bg-canvas"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-1.5">
              {pastas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    moverFeira(moverId, p.id);
                    setMoverId(null);
                    mostrar(`Movida para ${p.nome}`);
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-line px-4 py-3 text-left hover:border-brand/40"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon name={p.icon} size={18} />
                  </span>
                  <span className="flex-1 font-medium text-ink">{p.nome}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed inset-x-0 bottom-24 z-50 mx-auto flex max-w-md justify-center px-5 lg:bottom-8">
          <div className="animate-fade-up rounded-pill bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-card">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
