import { cn } from "@/lib/cn";

/** Logomarca do Feiraê: uma lupa com uma barraca de feira na lente.
 *  Conceito tirado do fluxo no Figma (ícone de lupa + marca). */
export function LogoMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* cabo da lupa */}
      <rect
        x="33.5"
        y="33.5"
        width="7"
        height="15"
        rx="3.5"
        transform="rotate(-45 33.5 33.5)"
        fill="currentColor"
      />
      {/* lente */}
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="var(--color-brand-soft, #e7f3ea)"
        stroke="currentColor"
        strokeWidth="4"
      />
      {/* toldo listrado da barraca */}
      <path
        d="M11 17.5c1.6 0 1.6 1.6 3.2 1.6s1.6-1.6 3.2-1.6 1.6 1.6 3.2 1.6 1.6-1.6 3.2-1.6 1.6 1.6 3.2 1.6V15.2a2 2 0 0 0-2-2H13a2 2 0 0 0-2 2z"
        fill="currentColor"
      />
      {/* corpo da barraca */}
      <path
        d="M13 19.2v8.3c0 .7.6 1.3 1.3 1.3h11.4c.7 0 1.3-.6 1.3-1.3v-8.3"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  size = 40,
  className,
  showWord = true,
}: {
  size?: number;
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-brand", className)}>
      <LogoMark size={size} />
      {showWord && (
        <span
          className="font-semibold tracking-tight text-ink"
          style={{ fontSize: size * 0.62 }}
        >
          Feira<span className="text-brand">ê</span>
        </span>
      )}
    </span>
  );
}
