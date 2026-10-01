// src/components/derivation/DerivationStepItem.tsx
'use client';

import React, { useState } from 'react';
import { DerivationStep } from '@/types/curriculum';
import { LatexRenderer, FormattedMathText } from '@/components/math/LatexRenderer';
import { ChevronDown, ChevronUp, Lightbulb, Wrench, AlertTriangle } from 'lucide-react';

interface DerivationStepItemProps {
  step: DerivationStep;
  totalSteps: number;
}

export const DerivationStepItem: React.FC<DerivationStepItemProps> = ({ step, totalSteps }) => {
  const [showIntuition, setShowIntuition] = useState(false);
  const [showMathOp, setShowMathOp] = useState(false);

  return (
    <div
      className={`relative pl-6 pb-6 border-l-2 transition-all duration-200 ${
        step.isCrucialLeap
          ? 'border-purple-500/60 bg-purple-950/10'
          : 'border-slate-800 hover:border-slate-700'
      } ${step.stepNumber === totalSteps ? 'border-transparent pb-0' : ''}`}
    >
      {/* Step Circle Badge */}
      <div
        className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
          step.isCrucialLeap
            ? 'bg-purple-950 text-purple-300 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
            : 'bg-zinc-900 text-slate-300 border-slate-700'
        }`}
      >
        {step.stepNumber}
      </div>

      <div className="space-y-2">
        {/* Step Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm md:text-base font-medium text-slate-200 flex items-center gap-2">
            <span>{step.titleTh}</span>
            {step.isCrucialLeap && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <AlertTriangle className="w-3 h-3" />
                จุดสังเกตสำคัญ
              </span>
            )}
          </h4>
        </div>

        {/* Latex Display Block */}
        <div className="my-1.5">
          <LatexRenderer math={step.latexMath} displayMode={true} />
        </div>

        {/* Action Toggles */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setShowIntuition(!showIntuition)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
              showIntuition
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-zinc-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-zinc-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-sky-400" />
            <span>ทำไมต้องก้าวนี้? (Physical Intuition)</span>
            {showIntuition ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {step.mathOperationTh && (
            <button
              onClick={() => setShowMathOp(!showMathOp)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                showMathOp
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-zinc-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-zinc-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-purple-400" />
              <span>เทคนิคแคลคูลัส (Math Operation)</span>
              {showMathOp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* Intuition Box */}
        {showIntuition && (
          <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-800/40 text-xs md:text-sm text-sky-200 animate-in fade-in duration-150">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sky-300 mb-1">เหตุผลทางฟิสิกส์เบื้องหลังคณิตศาสตร์:</p>
                <FormattedMathText text={step.physicalIntuitionTh} />
              </div>
            </div>
          </div>
        )}

        {/* Math Op Box */}
        {showMathOp && step.mathOperationTh && (
          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs md:text-sm text-purple-200 animate-in fade-in duration-150">
            <div className="flex items-start gap-2">
              <Wrench className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-300 mb-1">เทคนิคการคำนวณและอินทิเกรต:</p>
                <FormattedMathText text={step.mathOperationTh} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
