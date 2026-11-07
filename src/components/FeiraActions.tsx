"use client";

import { useState } from "react";
import { Navigation, Share2 } from "lucide-react";
import type { Feira } from "@/lib/types";
import { SaveButton } from "./SaveButton";

export function FeiraActions({ feira }: { feira: Feira }) {
  const [toast, setToast] = useState<string | null>(null);
  const [rota, setRota] = useState(false);

  const mostrar = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2200);
  };

  const compartilhar = async () => {
    const url = `${location.origin}/feira/${feira.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: feira.nome, url });
      } else {
        await navigator.clipboard.writeText(url);
        mostrar("Link copiado");
      }
    } catch {
      /* cancelado */
    }
  };

  return (
    <>
      {rota && (
        <div className="mb-3 flex items-center gap-2 rounded-2xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand-dark">
          <Navigation size={16} />
          Rota iniciada · {feira.distanciaKm.toFixed(1)} km ·{" "}
          {Math.max(5, Math.round(feira.distanciaKm * 12))} min a pé
        </div>
      )}

      <div className="flex items-center gap-2">
        <SaveButton feiraId={feira.id} variant="full" className="flex-1" />
        <button
          type="button"
          onClick={() => setRota(true)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill border border-brand bg-brand-soft px-5 py-3 text-sm font-semibold text-brand-dark"
        >
          <Navigation size={18} /> Iniciar rota
        </button>
        <button
          type="button"
          onClick={compartilhar}
          aria-label="Compartilhar link"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink"
        >
          <Share2 size={19} />
        </button>
      </div>

      {toast && (
        <div className="fixed inset-x-0 bottom-8 z-50 mx-auto flex max-w-md justify-center px-5">
          <div className="animate-fade-up rounded-pill bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-card">
            {toast}
          </div>
        </div>
      )}
    </>
  );
}
