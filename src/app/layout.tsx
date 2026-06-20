import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Palma da Mao",
    template: "%s | Palma da Mao"
  },
  description: "As melhores empresas da sua cidade em um so lugar.",
  applicationName: "Palma da Mao",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Palma da Mao"
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
  },
  openGraph: {
    title: "Palma da Mao",
    description: "As melhores empresas da sua cidade em um so lugar.",
    url: "/montividiu",
    siteName: "Palma da Mao",
    locale: "pt_BR",
    type: "website"
  }
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
