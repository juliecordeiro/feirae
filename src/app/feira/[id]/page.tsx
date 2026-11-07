import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Store, Users } from "lucide-react";
import {
  FEIRAS,
  getCategoria,
  getFeira,
  getFeirantesDaFeira,
  SEMANA,
} from "@/lib/data";
import { cn } from "@/lib/cn";
import { BackButton } from "@/components/BackButton";
import { SaveButton } from "@/components/SaveButton";
import { FeiraActions } from "@/components/FeiraActions";
import { StatusBadge } from "@/components/StatusBadge";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { Stars } from "@/components/ui";

export function generateStaticParams() {
  return FEIRAS.map((f) => ({ id: f.id }));
}

export default async function FeiraPage(props: PageProps<"/feira/[id]">) {
  const { id } = await props.params;
  const feira = getFeira(id);
  if (!feira) notFound();

  const feirantes = getFeirantesDaFeira(feira.id);

  return (
    <div className="min-h-dvh">
      <TopNav />

      <div className="mx-auto w-full max-w-md pb-28 lg:max-w-3xl lg:px-6 lg:pb-16 lg:pt-6">
        {/* Hero */}
        <div className="relative h-72 overflow-hidden lg:rounded-card">
          <div
            className="absolute inset-0 bg-brand-tint bg-cover bg-center"
            style={{ backgroundImage: `url(${feira.foto})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />

          <div className="absolute left-4 top-5">
            <BackButton />
          </div>
          <div className="absolute right-4 top-5">
            <SaveButton feiraId={feira.id} />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              <StatusBadge status={feira.status} />
              {feira.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-pill bg-accent px-2 py-0.5 text-[11px] font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{feira.nome}</h1>
            <p className="text-sm text-white/85">
              {feira.bairro} · {feira.cidade}
            </p>
          </div>
        </div>

        <div className="space-y-6 px-4 pt-5 lg:px-0">
          <div className="flex items-center gap-3">
            <Stars nota={feira.nota} avaliacoes={feira.avaliacoes} />
            <span className="text-sm font-medium text-orange">
              {feira.distanciaKm.toFixed(1)} km
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <Store size={14} /> {feira.bancas} bancas
            </span>
          </div>

          <FeiraActions feira={feira} />

          <div className="lg:grid lg:grid-cols-2 lg:gap-6">
            <div className="space-y-6">
              {/* Dias e horário */}
              <div className="rounded-card border border-line bg-surface p-4 shadow-card">
                <h2 className="mb-3 text-sm font-semibold text-faint">
                  Dias e horário
                </h2>
                <div className="mb-3 flex gap-1.5">
                  {SEMANA.map((d) => {
                    const on = feira.dias.includes(d);
                    return (
                      <span
                        key={d}
                        className={cn(
                          "flex-1 rounded-xl py-2 text-center text-xs font-semibold",
                          on ? "bg-brand text-white" : "bg-canvas text-faint",
                        )}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>
                <p className="text-sm text-ink">
                  <span className="font-semibold">Horário:</span>{" "}
                  {feira.horario} · {feira.statusLabel}
                </p>
                <p className="text-sm text-muted">{feira.endereco}</p>
              </div>

              {/* Sobre */}
              <section>
                <h2 className="mb-2 text-lg font-semibold text-ink">
                  Sobre a feira
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {feira.descricao}
                </p>
              </section>

              {/* Prefeitura */}
              <a
                href={feira.prefeituraUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-card border border-line bg-surface p-4 shadow-card"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-brand">
                    <ExternalLink size={18} />
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-ink">
                      Informações oficiais
                    </span>
                    <span className="block text-xs text-muted">
                      Site da Prefeitura de Curitiba
                    </span>
                  </span>
                </span>
                <ExternalLink size={16} className="text-faint" />
              </a>
            </div>

            {/* Comércios presentes */}
            {feirantes.length > 0 && (
              <section className="mt-6 lg:mt-0">
                <h2 className="mb-3 inline-flex items-center gap-2 text-lg font-semibold text-ink">
                  <Users size={19} className="text-brand" /> Comércios presentes
                </h2>
                <div className="space-y-2">
                  {feirantes.map((v) => {
                    const cat = getCategoria(v.categoria);
                    return (
                      <div
                        key={v.id}
                        className="flex items-center gap-3 rounded-card border border-line bg-surface p-3 shadow-card"
                      >
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand-dark">
                          <Icon name={v.icon} size={24} strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-1 font-semibold text-ink">
                            {v.nome}
                          </h3>
                          <p className="line-clamp-1 text-xs text-muted">
                            {cat?.label} · {v.produtos.join(", ")}
                          </p>
                        </div>
                        <Stars nota={v.nota} />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <Link
            href="/descobrir"
            className="block text-center text-sm font-medium text-brand hover:underline"
          >
            Ver outras feiras
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
