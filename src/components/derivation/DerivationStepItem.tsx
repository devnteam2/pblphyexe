// src/components/derivation/DerivationStepItem.tsx
'use client';

import React, { useState } from 'react';
import { DerivationStep } from '@/types/curriculum';
import { LatexRenderer, FormattedMathText } from '@/components/math/LatexRenderer';
import { ChevronDown, ChevronUp, AlertCircle, Info, Calculator } from 'lucide-react';

interface DerivationStepItemProps {
  step: DerivationStep;
  totalSteps: number;
}

export const DerivationStepItem: React.FC<DerivationStepItemProps> = ({ step, totalSteps }) => {
  const [showIntuition, setShowIntuition] = useState(false);
  const [showMathOp, setShowMathOp] = useState(false);

  return (
    <div
      className={`relative pl-7 pb-6 border-l transition-all ${
        step.isCrucialLeap
          ? 'border-amber-600/70 dark:border-amber-500/70 bg-amber-50/20 dark:bg-amber-950/10'
          : 'border-stone-300 dark:border-stone-800'
      } ${step.stepNumber === totalSteps ? 'border-transparent pb-0' : ''}`}
    >
      {/* Formal TeX Step Marker */}
      <div
        className={`absolute -left-[14px] top-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-colors ${
          step.isCrucialLeap
            ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-600 dark:border-amber-500 shadow-2xs'
            : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-400 dark:border-stone-700'
        }`}
      >
        {step.stepNumber}
      </div>

      <div className="space-y-2">
        {/* Step Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-serif font-bold text-[var(--ink-primary)] flex items-center gap-2">
            <span>{step.titleTh}</span>
            {step.isCrucialLeap && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                <AlertCircle className="w-3 h-3" />
                จุดสังเกตสำคัญ (Crucial Leap)
              </span>
            )}
          </h4>
        </div>

        {/* Latex Display Block with Academic Paper background */}
        <div className="my-2">
          <LatexRenderer
            math={step.latexMath}
            displayMode={true}
            className="border-stone-300 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/80 text-[var(--ink-primary)] shadow-2xs"
          />
        </div>

        {/* Action Toggles */}
        <div className="flex flex-wrap gap-2 pt-1 font-serif text-xs">
          <button
            onClick={() => setShowIntuition(!showIntuition)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all ${
              showIntuition
                ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-400 dark:border-stone-600 font-medium'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-stone-500" />
            <span>Physical Intuition (ทำไมต้องขั้นตอนนี้?)</span>
            {showIntuition ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {step.mathOperationTh && (
            <button
              onClick={() => setShowMathOp(!showMathOp)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all ${
                showMathOp
                  ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-400 dark:border-stone-600 font-medium'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-stone-500" />
              <span>Calculus Technique (เทคนิคการอินทิเกรต)</span>
              {showMathOp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* Intuition Box */}
        {showIntuition && (
          <div className="p-3.5 rounded border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 text-xs md:text-sm text-stone-700 dark:text-stone-300 font-serif leading-relaxed animate-in fade-in duration-150">
            <div className="flex items-start gap-2">
              <span className="font-bold text-stone-900 dark:text-stone-100 shrink-0 font-mono">↳ Note:</span>
              <div>
                <p className="font-semibold text-stone-800 dark:text-stone-200 mb-0.5">เหตุผลทางฟิสิกส์เบื้องหลังคณิตศาสตร์:</p>
                <FormattedMathText text={step.physicalIntuitionTh} />
              </div>
            </div>
          </div>
        )}

        {/* Math Op Box */}
        {showMathOp && step.mathOperationTh && (
          <div className="p-3.5 rounded border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 text-xs md:text-sm text-stone-700 dark:text-stone-300 font-serif leading-relaxed animate-in fade-in duration-150">
            <div className="flex items-start gap-2">
              <span className="font-bold text-stone-900 dark:text-stone-100 shrink-0 font-mono">↳ Tool:</span>
              <div>
                <p className="font-semibold text-stone-800 dark:text-stone-200 mb-0.5">เครื่องมือทางแคลคูลัสที่ใช้:</p>
                <FormattedMathText text={step.mathOperationTh} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
