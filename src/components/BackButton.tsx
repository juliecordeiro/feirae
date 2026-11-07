"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export function BackButton({
  className,
  fallback = "/",
}: {
  className?: string;
  fallback?: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label="Voltar"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallback);
      }}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-card backdrop-blur",
        className,
      )}
    >
      <ArrowLeft size={20} />
    </button>
  );
}
