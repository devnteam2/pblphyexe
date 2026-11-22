// src/components/pwa/ServiceWorkerRegister.tsx
'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function ServiceWorkerRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const swPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sw.js`;
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(swPath).catch((err) => {
          console.warn('Service worker registration failed:', err);
        });
      });

      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowInstallBanner(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstallBanner) return null;

  return (
    <aside
      aria-label="ติดตั้งแอปพลิเคชัน"
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-50 p-4 rounded-xl border border-sky-500/40 bg-zinc-950/95 backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">ติดตั้ง OpenPOSN (PWA)</h4>
            <p className="text-[11px] text-slate-300">
              อ่านเนื้อหาและสูตรแคลคูลัสได้แบบออฟไลน์ 100% โดยไม่ต้องใช้อินเทอร์เน็ต
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowInstallBanner(false)}
          className="text-slate-400 hover:text-white p-1"
          aria-label="ปิดการแจ้งเตือน"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={() => setShowInstallBanner(false)}
          className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
        >
          ไว้คราวหน้า
        </button>
        <button
          onClick={handleInstall}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-500 text-black hover:bg-sky-400 shadow-md transition-colors"
        >
          ติดตั้งลงหน้าจอโฮม
        </button>
      </div>
    </aside>
  );
}
