/**
 * Utility for formatting formulas with real Unicode mathematical symbols.
 * Converts LaTeX tokens or unformatted math strings into clean, readable math symbols.
 */

const SUPERSCRIPT_MAP: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  '=': '⁼',
  '(': '⁽',
  ')': '⁾',
  'a': 'ᵃ',
  'b': 'ᵇ',
  'c': 'ᶜ',
  'd': 'ᵈ',
  'e': 'ᵉ',
  'f': 'ᶠ',
  'g': 'ᵍ',
  'h': 'ʰ',
  'i': 'ⁱ',
  'j': 'ʲ',
  'k': 'ᵏ',
  'l': 'ˡ',
  'm': 'ᵐ',
  'n': 'ⁿ',
  'o': 'ᵒ',
  'p': 'ᵖ',
  'r': 'ʳ',
  's': 'ˢ',
  't': 'ᵗ',
  'u': 'ᵘ',
  'v': 'ᵛ',
  'w': 'ʷ',
  'x': 'ˣ',
  'y': 'ʸ',
  'z': 'ᶻ',
  'A': 'ᴬ',
  'B': 'ᴮ',
  'D': 'ᴰ',
  'E': 'ᴱ',
  'G': 'ᴳ',
  'H': 'ᴴ',
  'I': 'ᴵ',
  'J': 'ᴶ',
  'K': 'ᴷ',
  'L': 'ᴸ',
  'M': 'ᴹ',
  'N': 'ᴺ',
  'O': 'ᴼ',
  'P': 'ᴾ',
  'R': 'ᴿ',
  'T': 'ᵀ',
  'U': 'ᵁ',
  'W': 'ᵂ',
  '⁰': '⁰',
  '¹': '¹',
  '²': '²',
  '³': '³',
  '⁴': '⁴',
  '⁵': '⁵',
  '⁶': '⁶',
  '⁷': '⁷',
  '⁸': '⁸',
  '⁹': '⁹',
  '⁺': '⁺',
  '⁻': '⁻',
  '/': 'ᐟ',
}

const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
  '+': '₊',
  '-': '₋',
  '=': '₌',
  '(': '₍',
  ')': '₎',
  'a': 'ₐ',
  'e': 'ₑ',
  'h': 'ₕ',
  'i': 'ᵢ',
  'j': 'ⱼ',
  'k': 'ₖ',
  'l': 'ₗ',
  'm': 'ₘ',
  'n': 'ₙ',
  'o': 'ₒ',
  'p': 'ₚ',
  'r': 'ᵣ',
  's': 'ₛ',
  't': 'ₜ',
  'u': 'ᵤ',
  'v': 'ᵥ',
  'x': 'ₓ',
}

function toSuperscript(input: string): string {
  const clean = input.replace(/\s+/g, '')
  return clean
    .split('')
    .map((char) => SUPERSCRIPT_MAP[char] ?? char)
    .join('')
}

function toSubscript(input: string): string {
  const clean = input.replace(/\s+/g, '')
  return clean
    .split('')
    .map((char) => SUBSCRIPT_MAP[char] ?? char)
    .join('')
}

/**
 * Normalizes a math or formula string into clean, human-readable Unicode mathematical symbols.
 */
