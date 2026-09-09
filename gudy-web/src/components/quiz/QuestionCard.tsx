'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Target, BookOpen, Code, ListNumbers, Quotes } from '@phosphor-icons/react'
import { QuizQuestion } from '@/types'
import { AnswerOption } from './AnswerOption'
import { MathRenderer } from './MathRenderer'

interface QuestionCardProps {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  selectedAnswer?: string
  showResult?: boolean
  onSelectAnswer: (answer: string) => void
}

interface ParsedQuestion {
  type: 'passage' | 'code' | 'premises' | 'list' | 'direct'
  instruction?: string
  content?: string
  prompt: string
}

function parseQuestionContent(rawText: string): ParsedQuestion {
  const trimmed = rawText.trim()
  const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean)

  if (lines.length <= 1) {
    return { type: 'direct', prompt: trimmed }
  }

  // Detect instruction on the first line
  const instructionRegex = /^(Bacalah|Read the passage|Perhatikan|Tabel|Urutkan|Kutipan cerpen|Passage:)/i
  let instruction = ''
  let startIndex = 0

  if (instructionRegex.test(lines[0])) {
    instruction = lines[0]
    startIndex = 1
  }

  if (startIndex >= lines.length) {
    return { type: 'direct', prompt: trimmed }
  }

  const prompt = lines[lines.length - 1]
  const contentLines = lines.slice(startIndex, lines.length - 1)
  const content = contentLines.join('\n')

  let type: ParsedQuestion['type'] = 'passage'
  if (content.includes('```') || content.includes('Route::') || content.includes('->constrained()')) {
    type = 'code'
  } else if (content.startsWith('Premis') || content.includes('Premis 1:')) {
    type = 'premises'
  } else if (/^\(\d+\)/m.test(content) || /^-\s/.test(content)) {
    type = 'list'
  }

  return { type, instruction, content, prompt }
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showResult,
  onSelectAnswer,
}: QuestionCardProps) {
  const optionKeys = Object.keys(question.options)

  const parsed = useMemo(() => parseQuestionContent(question.question), [question.question])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Question Header */}
      <div>
        {/* Topic Badge - Centered */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border font-sans text-sm font-semibold text-text-secondary shadow-sm">
            <Target size={16} weight="bold" className="text-accent" />
            <span>{question.topic}</span>
          </div>
        </div>

        {/* Question Number - Centered */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border max-w-[120px]" />
          <span className="font-sans text-xs sm:text-sm font-bold text-accent tracking-widest uppercase">
            SOAL {questionNumber} DARI {totalQuestions}
          </span>
          <div className="h-px flex-1 bg-border max-w-[120px]" />
        </div>

        {/* Question Body */}
        <div className="space-y-6">
          {/* Instruction Label if present */}
          {parsed.instruction && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-sans font-semibold text-xs sm:text-sm tracking-wide">
              {parsed.type === 'code' ? (
                <Code size={16} weight="bold" />
              ) : parsed.type === 'list' || parsed.type === 'premises' ? (
                <ListNumbers size={16} weight="bold" />
              ) : (
                <BookOpen size={16} weight="bold" />
              )}
              <span>{parsed.instruction}</span>
            </div>
          )}

          {/* Reading Passage / Code / List Content Box */}
          {parsed.content && (
            <div className="relative rounded-2xl bg-surface/90 border border-border p-6 sm:p-8 lg:p-9 shadow-sm transition-all">
              {parsed.type === 'passage' && (
                <div className="absolute -top-3.5 left-6 bg-surface-elevated border border-border rounded-lg px-2.5 py-0.5 text-text-muted text-xs font-sans font-medium flex items-center gap-1.5 shadow-sm">
                  <Quotes size={14} weight="fill" className="text-accent" />
                  <span>Teks Bacaan</span>
                </div>
              )}

              <div className="font-sans text-xl sm:text-2xl text-text-primary leading-relaxed sm:leading-loose font-normal">
                <MathRenderer text={parsed.content} />
              </div>
            </div>
          )}

          {/* Main Question Prompt */}
          <div
            className={`font-sans text-text-primary leading-snug ${
              parsed.content
                ? 'text-2xl sm:text-3xl font-bold tracking-tight pt-2'
                : 'text-2xl sm:text-3xl lg:text-4xl font-semibold leading-relaxed tracking-tight'
            }`}
          >
            <MathRenderer text={parsed.prompt} />
          </div>
        </div>
      </div>

      {/* Answer Options - Clean, spacious and comfortable */}
      <div className="space-y-4 pt-2">
        {optionKeys.map((key) => (
          <AnswerOption
            key={key}
            optionKey={key}
            text={question.options[key]}
            isSelected={selectedAnswer === key}
            isCorrect={showResult && key === question.answer}
            isWrong={
              showResult &&
              selectedAnswer === key &&
              key !== question.answer
            }
            showResult={showResult}
            onClick={() => !showResult && onSelectAnswer(key)}
            disabled={showResult}
          />
        ))}
      </div>
    </motion.div>
  )
}
