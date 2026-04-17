import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { DM_Sans, Syne } from "next/font/google";

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portal RPD",
  description: "Website moderno com área de conteudistas e formulários digitais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <body>
        <div className="app-shell">
          <div className="app-bg" aria-hidden="true">
            <div className="orb orb--a" />
            <div className="orb orb--b" />
            <div className="orb orb--c" />
          </div>
          <div className="app-overlay" aria-hidden="true" />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
