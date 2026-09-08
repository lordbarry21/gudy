'use client'

import { useEffect, useRef, useState } from 'react'

interface MathRendererProps {
  text: string
  className?: string
  inline?: boolean
}

// Load MathJax from CDN and initialize
let mathJaxReady = false
let mathJaxInstance: any = null

async function loadMathJax() {
  if (mathJaxReady) return mathJaxInstance

  // Load MathJax from CDN
  if (typeof window !== 'undefined' && !(window as any).MathJax) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load MathJax'))
      document.head.appendChild(script)
    })
  }

  // Wait for MathJax to be ready
  await (window as any).MathJax.startup?.promise

  mathJaxInstance = (window as any).MathJax
  mathJaxReady = true

  return mathJaxInstance
}

/**
 * Converts common math patterns to LaTeX format
 */
function convertToLatex(text: string): string {
  let result = text

  // Protect already rendered HTML tags
  const tags: string[] = []
  result = result.replace(/<[^>]+>/g, (match) => {
    tags.push(match)
    return `__TAG_${tags.length - 1}__`
  })

  // Convert fractions like 1/2, 2/3 to LaTeX \frac{1}{2}
  result = result.replace(/(\d+)\/(\d+)/g, (_, num, den) => {
    return `\\frac{${num}}{${den}}`
  })

  // Convert square roots: √(x) -> \sqrt{x}
  result = result.replace(/√\(([^)]+)\)/g, (_, content) => {
    return `\\sqrt{${content}}`
  })

  // Convert square roots without parentheses: √x -> \sqrt{x}
  result = result.replace(/√(\w+)/g, (_, content) => {
    return `\\sqrt{${content}}`
  })

  // Convert superscripts: x^2 -> x^{2}
  result = result.replace(/\^(\d+)/g, '^{$1}')
  result = result.replace(/\^(\w)/g, '^{$1}')
  result = result.replace(/\^\{([^}]+)\}/g, '^{$1}')

  // Convert subscripts: x_1 -> x_{1}
  result = result.replace(/_(\d+)/g, '_{$1}')
  result = result.replace(/_(\w)/g, '_{$1}')
  result = result.replace(/_\{([^}]+)\}/g, '_{$1}')

  // Convert pi
  result = result.replace(/π/g, '\\pi')

  // Convert infinity
  result = result.replace(/∞/g, '\\infty')

  // Convert degrees
  result = result.replace(/(\d+)°/g, '$1^\\circ')

  // Convert arrows
  result = result.replace(/→/g, '\\rightarrow')
  result = result.replace(/←/g, '\\leftarrow')
  result = result.replace(/↔/g, '\\leftrightarrow')
  result = result.replace(/⇒/g, '\\Rightarrow')
  result = result.replace(/⇐/g, '\\Leftarrow')

  // Convert set notation
  result = result.replace(/∈/g, '\\in')
  result = result.replace(/∉/g, '\\notin')
  result = result.replace(/⊂/g, '\\subset')
  result = result.replace(/⊃/g, '\\supset')
  result = result.replace(/∪/g, '\\cup')
  result = result.replace(/∩/g, '\\cap')
  result = result.replace(/∅/g, '\\emptyset')

  // Convert Greek letters
  result = result.replace(/α/g, '\\alpha')
  result = result.replace(/β/g, '\\beta')
  result = result.replace(/γ/g, '\\gamma')
  result = result.replace(/δ/g, '\\delta')
  result = result.replace(/θ/g, '\\theta')
  result = result.replace(/λ/g, '\\lambda')
  result = result.replace(/μ/g, '\\mu')
  result = result.replace(/σ/g, '\\sigma')
  result = result.replace(/φ/g, '\\phi')
  result = result.replace(/ω/g, '\\omega')
  result = result.replace(/Σ/g, '\\Sigma')
  result = result.replace(/Δ/g, '\\Delta')
  result = result.replace(/Ω/g, '\\Omega')

  // Convert comparison operators
  result = result.replace(/≤/g, '\\leq')
  result = result.replace(/≥/g, '\\geq')
  result = result.replace(/≠/g, '\\neq')
  result = result.replace(/≈/g, '\\approx')

  // Convert ±
  result = result.replace(/±/g, '\\pm')
  result = result.replace(/∓/g, '\\mp')

  // Convert ∑ and ∫
  result = result.replace(/∑/g, '\\sum')
  result = result.replace(/∫/g, '\\int')

  // Convert log with base: ²log -> {}^{2}\\log
  result = result.replace(/²log/g, '{}^{2}\\log')
  result = result.replace(/³log/g, '{}^{3}\\log')
  result = result.replace(/⁴log/g, '{}^{4}\\log')

  // Convert sin, cos, tan squared
  result = result.replace(/sin²/g, '\\sin^{2}')
  result = result.replace(/cos²/g, '\\cos^{2}')
  result = result.replace(/tan²/g, '\\tan^{2}')

  // Convert composition symbol
  result = result.replace(/∘/g, '\\circ')

  // Wrap with \( \) for inline math
  result = `\\(${result}\\)`

  // Restore tags
  tags.forEach((tag, i) => {
    result = result.replace(`__TAG_${i}__`, tag)
  })

  return result
}

export function MathRenderer({ text, className = '', inline = false }: MathRendererProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const renderMath = async () => {
      try {
        const MJ = await loadMathJax()
        const latex = convertToLatex(text)

        // Clear previous content
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }

        // Create a temporary element to render MathJax
        const temp = document.createElement('span')
        temp.textContent = latex
        containerRef.current?.appendChild(temp)

        // Reset MathJax typeset
        await MJ.startup.promise
        const MathJax = MJ

        await MathJax.typesetPromise([containerRef.current!])

        setRendered(true)
      } catch (error) {
        console.warn('MathJax rendering error:', error)
        // Fallback to plain text
        if (containerRef.current) {
          containerRef.current.textContent = text
        }
      }
    }

    renderMath()
  }, [text])

  return (
    <span
      ref={containerRef}
      className={`math-renderer ${rendered ? 'math-rendered' : ''} ${className}`}
    />
  )
}

/**
 * Smart math renderer that handles mixed content
 */
export function SmartMathRenderer({ text, className = '' }: { text: string; className?: string }) {
  const lines = text.split('\n')

  return (
    <span className={className}>
      {lines.map((line, idx) => {
        const hasMath = /[\d]+[\/√²³⁴⁵⁶⁷⁸⁹⁰]|[²³⁴⁵⁶⁷⁸⁹⁰]log|√|\^|π|∞|≤|≥|≠|±|°|∈|∉|⊂|⊃|∪|∩|∅|→|←|⇔|⇒|⇐|∑|∫|∘/.test(line)

        if (hasMath) {
          return (
            <MathRenderer
              key={idx}
              text={line}
              inline={true}
            />
          )
        }

        return <span key={idx}>{line}</span>
      })}
    </span>
  )
}
