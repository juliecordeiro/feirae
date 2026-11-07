import { HomeHero } from "@/components/HomeHero";
import { ActionCard } from "@/components/ActionCard";
import { FeiraPhotoCard } from "@/components/FeiraCards";
import { FEIRAS } from "@/lib/data";

export default function InicioPage() {
  return (
    <div className="space-y-6">
      <HomeHero />

      {/* Grade de ações */}
      <div className="grid grid-cols-2 gap-3">
        <ActionCard
          href="/descobrir"
          title="Descobrir"
          subtitle="Feiras abertas agora"
          icon="sprout"
          color="brand"
        />
        <ActionCard
          href="/eventos"
          title="Eventos"
          subtitle="Festivais e celebrações"
          icon="calendar"
          color="accent"
        />
        <ActionCard
          href="/buscar"
          title="Buscar"
          subtitle="Feiras, produtos e categorias"
          icon="search"
          color="accent"
        />
        <ActionCard
          href="/feirantes"
          title="Feirantes"
          subtitle="Encontre quem vende o que você procura"
          icon="store"
          color="brand"
        />
      </div>

      {/* Feiras para você */}
      <section>
        <h2 className="text-xl font-bold tracking-tight text-ink">
          Feiras para você
        </h2>
        <p className="text-sm text-muted">
          Deslize → para salvar, ← para descartar. Toque duas vezes para curtir.
        </p>
        <div className="mt-3 space-y-4 lg:space-y-5">
          {FEIRAS.map((f) => (
            <FeiraPhotoCard key={f.id} feira={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
