import type { NextConfig } from "next";

// Caminho base para o GitHub Pages (ex.: "/feirae"). Definido pelo workflow
// de deploy; vazio no desenvolvimento local para rodar em "/".
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Exportação estática para hospedar no GitHub Pages
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
