"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { Logo, LogoMark } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/cn";

export default function EntrarPage() {
  const router = useRouter();
  const { setPerfil } = useApp();
  const [nome, setNome] = useState("");
  const [permitir, setPermitir] = useState(true);

  const entrar = () => {
    setPerfil({
      nome: nome.trim() || "Visitante",
      usarLocalizacaoAtual: permitir,
    });
    router.push("/");
  };

  return (
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-2">
      {/* Painel da marca — desktop */}
      <div className="relative hidden overflow-hidden bg-brand p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-2 text-2xl font-semibold">
          <LogoMark size={40} className="text-white" />
          Feiraê
        </div>
        <div className="relative">
          <h2 className="max-w-md text-4xl font-bold leading-tight">
            As feiras da sua cidade, na palma da mão.
          </h2>
          <p className="mt-4 max-w-sm text-white/85">
            Descubra feiras livres, produtos e feirantes perto de você. Salve as
            favoritas e trace a rota até elas.
          </p>
          <div className="mt-8 flex gap-4">
            {(["carrot", "apple", "flower", "fish"] as const).map((n) => (
              <span
                key={n}
                className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur"
              >
                <Icon name={n} size={26} />
              </span>
            ))}
          </div>
        </div>
        <p className="relative inline-flex items-center gap-1 text-sm text-white/80">
          <MapPin size={14} /> Feiras livres de São Paulo e região
        </p>
      </div>

      {/* Formulário */}
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 lg:min-h-dvh lg:max-w-sm lg:justify-center lg:px-0">
        {/* Topo ilustrado — mobile */}
        <div className="relative flex flex-1 flex-col items-center justify-center text-center lg:hidden">
          <div className="absolute inset-x-0 top-10 flex justify-center gap-6">
            <Icon name="carrot" size={40} className="animate-fade-up text-brand/70" />
            <Icon name="apple" size={40} className="mt-6 animate-fade-up text-accent/60" />
            <Icon name="flower" size={40} className="animate-fade-up text-sun/80" />
            <Icon name="basket" size={40} className="mt-6 animate-fade-up text-brand/70" />
          </div>
          <div className="grid h-24 w-24 place-items-center rounded-[2rem] bg-surface text-brand shadow-card">
            <Logo size={56} showWord={false} />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">
            Feira<span className="text-brand">ê</span>
          </h1>
          <p className="mt-2 max-w-xs text-balance text-muted">
            Descubra as feiras livres, os produtos e os feirantes perto de você.
          </p>
        </div>

        {/* Cabeçalho — desktop */}
        <div className="mb-8 hidden lg:block">
          <Logo size={38} />
          <h1 className="mt-8 text-2xl font-bold tracking-tight text-ink">
            Bem-vindo(a)!
          </h1>
          <p className="mt-1 text-muted">Vamos configurar sua experiência.</p>
        </div>

        {/* Campos */}
        <div className="space-y-3 pb-10 lg:pb-0">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && entrar()}
            placeholder="Como podemos te chamar?"
            className="w-full rounded-pill border border-line bg-surface px-5 py-4 text-sm shadow-card outline-none focus:border-brand"
          />

          <button
            type="button"
            onClick={() => setPermitir((p) => !p)}
            className={cn(
              "flex w-full items-center gap-3 rounded-pill border px-5 py-4 text-left text-sm transition-colors",
              permitir
                ? "border-brand bg-brand-soft text-brand-dark"
                : "border-line bg-surface text-muted",
            )}
          >
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full",
                permitir ? "bg-brand text-white" : "bg-canvas text-faint",
              )}
            >
              <Navigation size={17} />
            </span>
            <span className="flex-1">
              <span className="block font-semibold">
                Usar minha localização atual
              </span>
              <span className="block text-xs opacity-80">
                Para mostrar as feiras mais próximas
              </span>
            </span>
            <span
              className={cn(
                "h-6 w-10 rounded-full p-0.5 transition-colors",
                permitir ? "bg-brand" : "bg-line",
              )}
            >
              <span
                className={cn(
                  "block h-5 w-5 rounded-full bg-white transition-transform",
                  permitir && "translate-x-4",
                )}
              />
            </span>
          </button>

          <button
            type="button"
            onClick={entrar}
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand px-5 py-4 text-base font-semibold text-white shadow-card transition-colors hover:bg-brand-dark"
          >
            Entrar <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
