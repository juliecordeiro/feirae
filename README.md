# Feiraê 🧺

Web app para descobrir **feiras livres**, produtos e **feirantes** perto de você — salvar as favoritas em pastas e traçar a rota até elas. Projeto desenvolvido como **TCC**.

> Construído a partir do **Diagrama de Fluxo de Telas** no Figma: `KLCcIvOqX879ngawOWFPw7`. O Figma define a arquitetura/navegação e a marca (logo de lupa, tipografia Fredoka, verde `#01791A`); as telas foram desenhadas seguindo esse fluxo.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (tokens de marca em `src/app/globals.css`)
- **lucide-react** (ícones)
- Estado local com React Context + `localStorage` (sem backend)

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm start       # servir o build
npm run lint
```

## Telas / rotas

| Rota | Tela |
|------|------|
| `/entrar` | Onboarding / entrada |
| `/` | **Início** — localização, busca, feiras abertas agora, eventos, perto de você |
| `/descobrir` | **Descobrir** — abas Feiras · Eventos · Feirantes |
| `/buscar` | **Buscar** — filtros por categoria e dia da semana, lista/mapa |
| `/feira/[id]` | **Detalhes da feira** — info, comércios, salvar, rota, link prefeitura |
| `/salvos` | **Salvos** — pastas personalizadas, mover, remover, compartilhar |
| `/perfil` | **Perfil** — avatar/nome, localização, ajuda, sair |

## Estrutura

```
src/
├─ app/
│  ├─ (tabs)/         # rotas com barra de navegação inferior (Início, Descobrir, Salvos, Perfil)
│  ├─ buscar/         # busca em tela cheia
│  ├─ feira/[id]/     # detalhes da feira (gera páginas estáticas)
│  ├─ entrar/         # onboarding
│  ├─ layout.tsx      # fonte Fredoka + AppProvider
│  └─ globals.css     # design system (cores, raios, sombras)
├─ components/        # Logo, BottomNav, FairCard, MiniMap, SearchTrigger, sheets, etc.
└─ lib/
   ├─ data.ts         # dados mockados (feiras, feirantes, categorias, eventos)
   ├─ store.tsx       # estado global (salvos/pastas/perfil) + localStorage
   ├─ types.ts
   └─ cn.ts
```

## Observações do Next.js 16

Este projeto usa **Cache Components** (ligado por padrão nesta versão). Valores que dependem da hora atual (`new Date()`) ou de `searchParams` são resolvidos **no cliente** para manter as rotas estáticas — ver `OpenNowBadge.tsx`, `AbertasAgoraCarousel.tsx` e `BuscaView.tsx`.

## Dados

Todos os dados são **mockados** em `src/lib/data.ts` (feiras de São Paulo como exemplo). O mapa é um SVG estilizado próprio, sem dependência de API externa — pode ser trocado por Leaflet/Mapbox futuramente.
