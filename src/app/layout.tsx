import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sarabun } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpenPOSN - สอวน. ฟิสิกส์ เพื่อทุกคน | Calculus Physics Olympiad",
  description: "Interactive physics curriculum & first-principles derivation engine for POSN Physics Olympiad. 100% Free & Open-Access Progressive Web App.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "OpenPOSN",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
    <html
      lang="th"
      className={`dark h-full antialiased bg-black ${plusJakartaSans.variable} ${sarabun.variable}`}
    >
      <body className="min-h-full flex flex-col bg-black text-slate-100 font-sans">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
