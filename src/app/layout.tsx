import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Feiraê — descubra as feiras perto de você",
  description:
    "Encontre feiras livres, produtos e feirantes na sua cidade. Salve suas favoritas e trace a rota até elas.",
};

export const viewport: Viewport = {
  themeColor: "#01791a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={fredoka.variable} suppressHydrationWarning>
      {/* suppressHydrationWarning: extensões de navegador (ex.: Bitdefender)
          injetam atributos como bis_skin_checked/bis_register no <body> antes
          do React hidratar, causando mismatch benigno. */}
      <body suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
