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
      return `<span class="text-rose-600 font-mono text-xs">${math}</span>`;
    }
  }, [math, displayMode]);

  if (displayMode) {
    return (
      <div
        className={`latex-display-block overflow-x-auto py-3 px-4 my-2.5 rounded border text-center select-all transition-colors ${className}`}
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

/**
 * Renders inline Markdown emphasis (**bold**, *italic*, `code`) and preserves intentional newlines
 * strictly on plain text segments AFTER math ($...$, $$...$$) has been tokenized.
 */
function renderStyledPlainText(text: string, keyPrefix: string): React.ReactNode {
  const tokenRegex = /(\*\*[^*\n]+?\*\*|\*[^*\n]+?\*|`[^`\n]+?`)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let partIdx = 0;

  const pushWithLineBreaks = (raw: string, baseKey: string) => {
    const lines = raw.split('\n');
    lines.forEach((line, lineIdx) => {
      if (lineIdx > 0) {
        nodes.push(<br key={`${baseKey}-br-${lineIdx}`} />);
      }
      if (line.length > 0) {
        nodes.push(<React.Fragment key={`${baseKey}-txt-${lineIdx}`}>{line}</React.Fragment>);
      }
    });
  };

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      pushWithLineBreaks(text.slice(lastIndex, match.index), `${keyPrefix}-pre-${partIdx}`);
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${partIdx}`} className="font-bold text-[var(--ink-primary)]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(
        <em key={`${keyPrefix}-i-${partIdx}`} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${partIdx}`}
          className="font-mono text-[0.9em] px-1 py-0.5 rounded bg-[var(--surface-muted)] border border-[var(--hairline-border)] text-[var(--ink-primary)]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = match.index + token.length;
    partIdx++;
  }

  if (lastIndex < text.length) {
    pushWithLineBreaks(text.slice(lastIndex), `${keyPrefix}-tail`);
  }

  return nodes;
}

interface FormattedMathTextProps {
  text: string;
  className?: string;
}

/**
 * Parses mixed text containing inline ($...$), display ($$...$$) math, and basic inline emphasis (**bold**, *italic*).
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
    <span className={`leading-relaxed ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.type === 'display') {
          return <LatexRenderer key={idx} math={seg.content} displayMode={true} />;
        }
        if (seg.type === 'inline') {
          return <LatexRenderer key={idx} math={seg.content} displayMode={false} />;
        }
        return <React.Fragment key={idx}>{renderStyledPlainText(seg.content, `seg-${idx}`)}</React.Fragment>;
      })}
    </span>
  );
};

interface AcademicMarkdownProps {
  content: string;
  className?: string;
}

type MarkdownBlock =
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'hr' }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'math'; math: string }
  | { type: 'ul'; items: { indent: number; text: string }[] }
  | { type: 'ol'; items: { num?: number; text: string; extraMath?: string[] }[] }
  | { type: 'paragraph'; text: string; hasDisplayMath: boolean };

/**
 * Renders structured academic monograph theory markdown cleanly with Computer Modern + Noto Serif Thai
 * typography, headings, callouts, ordered/unordered lists, and full KaTeX support.
 */
