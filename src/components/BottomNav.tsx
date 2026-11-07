"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/cn";

const ITENS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/descobrir", label: "Descobrir", icon: Compass },
  { href: "/salvos", label: "Salvos", icon: Bookmark },
  { href: "/perfil", label: "Perfil", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md lg:hidden">
      <div className="mx-3 mb-3 flex items-center justify-around rounded-[1.75rem] border border-line bg-surface/95 px-2 py-2 shadow-card backdrop-blur">
        {ITENS.map(({ href, label, icon: Icon }) => {
          const ativo =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={ativo ? "page" : undefined}
              className="flex min-w-16 flex-col items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-brand"
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-2xl transition-colors",
                  ativo ? "bg-brand text-white" : "text-brand",
                )}
              >
                <Icon size={20} strokeWidth={2} />
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
