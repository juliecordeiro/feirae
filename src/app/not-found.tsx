import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-5 bg-canvas px-6 text-center">
      <Logo size={48} />
      <Icon name="basket" size={56} strokeWidth={1.5} className="text-brand" />
      <h1 className="text-xl font-bold text-ink">Página não encontrada</h1>
      <p className="max-w-xs text-sm text-muted">
        Essa banca não existe por aqui. Que tal voltar e descobrir outras
        feiras?
      </p>
      <Link
        href="/"
        className="rounded-pill bg-brand px-6 py-3 text-sm font-semibold text-white"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