export const AcademicMarkdown: React.FC<AcademicMarkdownProps> = ({ content, className = '' }) => {
  const blocks = useMemo(() => {
    const lines = content.replace(/\r\n/g, '\n').trim().split('\n');
    const result: MarkdownBlock[] = [];
    let i = 0;

    while (i < lines.length) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();

      if (!trimmed) {
        i++;
        continue;
      }

      // Horizontal rule
      if (/^---+$/.test(trimmed)) {
        result.push({ type: 'hr' });
        i++;
        continue;
      }

      // Headings
      if (trimmed.startsWith('#### ')) {
        result.push({ type: 'h4', text: trimmed.slice(5).trim() });
        i++;
        continue;
      }
      if (trimmed.startsWith('### ')) {
        result.push({ type: 'h3', text: trimmed.slice(4).trim() });
        i++;
        continue;
      }

      // Standalone single-line or multi-line display math $$...$$
      if (trimmed.startsWith('$$')) {
        if (trimmed.length > 4 && trimmed.endsWith('$$')) {
          result.push({ type: 'math', math: trimmed.slice(2, -2).trim() });
          i++;
          continue;
        }
        // Check if closing $$ is on this line followed by trailing prose
        const closingSameLine = trimmed.indexOf('$$', 2);
        if (closingSameLine !== -1) {
          result.push({ type: 'paragraph', text: trimmed, hasDisplayMath: true });
          i++;
          continue;
        }
        // Multi-line $$ block
        const mathLines: string[] = [trimmed.slice(2)];
        i++;
        while (i < lines.length) {
          const inner = lines[i].trim();
          if (inner.endsWith('$$')) {
            mathLines.push(inner.slice(0, -2));
            i++;
            break;
          }
          mathLines.push(inner);
          i++;
        }
        result.push({ type: 'math', math: mathLines.join('\n').trim() });
        continue;
      }

      // Blockquote (consecutive > lines)
      if (trimmed.startsWith('> ')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
          i++;
        }
        result.push({ type: 'blockquote', lines: quoteLines });
        continue;
      }

      // Unordered list (- or *)
      if (/^\s*[-*]\s+/.test(rawLine)) {
        const items: { indent: number; text: string }[] = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          const line = lines[i];
          const indent = line.length - line.trimStart().length;
          items.push({
            indent: indent >= 2 ? 1 : 0,
            text: line.trim().replace(/^[-*]\s+/, ''),
          });
          i++;
        }
        result.push({ type: 'ul', items });
        continue;
      }

      // Ordered list (1. 2. ...) — keeps nested $$...$$ equations attached to their list item
      if (/^\d+\.\s+/.test(trimmed)) {
        const items: { num?: number; text: string; extraMath?: string[] }[] = [];
        while (i < lines.length) {
          const cur = lines[i].trim();
          const numMatch = cur.match(/^(\d+)\.\s+(.*)$/);
          if (numMatch) {
            items.push({ num: Number(numMatch[1]), text: numMatch[2], extraMath: [] });
            i++;
            // Collect immediately following standalone $$...$$ equation lines belonging to this list item
            while (i < lines.length) {
              const nextTrim = lines[i].trim();
              if (nextTrim.startsWith('$$') && nextTrim.endsWith('$$') && nextTrim.length > 4) {
                items[items.length - 1].extraMath?.push(nextTrim.slice(2, -2).trim());
                i++;
              } else {
                break;
              }
            }
          } else {
            break;
          }
        }
        result.push({ type: 'ol', items });
        continue;
      }

      // Regular paragraph (consume until blank line or structural block start)
      const paraLines: string[] = [];
      let hasDisplay = false;
      while (i < lines.length) {
        const curRaw = lines[i];
        const curTrim = curRaw.trim();
        if (
          !curTrim ||
          /^---+$/.test(curTrim) ||
          curTrim.startsWith('### ') ||
          curTrim.startsWith('#### ') ||
          curTrim.startsWith('> ') ||
          curTrim.startsWith('$$') ||
          /^\s*[-*]\s+/.test(curRaw) ||
          /^\d+\.\s+/.test(curTrim)
        ) {
          break;
        }
        if (curTrim.includes('$$')) hasDisplay = true;
        paraLines.push(curTrim);
        i++;
      }
      if (paraLines.length > 0) {
        result.push({
          type: 'paragraph',
          text: paraLines.join('\n'),
          hasDisplayMath: hasDisplay,
        });
      }
    }

    return result;
  }, [content]);

  return (
    <div className={`space-y-3 font-serif text-sm md:text-base text-[var(--ink-primary)] ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'hr':
            return <hr key={idx} className="border-t border-[var(--hairline-border)] my-5" />;
          case 'h3':
            return (
              <h3
                key={idx}
                className="text-base md:text-lg font-bold text-[var(--ink-primary)] pt-3 pb-1 border-b border-[var(--hairline-subtle)]"
              >
                <FormattedMathText text={block.text} />
              </h3>
            );
          case 'h4':
            return (
              <h4 key={idx} className="text-sm md:text-base font-bold text-[var(--ink-primary)] pt-2">
                <FormattedMathText text={block.text} />
              </h4>
            );
          case 'math':
            return <LatexRenderer key={idx} math={block.math} displayMode={true} />;
          case 'blockquote':
            return (
              <blockquote
                key={idx}
                className="border-l-2 border-amber-600/80 dark:border-amber-400/80 bg-[var(--surface-muted)] px-4 py-3 rounded-r text-xs md:text-sm text-[var(--ink-primary)] space-y-1.5 my-3"
              >
                {block.lines.map((line, lIdx) => (
                  <div key={lIdx}>
                    <FormattedMathText text={line} />
                  </div>
                ))}
              </blockquote>
            );
          case 'ul':
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1.5 my-2.5 text-[var(--ink-primary)]">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className={item.indent > 0 ? 'ml-5 list-[circle]' : ''}>
                    <FormattedMathText text={item.text} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={idx} className="list-decimal pl-5 space-y-2 my-2.5 text-[var(--ink-primary)]">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} value={item.num}>
                    <FormattedMathText text={item.text} />
                    {item.extraMath &&
                      item.extraMath.map((m, mIdx) => (
                        <LatexRenderer key={mIdx} math={m} displayMode={true} />
                      ))}
                  </li>
                ))}
              </ol>
            );
          case 'paragraph':
            if (block.hasDisplayMath) {
              return (
                <div key={idx} className="leading-relaxed text-[var(--ink-primary)] my-2">
                  <FormattedMathText text={block.text} />
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed text-[var(--ink-primary)] my-2">
                <FormattedMathText text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
};
