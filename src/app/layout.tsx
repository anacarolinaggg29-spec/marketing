import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "SUPER MKT - Studio de Marketing Juridico",
  description:
    "Painel operacional para producao de roteiros, legendas, imagens e motion prompts com foco em comunicacao juridica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans h-screen overflow-hidden bg-[var(--background)]`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex min-h-0 flex-1 flex-col">
            <MobileNav />
            <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
