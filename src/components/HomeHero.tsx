"use client";

import { MapPin } from "lucide-react";
import { useApp } from "@/lib/store";
import { GradientHeader } from "./GradientHeader";

export function HomeHero() {
  const { perfil } = useApp();
  return (
    <GradientHeader className="pb-7">
      <span className="relative inline-flex items-center gap-1 rounded-pill bg-black/20 px-3 py-1 text-xs font-medium backdrop-blur">
        <MapPin size={13} /> {perfil.localizacao}
      </span>
      <h1 className="relative mt-3 text-4xl font-bold tracking-tight">Feiraê</h1>
      <p className="relative mt-0.5 text-white/90">
        Onde cada descoberta vira encontro.
      </p>
    </GradientHeader>
  );
}
