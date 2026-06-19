import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Palma da Mão",
  description: "As melhores empresas da sua cidade em um só lugar.",
  applicationName: "Palma da Mão",
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#0069FC",
  width: "device-width",
  initialScale: 1
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
