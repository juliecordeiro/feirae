"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { IconName, Pasta } from "./types";

interface Perfil {
  nome: string;
  avatar: IconName;
  localizacao: string;
  usarLocalizacaoAtual: boolean;
  enderecos: string[];
}

interface SalvoRef {
  feiraId: string;
  pastaId: string;
}

interface AppState {
  perfil: Perfil;
  pastas: Pasta[];
  salvos: SalvoRef[];
  hidratado: boolean;
}

interface AppContextValue extends AppState {
  setPerfil: (p: Partial<Perfil>) => void;
  adicionarEndereco: (endereco: string) => void;
  removerEndereco: (endereco: string) => void;
  isSalvo: (feiraId: string) => boolean;
  pastaDaFeira: (feiraId: string) => string | undefined;
  toggleSalvo: (feiraId: string, pastaId?: string) => void;
  moverFeira: (feiraId: string, pastaId: string) => void;
  adicionarPasta: (nome: string, icon: IconName) => string;
  removerPasta: (pastaId: string) => void;
}

const PASTA_PADRAO: Pasta = { id: "geral", nome: "Geral", icon: "folder" };

const INICIAL: AppState = {
  perfil: {
    nome: "Vitória",
    avatar: "carrot",
    localizacao: "Batel, Curitiba",
    usarLocalizacaoAtual: true,
    enderecos: ["Batel, Curitiba", "Terminal Boqueirão"],
  },
  pastas: [PASTA_PADRAO],
  salvos: [
    { feiraId: "largo-da-ordem", pastaId: "geral" },
    { feiraId: "gastronomica-batel", pastaId: "geral" },
    { feiraId: "organica-passeio", pastaId: "geral" },
    { feiraId: "noturna-boqueirao", pastaId: "geral" },
  ],
  hidratado: false,
};

const STORAGE_KEY = "feirae:v2";

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(INICIAL);

  // Hidrata do localStorage no cliente. localStorage não existe no SSR, então
  // precisamos sincronizar o estado após a montagem (padrão de hidratação).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppState>;
        setState((s) => ({
          ...s,
          perfil: { ...s.perfil, ...parsed.perfil },
          pastas: parsed.pastas?.length ? parsed.pastas : s.pastas,
          salvos: parsed.salvos ?? s.salvos,
          hidratado: true,
        }));
      } else {
        setState((s) => ({ ...s, hidratado: true }));
      }
    } catch {
      setState((s) => ({ ...s, hidratado: true }));
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persiste
  useEffect(() => {
    if (!state.hidratado) return;
    try {
      const { hidratado, ...rest } = state;
      void hidratado;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch {
      /* ignora quota/privado */
    }
  }, [state]);

  const setPerfil = useCallback((p: Partial<Perfil>) => {
    setState((s) => ({ ...s, perfil: { ...s.perfil, ...p } }));
  }, []);

  const adicionarEndereco = useCallback((endereco: string) => {
    const e = endereco.trim();
    if (!e) return;
    setState((s) =>
      s.perfil.enderecos.includes(e)
        ? s
        : {
            ...s,
            perfil: { ...s.perfil, enderecos: [...s.perfil.enderecos, e] },
          },
    );
  }, []);

  const removerEndereco = useCallback((endereco: string) => {
    setState((s) => ({
      ...s,
      perfil: {
        ...s.perfil,
        enderecos: s.perfil.enderecos.filter((e) => e !== endereco),
      },
    }));
  }, []);

  const isSalvo = useCallback(
    (feiraId: string) => state.salvos.some((x) => x.feiraId === feiraId),
    [state.salvos],
  );

  const pastaDaFeira = useCallback(
    (feiraId: string) =>
      state.salvos.find((x) => x.feiraId === feiraId)?.pastaId,
    [state.salvos],
  );

  const toggleSalvo = useCallback((feiraId: string, pastaId?: string) => {
    setState((s) => {
      const existe = s.salvos.some((x) => x.feiraId === feiraId);
      if (existe) {
        return { ...s, salvos: s.salvos.filter((x) => x.feiraId !== feiraId) };
      }
      return {
        ...s,
        salvos: [
          ...s.salvos,
          { feiraId, pastaId: pastaId ?? PASTA_PADRAO.id },
        ],
      };
    });
  }, []);

  const moverFeira = useCallback((feiraId: string, pastaId: string) => {
    setState((s) => ({
      ...s,
      salvos: s.salvos.map((x) =>
        x.feiraId === feiraId ? { ...x, pastaId } : x,
      ),
    }));
  }, []);

  const adicionarPasta = useCallback((nome: string, icon: IconName) => {
    const id = `pasta-${Date.now().toString(36)}`;
    setState((s) => ({
      ...s,
      pastas: [...s.pastas, { id, nome, icon }],
    }));
    return id;
  }, []);

  const removerPasta = useCallback((pastaId: string) => {
    if (pastaId === PASTA_PADRAO.id) return;
    setState((s) => ({
      ...s,
      pastas: s.pastas.filter((p) => p.id !== pastaId),
      // feiras da pasta removida voltam para Favoritas
      salvos: s.salvos.map((x) =>
        x.pastaId === pastaId ? { ...x, pastaId: PASTA_PADRAO.id } : x,
      ),
    }));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      setPerfil,
      adicionarEndereco,
      removerEndereco,
      isSalvo,
      pastaDaFeira,
      toggleSalvo,
      moverFeira,
      adicionarPasta,
      removerPasta,
    }),
    [
      state,
      setPerfil,
      adicionarEndereco,
      removerEndereco,
      isSalvo,
      pastaDaFeira,
      toggleSalvo,
      moverFeira,
      adicionarPasta,
      removerPasta,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp precisa estar dentro de <AppProvider>");
  return ctx;
}
