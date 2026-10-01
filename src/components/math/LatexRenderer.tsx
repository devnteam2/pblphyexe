// src/components/math/LatexRenderer.tsx
'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({
  math,
  displayMode = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
        strict: false,
        trust: true,
      });
    } catch (err) {
      console.error('KaTeX rendering error:', err);
      return `<span class="text-rose-400 font-mono text-xs">${math}</span>`;
    }
  }, [math, displayMode]);

  if (displayMode) {
    return (
      <div
        className={`latex-display-block overflow-x-auto py-2.5 px-3 my-2 rounded-lg bg-zinc-950/70 border border-slate-800/80 text-center select-all scrollbar-thin scrollbar-thumb-slate-700 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`latex-inline-math inline-block select-all px-0.5 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface FormattedMathTextProps {
  text: string;
  className?: string;
}

/**
 * Parses mixed text containing inline ($...$) and display ($$...$$) math.
 */
export const FormattedMathText: React.FC<FormattedMathTextProps> = ({ text, className = '' }) => {
  const segments = useMemo(() => {
    if (!text) return [];

    // Split display math $$...$$ first, then inline $...$
    const parts: { type: 'text' | 'display' | 'inline'; content: string }[] = [];
    const displayRegex = /\$\$([\s\S]*?)\$\$/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = displayRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'display', content: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }

    // Now process inline math in text segments
    const finalSegments: { type: 'text' | 'display' | 'inline'; content: string }[] = [];
    const inlineRegex = /\$([^\$]+?)\$/g;

    for (const part of parts) {
      if (part.type === 'display') {
        finalSegments.push(part);
        continue;
      }

      let innerLast = 0;
      let innerMatch: RegExpExecArray | null;
      while ((innerMatch = inlineRegex.exec(part.content)) !== null) {
        if (innerMatch.index > innerLast) {
          finalSegments.push({
            type: 'text',
            content: part.content.substring(innerLast, innerMatch.index),
          });
        }
        finalSegments.push({ type: 'inline', content: innerMatch[1] });
        innerLast = innerMatch.index + innerMatch[0].length;
      }

      if (innerLast < part.content.length) {
        finalSegments.push({
          type: 'text',
          content: part.content.substring(innerLast),
        });
      }
    }

    return finalSegments;
  }, [text]);

  return (
    <span className={`inline-block leading-relaxed ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.type === 'display') {
          return <LatexRenderer key={idx} math={seg.content} displayMode={true} />;
        }
        if (seg.type === 'inline') {
          return <LatexRenderer key={idx} math={seg.content} displayMode={false} />;
        }
        return <span key={idx}>{seg.content}</span>;
      })}
    </span>
  );
};
