// src/components/interactive/SoundDopplerLab.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

type SoundMode = 'doppler' | 'pipe';
type PipeKind = 'open' | 'closed';

interface WaveRing {
  cx: number;
  cy: number;
  r: number;
}

const V_SOUND = 340; // m/s

export const SoundDopplerLab: React.FC = () => {
  const [mode, setMode] = useState<SoundMode>('doppler');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Mode 1: Doppler + Mach Cone
  const [machSrc, setMachSrc] = useState<number>(0.45);
  const [vObs, setVObs] = useState<number>(0); // + toward source, - away from source
  const [baseFreq, setBaseFreq] = useState<number>(440);
  const [soundOn, setSoundOn] = useState<boolean>(false);

  const [dopplerSnap, setDopplerSnap] = useState<{ srcX: number; rings: WaveRing[] }>({
    srcX: 80,
    rings: [],
  });
  const dopplerRef = useRef<{ srcX: number; emitAcc: number; rings: WaveRing[] }>({
    srcX: 80,
    emitAcc: 0,
    rings: [],
  });

  // Web Audio refs (STRICTLY created only on explicit button click, OFF by default)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Mode 2: Air Resonance Pipe
  const [pipeKind, setPipeKind] = useState<PipeKind>('open');
  const [harmonicN, setHarmonicN] = useState<number>(1);
  const [pipeLenM, setPipeLenM] = useState<number>(0.85);
  const [pipeTime, setPipeTime] = useState<number>(0);

  const vSrc = machSrc * V_SOUND;
  const fApproach =
    machSrc < 0.99
      ? baseFreq * ((V_SOUND + vObs) / (V_SOUND - vSrc))
      : 9999;
  const fRecede = baseFreq * (Math.max(10, V_SOUND - vObs) / (V_SOUND + vSrc));
  const observerX = 390;

  const stopAudio = () => {
    try {
      oscRef.current?.stop();
      oscRef.current?.disconnect();
    } catch {
      // Ignore already stopped
    }
    oscRef.current = null;
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      void audioCtxRef.current.close();
    }
    audioCtxRef.current = null;
    gainRef.current = null;
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const toggleSound = () => {
    if (soundOn) {
      stopAudio();
      setSoundOn(false);
      return;
    }
    if (typeof window === 'undefined') return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = Math.min(1800, fApproach);
    gain.gain.value = 0.04;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    audioCtxRef.current = ctx;
    oscRef.current = osc;
    gainRef.current = gain;
    setSoundOn(true);
  };

  const dopplerParamsRef = useRef({ machSrc, baseFreq, fApproach, fRecede, soundOn });
  useEffect(() => {
    dopplerParamsRef.current = { machSrc, baseFreq, fApproach, fRecede, soundOn };
  }, [machSrc, baseFreq, fApproach, fRecede, soundOn]);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.035, (now - prevTs) / 1000);
      prevTs = now;

      if (mode === 'doppler') {
        const dp = dopplerParamsRef.current;
        const cur = dopplerRef.current;
        const wavePxPerSec = 78;
        const srcPxPerSec = dp.machSrc * wavePxPerSec;

        let nextX = cur.srcX + srcPxPerSec * dt;
        let nextRings = cur.rings
          .map((ring) => ({ ...ring, r: ring.r + wavePxPerSec * dt }))
          .filter((ring) => ring.r < 340);

        if (nextX > 445) {
          nextX = 48;
          nextRings = [];
        }

        cur.emitAcc += dt;
        if (cur.emitAcc >= 0.24) {
          cur.emitAcc = 0;
          nextRings.push({ cx: nextX, cy: 110, r: 2 });
        }

        // Smooth siren frequency transition as source passes observer
        if (dp.soundOn && oscRef.current && audioCtxRef.current) {
          const targetF = nextX < observerX ? Math.min(1800, dp.fApproach) : Math.max(120, dp.fRecede);
          oscRef.current.frequency.setTargetAtTime(targetF, audioCtxRef.current.currentTime, 0.04);
        }

        cur.srcX = nextX;
        cur.rings = nextRings;
        setDopplerSnap({ srcX: nextX, rings: nextRings });
      } else {
        setPipeTime((t) => t + dt * 5.0);
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, mode]);

  const applyMachPreset = (m: number) => {
    setMachSrc(m);
    dopplerRef.current = { srcX: m === 0 ? 225 : 64, emitAcc: 0, rings: [] };
    setDopplerSnap({ srcX: m === 0 ? 225 : 64, rings: [] });
  };

  // Closed pipe only supports odd harmonics n = 1, 3, 5, 7
  const validHarmonics = pipeKind === 'open' ? [1, 2, 3, 4] : [1, 3, 5, 7];
  const effectiveN = validHarmonics.includes(harmonicN) ? harmonicN : validHarmonics[0];
  const lambdaPipe = pipeKind === 'open' ? (2 * pipeLenM) / effectiveN : (4 * pipeLenM) / effectiveN;
  const freqPipe = V_SOUND / lambdaPipe;

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Volume2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>ห้องทดลองเสียง ปรากฏการณ์ดอปเพลอร์ &amp; ท่อเรโซแนนซ์</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          {mode === 'doppler' && (
            <button
              type="button"
              onClick={toggleSound}
              className={`min-h-[34px] px-2.5 py-1 rounded border inline-flex items-center gap-1 ${
                soundOn
                  ? 'bg-emerald-600 text-white border-emerald-700 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-primary)] border-[var(--hairline-border)]'
              }`}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundOn ? 'ปิดเสียงไซเรน' : 'ลองเปิดเสียงไซเรน'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="min-h-[34px] px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] inline-flex items-center gap-1"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'พัก' : 'เล่น'}</span>
          </button>
        </div>
      </div>

      {/* Mode Switch */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => setMode('doppler')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'doppler'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          1. ดอปเพลอร์ &amp; กรวยเสียงโซนิกบูม (Mach)
        </button>
        <button
          type="button"
          onClick={() => {
            if (soundOn) {
              stopAudio();
              setSoundOn(false);
            }
            setMode('pipe');
          }}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'pipe'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          2. คลื่นนิ่งในท่อปลายเปิด / ปลายปิด
        </button>
      </div>

      {/* SVG Canvas */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        {mode === 'doppler' ? (
          <>
            {/* Wavefront Rings */}
            {dopplerSnap.rings.map((ring, idx) => (
              <circle
                key={idx}
                cx={ring.cx}
                cy={ring.cy}
                r={ring.r}
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.4"
                opacity={Math.max(0.1, 0.85 - ring.r / 360)}
              />
            ))}

            {/* Supersonic Mach Cone cleanly bounded inside canvas */}
            {machSrc > 1.02 && (() => {
              const sinTheta = 1 / machSrc;
              const tanTheta = sinTheta / Math.sqrt(Math.max(0.01, 1 - sinTheta * sinTheta));
              const maxDyTop = 110 - 48; // keep clear of top HUD
              const maxDyBot = 186 - 110; // keep clear of bottom label
              const maxDxFromCone = Math.min(maxDyTop, maxDyBot) / Math.max(0.1, tanTheta);
              const backX = Math.max(12, dopplerSnap.srcX - Math.min(180, maxDxFromCone));
              const spreadY = (dopplerSnap.srcX - backX) * tanTheta;
              const machAngleDeg = (Math.asin(sinTheta) * 180) / Math.PI;
              return (
                <>
                  <line x1={dopplerSnap.srcX} y1="110" x2={backX} y2={110 - spreadY} stroke="#d97706" strokeWidth="2.4" strokeDasharray="5 3" />
                  <line x1={dopplerSnap.srcX} y1="110" x2={backX} y2={110 + spreadY} stroke="#d97706" strokeWidth="2.4" strokeDasharray="5 3" />
                  <rect x="8" y="191" width="320" height="20" rx="4" fill="var(--surface-card)" fillOpacity="0.9" />
                  <text x="14" y="205" fontSize="9.5" fill="#d97706" fontFamily="monospace" fontWeight="bold">
                    กรวยโซนิกบูม! มุมกรวย θ = arcsin(1/M) = {machAngleDeg.toFixed(1)}°
                  </text>
                </>
              );
            })()}

            {/* Observer on right */}
            <circle cx={observerX} cy="110" r="8" fill="#16a34a" stroke="white" strokeWidth="1.5" />
            <text x={observerX} y="130" fontSize="9" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
              ผู้ฟัง (O)
            </text>

            {/* Moving Sound Source */}
            <circle cx={dopplerSnap.srcX} cy="110" r="9" fill="#dc2626" stroke="white" strokeWidth="1.8" />
            <text x={dopplerSnap.srcX} y="96" fontSize="9" textAnchor="middle" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
              S ({machSrc.toFixed(2)}M)
            </text>

            {/* HUD Top with subtle card backdrop */}
            <rect x="8" y="8" width="265" height="36" rx="5" fill="var(--surface-card)" fillOpacity="0.9" />
            <text x="14" y="22" fontSize="9.5" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              ด้านหน้าคลื่นบีบอัด (f&apos; สูง): {machSrc >= 0.99 ? '∞ โซนิกบูม!' : `${fApproach.toFixed(0)} Hz`}
            </text>
            <text x="14" y="37" fontSize="9.5" fill="var(--ink-secondary)" fontFamily="monospace" fontWeight="bold">
              ด้านหลังคลื่นยืดออก (f&apos; ต่ำ): {fRecede.toFixed(0)} Hz
            </text>
          </>
        ) : (
          <>
            {/* Air Resonance Tube */}
            {(() => {
              const xL = 70;
              const xR = 390;
              const lenPx = xR - xL;
              const yTop = 58;
              const yBot = 158;
              const yMid = 108;

              const env = (sign: 1 | -1) =>
                Array.from({ length: 81 }, (_, i) => {
                  const u = i / 80; // 0..1 along pipe
                  const disp =
                    pipeKind === 'open'
                      ? Math.cos(effectiveN * Math.PI * u)
                      : Math.sin((effectiveN * Math.PI * u) / 2);
                  const px = xL + u * lenPx;
                  const py = yMid - sign * disp * Math.cos(pipeTime) * 34;
                  return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
                }).join(' ');

              return (
                <>
                  <rect x={xL} y={yTop} width={lenPx} height={yBot - yTop} fill="rgba(14, 165, 233, 0.06)" />
                  <line x1={xL} y1={yTop} x2={xR} y2={yTop} stroke="var(--ink-primary)" strokeWidth="3" />
                  <line x1={xL} y1={yBot} x2={xR} y2={yBot} stroke="var(--ink-primary)" strokeWidth="3" />
                  {/* Left cap if closed pipe */}
                  {pipeKind === 'closed' && (
                    <line x1={xL} y1={yTop - 2} x2={xL} y2={yBot + 2} stroke="var(--ink-primary)" strokeWidth="5" />
                  )}

                  {/* Standing wave displacement envelope */}
                  <path d={env(1)} fill="none" stroke="#0284c7" strokeWidth="2.4" />
                  <path d={env(-1)} fill="none" stroke="#d97706" strokeWidth="1.8" strokeDasharray="4 2" />

                  {/* Vibrating air molecules inside tube */}
                  {Array.from({ length: 17 }, (_, idx) => {
                    const u = (idx + 0.5) / 17;
                    const amp =
                      pipeKind === 'open'
                        ? Math.cos(effectiveN * Math.PI * u)
                        : Math.sin((effectiveN * Math.PI * u) / 2);
                    const shiftX = amp * Math.cos(pipeTime) * 14;
                    return (
                      <circle
                        key={idx}
                        cx={xL + u * lenPx + shiftX}
                        cy={yMid}
                        r="3.2"
                        fill="#0284c7"
                        opacity="0.7"
                      />
                    );
                  })}

                  <text x="230" y="34" fontSize="10.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    {pipeKind === 'open' ? 'ท่อปลายเปิด 2 ข้าง (Antinode-Antinode)' : 'ท่อปลายปิด 1 ข้าง (Node-Antinode)'}
                  </text>
                  <text x="230" y="186" fontSize="10" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
                    ฮาร์มอนิก n = {effectiveN} • λ = {lambdaPipe.toFixed(2)} m • ความถี่ f = {freqPipe.toFixed(0)} Hz
                  </text>
                </>
              );
            })()}
          </>
        )}
      </svg>

      {/* Controls */}
      {mode === 'doppler' ? (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
            {[
              { label: 'แหล่งนิ่ง (0 Mach)', m: 0 },
              { label: 'รถฉุกเฉิน (0.45 M)', m: 0.45 },
              { label: 'กำแพงเสียง (1.0 M)', m: 1.0 },
              { label: 'เครื่องบินรบ (1.4 M)', m: 1.4 },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyMachPreset(p.m)}
                className={`min-h-[34px] px-2 py-1 rounded border ${
                  Math.abs(machSrc - p.m) < 0.04
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>อัตราเร็วแหล่งกำเนิด v_S</span>
                <strong className="text-[var(--ink-primary)]">{machSrc.toFixed(2)} Mach ({vSrc.toFixed(0)} m/s)</strong>
              </div>
              <input type="range" min={0} max={1.5} step={0.05} value={machSrc} onChange={(e) => setMachSrc(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ผู้ฟังเดิน v_O</span>
                <strong className="text-[var(--ink-primary)]">{vObs} m/s</strong>
              </div>
              <input type="range" min={-80} max={80} step={5} value={vObs} onChange={(e) => setVObs(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความถี่ต้นกำเนิด f₀</span>
                <strong className="text-[var(--ink-primary)]">{baseFreq} Hz</strong>
              </div>
              <input type="range" min={300} max={800} step={20} value={baseFreq} onChange={(e) => setBaseFreq(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => applyMachPreset(machSrc)}
              className="text-[11px] font-mono inline-flex items-center gap-1 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
            >
              <RotateCcw className="w-3 h-3" /> ปล่อยแหล่งกำเนิดวิ่งจากซ้ายใหม่
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden font-mono text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setPipeKind('open');
                  setHarmonicN(1);
                }}
                className={`px-2.5 py-1 ${pipeKind === 'open' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
              >
                ท่อปลายเปิด (f_n = nv/2L)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPipeKind('closed');
                  setHarmonicN(1);
                }}
                className={`px-2.5 py-1 border-l border-[var(--hairline-border)] ${pipeKind === 'closed' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
              >
                ท่อปลายปิด 1 ข้าง (คี่เท่านั้น!)
              </button>
            </div>

            <div className="flex items-center gap-1 font-mono text-[11px]">
              {validHarmonics.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setHarmonicN(n)}
                  className={`px-2 py-1 rounded border ${
                    effectiveN === n
                      ? 'bg-sky-600 text-white border-sky-700 font-bold'
                      : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                  }`}
                >
                  n={n}
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ความยาวท่อ L</span>
              <strong className="text-[var(--ink-primary)]">{pipeLenM.toFixed(2)} m</strong>
            </div>
            <input type="range" min={0.25} max={2.0} step={0.05} value={pipeLenM} onChange={(e) => setPipeLenM(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>
      )}

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'สูตรดอปเพลอร์: $f\' = f_0\\left(\\frac{v \\pm v_O}{v \\mp v_S}\\right)$ — สังเกตหน้าคลื่นสีน้ำเงินอัดตัวชิดกันฝั่งหน้ารถทำให้เสียงแหลมขึ้น แต่เมื่อ $v_S > v_{\\text{เสียง}}$ คลื่นซ้อนเป็น **กรวยโซนิกบูม** มุม $\\sin\\theta = \\frac{1}{\\text{Mach}}$ ส่วนท่อปลายปิด 1 ข้างเกิดได้เฉพาะ **ฮาร์มอนิกเลขคี่ ($n=1,3,5,\\dots$)**!'}
        />
      </div>
    </div>
  );
};