export function formatMathSymbols(text: string): string {
  if (!text) return ''

  let result = text

  // 1. Unwrap \text{...}
  result = result.replace(/\\text\{([^}]+)\}/g, '$1')

  // 2. Roots (Akar)
  // \sqrt[n]{x} -> ⁿ√(x)
  result = result.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, (_, degree, inner) => {
    return `${toSuperscript(degree)}√(${inner})`
  })
  // \sqrt{x} -> √(x)
  result = result.replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
  result = result.replace(/\\sqrt\s*([a-zA-Z0-9]+)/g, '√$1')

  // 3. Fractions (Pecahan)
  result = result.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (_, numerator, denominator) => {
    const cleanNum = numerator.trim()
    const cleanDen = denominator.trim()
    const needsParensNum = /[+\-\s]/.test(cleanNum)
    const needsParensDen = /[+\-\s]/.test(cleanDen)
    const numPart = needsParensNum ? `(${cleanNum})` : cleanNum
    const denPart = needsParensDen ? `(${cleanDen})` : cleanDen
    return `${numPart} / ${denPart}`
  })

  // 4. Binomial coefficients
  result = result.replace(/\\binom\{([^}]+)\}\{([^}]+)\}/g, 'C($1, $2)')

  // 5. Common LaTeX Operators & Symbols
  const replacements: Array<[RegExp, string]> = [
    [/\\lim_\{([^}]+)\}/g, 'lim($1)'],
    [/\blim_\{([^}]+)\}/g, 'lim($1)'],
    [/\\sum\b/g, '∑'],
    [/\bsum_(?=[{\w])/g, '∑_'],
    [/\\prod\b/g, '∏'],
    [/\bprod_(?=[{\w])/g, '∏_'],
    [/\\int\b/g, '∫'],
    [/\bintegral_(?=[{\w])/g, '∫_'],
    [/<=>/g, '⇔'],
    [/<->/g, '↔'],
    [/=>/g, '⇒'],
    [/->/g, '→'],
    [/>=/g, '≥'],
    [/<=/g, '≤'],
    [/!=/g, '≠'],
    [/\\implies/g, '⇒'],
    [/\\iff/g, '⇔'],
    [/\\to/g, '→'],
    [/\\gets/g, '←'],
    [/\\leftrightarrow/g, '↔'],
    [/\\Rightarrow/g, '⇒'],
    [/\\Leftarrow/g, '⇐'],
    [/\\geq/g, '≥'],
    [/\\ge\b/g, '≥'],
    [/\\leq/g, '≤'],
    [/\\le\b/g, '≤'],
    [/\\neq/g, '≠'],
    [/\\approx/g, '≈'],
    [/\\equiv/g, '≡'],
    [/\\pm/g, '±'],
    [/\\mp/g, '∓'],
    [/\\times/g, '×'],
    [/\\cdot/g, '·'],
    [/\\div/g, '÷'],
    [/\\infty/g, '∞'],
    [/\\pi/g, 'π'],
    [/\\circ/g, '°'],
    [/\\partial/g, '∂'],
    [/\\nabla/g, '∇'],
    [/\\forall/g, '∀'],
    [/\\exists/g, '∃'],
    [/\\land/g, '∧'],
    [/\\lor/g, '∨'],
    [/\\sim/g, '~'],
    [/\\vdash/g, '⊢'],
    [/\\oplus/g, '⊕'],
    [/\\otimes/g, '⊗'],
    [/\\circ/g, '∘'],
    [/\\mid/g, '|'],
    [/\\nmid/g, '∤'],
    [/\\in/g, '∈'],
    [/\\notin/g, '∉'],
    [/\\subset/g, '⊂'],
    [/\\supset/g, '⊃'],
    [/\\cup/g, '∪'],
    [/\\cap/g, '∩'],
    [/\\emptyset/g, '∅'],
    [/\\mathbb\{R\}/g, 'ℝ'],
    [/\\mathbb\{Q\}/g, 'ℚ'],
    [/\\mathbb\{Z\}/g, 'ℤ'],
    [/\\mathbb\{N\}/g, 'ℕ'],
    [/\\mathbb\{C\}/g, 'ℂ'],
    [/\\alpha/g, 'α'],
    [/\\beta/g, 'β'],
    [/\\gamma/g, 'γ'],
    [/\\delta/g, 'δ'],
    [/\\epsilon/g, 'ε'],
    [/\\theta/g, 'θ'],
    [/\\lambda/g, 'λ'],
    [/\\mu/g, 'μ'],
    [/\\sigma/g, 'σ'],
    [/\\tau/g, 'τ'],
    [/\\phi/g, 'φ'],
    [/\\omega/g, 'ω'],
    [/\\Delta/g, 'Δ'],
    [/\\Omega/g, 'Ω'],
    [/\\Sigma/g, 'Σ'],
    [/\\pmod\s*\{?([^}]+)\}?/g, ' (mod $1)'],
    [/\\bmod\s*\{?([^}]+)\}?/g, ' mod $1'],
    [/\\gcd/g, 'FPB'],
    [/\\lceil/g, '⌈'],
    [/\\rceil/g, '⌉'],
    [/\\lfloor/g, '⌊'],
    [/\\rfloor/g, '⌋'],
    [/\\angle/g, '∠'],
    [/\\left[\(\[\{]/g, '('],
    [/\\right[\)\]\}]/g, ')'],
    [/\\quad/g, '  •  '],
    [/\\qquad/g, '  •  '],
    [/\\\\/g, '\n'],
  ]

  for (const [pattern, substitute] of replacements) {
    result = result.replace(pattern, substitute)
  }

  // 6. Handle exponents like x^3 -> x³, x^{n+1} -> xⁿ⁺¹, 7^(2026) -> 7²⁰²⁶, 3^100 -> 3¹⁰⁰
  result = result.replace(/\^\(([^)]+)\)/g, (_, exp) => toSuperscript(exp))
  result = result.replace(/\^\{([^}]+)\}/g, (_, exp) => toSuperscript(exp))
  result = result.replace(/\^([0-9a-zA-Z\+\-]+)/g, (_, exp) => toSuperscript(exp))

  // 7. Handle single-letter / digit subscripts: x_i -> xᵢ, s_1 -> s₁, U_n -> Uₙ
  result = result.replace(/_\{([^}]+)\}/g, (_, sub) => {
    const converted = toSubscript(sub)
    return converted.length === sub.replace(/\s+/g, '').length ? converted : `_${sub}`
  })
  result = result.replace(/_([0-9a-zA-Z])/g, (_, sub) => {
    return SUBSCRIPT_MAP[sub] ?? `_${sub}`
  })

  // 8. Clean up double spaces or residual backslashes
  result = result.replace(/\s{3,}/g, '  ')
  result = result.replace(/\\([a-zA-Z]+)/g, '$1')

  return result.trim()
}
