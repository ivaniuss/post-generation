import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Generation — Slide Editor",
  description: "Editor de slides premium para redes sociales",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0e0e10" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
