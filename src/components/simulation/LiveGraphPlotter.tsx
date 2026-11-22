// src/components/simulation/LiveGraphPlotter.tsx
'use client';

import React, { useRef, useEffect } from 'react';

export interface DataSeries {
  id: string;
  label: string;
  color: string;
  unit: string;
  values: { time: number; value: number }[];
}

interface LiveGraphPlotterProps {
  series: DataSeries[];
  title: string;
  height?: number;
  timeWindowSeconds?: number;
  className?: string;
  syncTime?: number;
}

export const LiveGraphPlotter: React.FC<LiveGraphPlotterProps> = ({
  series,
  title,
  height = 160,
  timeWindowSeconds = 8,
  className = '',
  syncTime,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = height;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Styling constants
    const isDark = document.documentElement.classList.contains('theme-blackboard') ||
      document.body.classList.contains('theme-blackboard') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const bgColor = isDark ? '#141720' : '#FFFFFF';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    const textColor = isDark ? '#94A3B8' : '#78716C';
    const axisColor = isDark ? '#334155' : '#D6D3D1';

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const padding = { top: 22, right: 16, bottom: 24, left: 45 };
    const plotWidth = displayWidth - padding.left - padding.right;
    const plotHeight = displayHeight - padding.top - padding.bottom;

    if (plotWidth <= 0 || plotHeight <= 0) {
      ctx.restore();
      return;
    }

    // Determine time range
    let maxTime = syncTime !== undefined ? syncTime : 0;
    series.forEach((s) => {
      if (s.values.length > 0) {
        const lastT = s.values[s.values.length - 1].time;
        if (lastT > maxTime) maxTime = lastT;
      }
    });

    const minTime = Math.max(0, maxTime - timeWindowSeconds);
    const timeSpan = Math.max(1, maxTime - minTime);

    // Determine value range (min, max) across visible values
    let minVal = 0;
    let maxVal = 0.5;

    let hasData = false;
    series.forEach((s) => {
      s.values.forEach((pt) => {
        if (pt.time >= minTime - 0.5) {
          hasData = true;
          if (pt.value < minVal) minVal = pt.value;
          if (pt.value > maxVal) maxVal = pt.value;
        }
      });
    });

    if (!hasData) {
      minVal = -1;
      maxVal = 1;
    }

    // Add 10% breathing margin
    const rangeSpan = Math.max(0.1, maxVal - minVal);
    const yMargin = rangeSpan * 0.15;
    const yMinPadded = minVal - yMargin;
    const yMaxPadded = maxVal + yMargin;
    const yRange = yMaxPadded - yMinPadded;

    // Draw Grid Lines & Ticks
    ctx.lineWidth = 1;
    ctx.strokeStyle = gridColor;
    ctx.fillStyle = textColor;
    ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    const ySteps = 4;
    for (let i = 0; i <= ySteps; i++) {
      const frac = i / ySteps;
      const yVal = yMinPadded + (1 - frac) * yRange;
      const yPos = padding.top + frac * plotHeight;

      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(displayWidth - padding.right, yPos);
      ctx.stroke();

      ctx.fillText(yVal.toFixed(1), padding.left - 6, yPos);
    }

    // Draw Zero line if in range
    if (yMinPadded < 0 && yMaxPadded > 0) {
      const zeroFrac = (yMaxPadded - 0) / yRange;
      const zeroY = padding.top + zeroFrac * plotHeight;
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(padding.left, zeroY);
      ctx.lineTo(displayWidth - padding.right, zeroY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // X Axis ticks
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const xSteps = 4;
    for (let i = 0; i <= xSteps; i++) {
      const frac = i / xSteps;
      const tVal = minTime + frac * timeSpan;
      const xPos = padding.left + frac * plotWidth;

      ctx.fillText(`${tVal.toFixed(1)}s`, xPos, displayHeight - padding.bottom + 6);
    }

    // Plot Series Data
    series.forEach((s) => {
      const pts = s.values.filter((p) => p.time >= minTime - 0.5);
      if (pts.length < 2) return;

      ctx.lineWidth = 2;
      ctx.strokeStyle = s.color;
      ctx.beginPath();

      let started = false;
      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        const xPos = padding.left + ((pt.time - minTime) / timeSpan) * plotWidth;
        const yFrac = (yMaxPadded - pt.value) / yRange;
        const yPos = padding.top + yFrac * plotHeight;

        if (!started) {
          ctx.moveTo(xPos, yPos);
          started = true;
        } else {
          ctx.lineTo(xPos, yPos);
        }
      }
      ctx.stroke();

      // Draw dot on latest point
      const lastPt = pts[pts.length - 1];
      const lx = padding.left + ((lastPt.time - minTime) / timeSpan) * plotWidth;
      const ly = padding.top + ((yMaxPadded - lastPt.value) / yRange) * plotHeight;

      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Plot Title
    ctx.font = 'bold 11px Computer Modern, serif';
    ctx.fillStyle = isDark ? '#E2E8F0' : '#1C1917';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(title, padding.left, 5);

    ctx.restore();
  }, [series, title, height, timeWindowSeconds, syncTime]);

  return (
    <div className={`rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-3 shadow-2xs ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[var(--hairline-subtle)]">
        <span className="text-xs font-mono font-bold text-[var(--ink-primary)]">
          {title}
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {series.map((s) => {
            const lastVal =
              s.values.length > 0 ? s.values[s.values.length - 1].value.toFixed(2) : '--';
            return (
              <div key={s.id} className="flex items-center gap-1.5 text-[11px] font-mono">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-[var(--ink-secondary)]">{s.label}:</span>
                <span className="font-bold text-[var(--ink-primary)]">
                  {lastVal} {s.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: `${height}px` }}
          className="block"
        />
      </div>
    </div>
  );
};
