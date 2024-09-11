import type { Metadata } from "next";
import { ReactNode } from "react";
import "./global.scss";

export const metadata: Metadata = {
  title: "GasaPizza - O melhor sistema de pizzaria",
  description: "Sistema de pedidos para pizzaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
