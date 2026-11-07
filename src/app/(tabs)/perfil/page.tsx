"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Pencil,
  HelpCircle,
  LogOut,
  UserCog,
  Plus,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/lib/types";

const AVATARES: IconName[] = ["apple", "carrot", "strawberry", "burger"];

const FAQ = [
  {
    q: "Como salvo uma feira?",
    a: "Toque no marcador (ícone de salvar) no canto de qualquer feira, ou use o menu ⋮ na tela de detalhes. Ela vai para a aba Salvos.",
  },
  {
    q: "Os horários são atualizados?",
    a: "Sim. Os horários e o status (aberta, quase encerrando, fechada) são baseados nas informações oficiais das feiras de Curitiba.",
  },
  {
    q: "Como falo com o suporte?",
    a: "Envie um e-mail para suporte@feirae.app ou use o formulário em Ajuda e Suporte. Respondemos em até 48h.",
  },
];

export default function PerfilPage() {
  const {
    perfil,
    setPerfil,
    adicionarEndereco,
    removerEndereco,
  } = useApp();
  const router = useRouter();
  const [editandoNome, setEditandoNome] = useState(false);
  const [nome, setNome] = useState(perfil.nome);
  const [novoEndereco, setNovoEndereco] = useState("");
  const [faqAberta, setFaqAberta] = useState<number | null>(null);

  const salvarNome = () => {
    setPerfil({ nome: nome.trim() || "Visitante" });
    setEditandoNome(false);
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="relative overflow-hidden rounded-card px-5 pb-6 pt-7 text-center text-white shadow-card grad-brand">
        <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-3xl border-2 border-white/70 bg-white/15 backdrop-blur">
          <Icon name={perfil.avatar} size={38} />
        </div>
        <div className="relative mt-3 flex justify-center gap-2.5">
          {AVATARES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setPerfil({ avatar: a })}
              aria-label={`Avatar ${a}`}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur transition",
                perfil.avatar === a && "ring-2 ring-white",
              )}
            >
              <Icon name={a} size={20} />
            </button>
          ))}
        </div>

        <div className="relative mt-4 flex items-center justify-center gap-2">
          {editandoNome ? (
            <>
              <input
                autoFocus
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && salvarNome()}
                className="w-40 rounded-pill bg-white/90 px-4 py-1.5 text-center text-lg font-bold text-ink outline-none"
              />
              <button
                type="button"
                onClick={salvarNome}
                aria-label="Salvar nome"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/20"
              >
                <Check size={16} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">{perfil.nome}</h1>
              <button
                type="button"
                onClick={() => {
                  setNome(perfil.nome);
                  setEditandoNome(true);
                }}
                aria-label="Editar nome"
                className="text-white/90"
              >
                <Pencil size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Localização */}
      <div className="rounded-card border border-line bg-surface p-4 shadow-card">
        <h2 className="mb-3 inline-flex items-center gap-2 font-semibold text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-brand/40 text-brand">
            <MapPin size={15} />
          </span>
          Localização
        </h2>

        <label className="flex items-center justify-between py-1 text-sm text-ink">
          Usar localização atual
          <button
            type="button"
            onClick={() =>
              setPerfil({ usarLocalizacaoAtual: !perfil.usarLocalizacaoAtual })
            }
            aria-pressed={perfil.usarLocalizacaoAtual}
            className={cn(
              "h-6 w-11 rounded-full p-0.5 transition-colors",
              perfil.usarLocalizacaoAtual ? "bg-brand" : "bg-line",
            )}
          >
            <span
              className={cn(
                "block h-5 w-5 rounded-full bg-white transition-transform",
                perfil.usarLocalizacaoAtual && "translate-x-5",
              )}
            />
          </button>
        </label>

        <div className="mt-2 space-y-2">
          {perfil.enderecos.map((e) => (
            <div
              key={e}
              className="flex items-center justify-between rounded-pill bg-canvas px-4 py-2.5 text-sm text-ink"
            >
              {e}
              <button
                type="button"
                onClick={() => removerEndereco(e)}
                aria-label={`Remover ${e}`}
                className="text-accent"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <input
              value={novoEndereco}
              onChange={(e) => setNovoEndereco(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  adicionarEndereco(novoEndereco);
                  setNovoEndereco("");
                }
              }}
              placeholder="Adicionar endereço"
              className="flex-1 rounded-pill border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
            <button
              type="button"
              onClick={() => {
                adicionarEndereco(novoEndereco);
                setNovoEndereco("");
              }}
              aria-label="Adicionar endereço"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-brand/40 text-brand"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Ajuda e suporte */}
      <div className="rounded-card border border-line bg-surface p-4 shadow-card">
        <h2 className="mb-2 inline-flex items-center gap-2 font-semibold text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-brand/40 text-brand">
            <HelpCircle size={15} />
          </span>
          Ajuda e suporte
        </h2>
        {FAQ.map((item, i) => (
          <div key={item.q} className="border-t border-line first:border-t-0">
            <button
              type="button"
              onClick={() => setFaqAberta(faqAberta === i ? null : i)}
              className="flex w-full items-center justify-between gap-2 py-3 text-left text-sm font-medium text-brand-dark"
            >
              {item.q}
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-faint transition-transform",
                  faqAberta === i && "rotate-180",
                )}
              />
            </button>
            {faqAberta === i && (
              <p className="pb-3 text-sm text-muted">{item.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* Ações */}
      <div className="flex gap-3">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-card border border-line bg-surface py-3.5 text-sm font-semibold text-ink shadow-card"
        >
          <UserCog size={18} className="text-brand" /> Alterar conta
        </button>
        <button
          type="button"
          onClick={() => {
            setPerfil({ nome: "Visitante", avatar: "carrot" });
            router.push("/entrar");
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-card bg-accent py-3.5 text-sm font-semibold text-white shadow-card"
        >
          <LogOut size={18} /> Sair
        </button>
      </div>
    </div>
  );
}
