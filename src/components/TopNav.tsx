"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Bookmark, User, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";

const ITENS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/descobrir", label: "Descobrir", icon: Compass },
  { href: "/salvos", label: "Salvos", icon: Bookmark },
  { href: "/perfil", label: "Perfil", icon: User },
] as const;

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-line bg-surface/90 backdrop-blur lg:block">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-10 2xl:max-w-[1600px]">
        <Link href="/" className="flex items-center">
          <span className="logo-grad text-2xl font-bold tracking-tight">
            Feiraê
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {ITENS.map(({ href, label, icon: Icon }) => {
            const ativo =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-semibold transition-colors",
                  ativo
                    ? "bg-brand text-white shadow-card"
                    : "text-muted hover:bg-canvas hover:text-ink",
                )}
              >
                <Icon size={18} strokeWidth={ativo ? 2.4 : 2} />
                {label}
              </Link>
            );
          })}
        </nav>

        <Smartphone
          size={20}
          strokeWidth={2}
          className="ml-auto text-muted"
          aria-hidden
        />
      </div>
    </header>
  );
}
