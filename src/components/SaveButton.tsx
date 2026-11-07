"use client";

import { Bookmark } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/cn";

export function SaveButton({
  feiraId,
  variant = "icon",
  className,
}: {
  feiraId: string;
  variant?: "icon" | "full";
  className?: string;
}) {
  const { isSalvo, toggleSalvo } = useApp();
  const salvo = isSalvo(feiraId);

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggleSalvo(feiraId)}
        aria-pressed={salvo}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-semibold transition-colors",
          salvo
            ? "bg-brand-soft text-brand-dark"
            : "bg-brand text-white hover:bg-brand-dark",
          className,
        )}
      >
        <Bookmark size={18} className={cn(salvo && "fill-current")} />
        {salvo ? "Salva" : "Salvar feira"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSalvo(feiraId);
      }}
      aria-label={salvo ? "Remover dos salvos" : "Salvar feira"}
      aria-pressed={salvo}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border transition-colors",
        salvo
          ? "border-brand bg-brand text-white"
          : "border-line bg-surface/90 text-muted backdrop-blur hover:text-brand",
        className,
      )}
    >
      <Bookmark size={17} className={cn(salvo && "fill-current")} />
    </button>
  );
}
