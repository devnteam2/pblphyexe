import type { Metadata, Viewport } from "next";
import { Noto_Serif_Thai } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

const notoSerifThai = Noto_Serif_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-noto-serif-thai",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "OpenPOSN — สอวน. ฟิสิกส์ เพื่อทุกคน (Academic Monograph & First Principles)",
  description: "An open-access academic physics monograph and first-principles calculus derivation engine for the Thailand POSN Physics Olympiad.",
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: `${basePath}/icon.svg`,
    apple: `${basePath}/icon.svg`,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OpenPOSN",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${notoSerifThai.variable}`}>
      <head>
        <link
          rel="preload"
          href={`${basePath}/fonts/KaTeX_Main-Regular.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${basePath}/fonts/KaTeX_Math-Italic.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col font-serif antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
