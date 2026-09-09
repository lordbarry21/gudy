'use client'

import React from 'react'
import { formatMathSymbols } from '@/lib/math-symbols'

interface MathRendererProps {
  text: string
  className?: string
  inline?: boolean
}

interface FractionToken {
  type: 'text' | 'frac'
  text?: string
  num?: string
  den?: string
}

function parseFractions(input: string): FractionToken[] {
  // Regex to match math fractions:
  // 1. \frac{num}{den}
  // 2. Parenthesized or simple fractions: (x - 4) / (√x - 2), 1/x, 1/y, 1/6, 2/3, 4/x², AF/FB
  const fracPattern = /(?:\\frac\{([^}]+)\}\{([^}]+)\}|(\([^\)]+\)|[A-Z]{2}|\d+|[xyzabcpqrnmk](?:[²³⁰-⁹])?)\s*\/\s*(\([^\)]+\)|[A-Z]{2}|\d+|[xyzabcpqrnmk](?:[²³⁰-⁹])?))/g

  const tokens: FractionToken[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = fracPattern.exec(input)) !== null) {
    if (match[0] === 'UI/UX') continue

    if (match.index > lastIndex) {
      tokens.push({ type: 'text', text: input.slice(lastIndex, match.index) })
    }

    let num = match[1] || match[3]
    let den = match[2] || match[4]
    if (num.startsWith('(') && num.endsWith(')')) num = num.slice(1, -1).trim()
    if (den.startsWith('(') && den.endsWith(')')) den = den.slice(1, -1).trim()

    tokens.push({ type: 'frac', num, den })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < input.length) {
    tokens.push({ type: 'text', text: input.slice(lastIndex) })
  }

  return tokens
}

function renderTextWithFractions(text: string, keyPrefix: string | number): React.ReactNode {
  const tokens = parseFractions(text)
  if (tokens.length === 1 && tokens[0].type === 'text') {
    return <span key={keyPrefix}>{formatMathSymbols(text)}</span>
  }

  return (
    <span key={keyPrefix} className="inline-baseline">
      {tokens.map((token, subIdx) => {
        if (token.type === 'frac' && token.num && token.den) {
          return (
            <span
              key={`${keyPrefix}-f-${subIdx}`}
              className="inline-flex flex-col items-center justify-center align-middle mx-1 -translate-y-0.5 text-[0.82em] leading-none select-text font-medium"
            >
              <span className="border-b-[1.5px] border-current px-1 pb-0.5 text-center leading-none block w-full">
                {formatMathSymbols(token.num)}
              </span>
              <span className="px-1 pt-0.5 text-center leading-none block w-full">
                {formatMathSymbols(token.den)}
              </span>
            </span>
          )
        }
        return <span key={`${keyPrefix}-t-${subIdx}`}>{formatMathSymbols(token.text || '')}</span>
      })}
    </span>
  )
}

/**
 * Formats inline text with code badges, bold/italic, and clean Unicode math symbols.
 * Preserves all whitespace and word-spacing cleanly.
 */
function renderFormattedInline(content: string): React.ReactNode[] {
  // Regex to match inline code (`code`), bold (**bold**), italic (*italic*), or plain segments
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g
  const tokens = content.split(tokenRegex)

  return tokens.map((token, index) => {
    if (!token) return null

    // Inline code
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      const code = token.slice(1, -1)
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-surface-elevated border border-border font-mono text-[0.9em] text-accent font-medium inline-block"
        >
          {code}
        </code>
      )
    }

    // Bold
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      const boldText = token.slice(2, -2)
      return (
        <strong key={index} className="font-bold text-text-primary">
          {renderTextWithFractions(boldText, `b-${index}`)}
        </strong>
      )
    }

    // Italic
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      const italicText = token.slice(1, -1)
      return (
        <em key={index} className="italic text-text-primary">
          {renderTextWithFractions(italicText, `i-${index}`)}
        </em>
      )
    }

    // Regular text with fractions and math symbols formatted
    return renderTextWithFractions(token, index)
  })
}

/**
 * MathRenderer component that renders text with clean Unicode mathematical formatting,
 * code blocks, and full typography preservation.
 */
export function MathRenderer({ text, className = '', inline = false }: MathRendererProps) {
  if (!text) return null

  // Handle multi-line text and code blocks
  if (!inline && (text.includes('```') || text.includes('\n'))) {
    // Check for fenced code blocks
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const textBefore = text.slice(lastIndex, match.index)
        parts.push(
          <span key={`text-${lastIndex}`}>
            {renderFormattedInline(textBefore)}
          </span>
        )
      }

      const lang = match[1] || ''
      const codeContent = match[2]
      parts.push(
        <div key={`code-${match.index}`} className="my-3">
          {lang && (
            <div className="px-3 py-1 bg-surface-elevated/80 border-t border-x border-border rounded-t-lg font-mono text-xs text-text-muted">
              {lang}
            </div>
          )}
          <pre
            className={`p-4 bg-surface-elevated border border-border ${
              lang ? 'rounded-b-lg' : 'rounded-lg'
            } font-mono text-sm sm:text-base text-text-primary overflow-x-auto custom-scrollbar leading-relaxed`}
          >
            <code>{codeContent.trim()}</code>
          </pre>
        </div>
      )

      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {renderFormattedInline(text.slice(lastIndex))}
        </span>
      )
    }

    return <span className={`math-renderer font-sans ${className}`}>{parts}</span>
  }

  // Single line / inline rendering
  return (
    <span className={`math-renderer font-sans ${className}`}>
      {renderFormattedInline(text)}
    </span>
  )
}

/**
 * Smart math renderer that delegates to MathRenderer with Unicode formatting.
 */
export function SmartMathRenderer({ text, className = '' }: { text: string; className?: string }) {
  return <MathRenderer text={text} className={className} />
}
