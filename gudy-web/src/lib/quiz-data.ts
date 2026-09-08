/**
 * Quiz Data Loader
 * Handles loading quiz questions from JSON files
 */

import { QuizData, QuizSubcategory, QuizQuestion } from '@/types'

// Cache for loaded quiz data
const quizCache = new Map<string, QuizData>()

/**
 * Load quiz data for a specific subject
 */
export async function loadQuizData(subjectId: string): Promise<QuizData | null> {
  // Check cache first
  if (quizCache.has(subjectId)) {
    return quizCache.get(subjectId)!
  }

  try {
    const response = await fetch(`/practice/data/${subjectId}.json`)
    if (!response.ok) {
      console.error(`Failed to load quiz data for ${subjectId}`)
      return null
    }

    const data: QuizData = await response.json()
    quizCache.set(subjectId, data)
    return data
  } catch (error) {
    console.error(`Error loading quiz data for ${subjectId}:`, error)
    return null
  }
}

/**
 * Get a specific subcategory's questions
 */
export async function getSubcategoryQuestions(
  subjectId: string,
  subcategoryId: string
): Promise<QuizSubcategory | null> {
  const data = await loadQuizData(subjectId)
  if (!data) return null

  return data.subcategories.find((sub) => sub.id === subcategoryId) || null
}

/**
 * Get a specific question by number
 */
export async function getQuestion(
  subjectId: string,
  subcategoryId: string,
  questionNum: number
): Promise<QuizQuestion | null> {
  const subcategory = await getSubcategoryQuestions(subjectId, subcategoryId)
  if (!subcategory) return null

  return subcategory.questions.find((q) => q.num === questionNum) || null
}

/**
 * Get all subjects with their quiz data
 */
export async function getAllQuizData(): Promise<QuizData[]> {
  const subjectIds = [
    'bahasa_indonesia',
    'bahasa_inggris',
    'matematika_osn',
    'tka_matematika',
    'serkom',
  ]

  const results = await Promise.all(
    subjectIds.map((id) => loadQuizData(id))
  )

  return results.filter((data): data is QuizData => data !== null)
}

/**
 * Get quiz manifest (summary info for all subcategories)
 */
export async function getQuizManifest(): Promise<
  Array<{
    subjectId: string
    subjectName: string
    icon: string
    color: string
    subcategories: Array<{
      id: string
      title: string
      description: string
      questionCount: number
    }>
  }>
> {
  const allData = await getAllQuizData()

  return allData.map((data) => ({
    subjectId: data.subject_id,
    subjectName: data.subject_name,
    icon: data.icon,
    color: data.color,
    subcategories: data.subcategories.map((sub) => ({
      id: sub.id,
      title: sub.title,
      description: sub.description || '',
      questionCount: sub.questions.length,
    })),
  }))
}

/**
 * Get total question count for a subject
 */
export async function getSubjectQuestionCount(subjectId: string): Promise<number> {
  const data = await loadQuizData(subjectId)
  if (!data) return 0

  return data.subcategories.reduce(
    (total, sub) => total + sub.questions.length,
    0
  )
}

/**
 * Clear quiz cache (useful for development)
 */
export function clearQuizCache(): void {
  quizCache.clear()
}

/**
 * Get random questions from a subcategory (for practice mode)
 */
export function getRandomQuestions(
  questions: QuizQuestion[],
  count: number
): QuizQuestion[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * Shuffle answer options for a question (for anti-cheating)
 */
export function shuffleQuestionOptions(question: QuizQuestion): QuizQuestion {
  const optionKeys = Object.keys(question.options)
  const correctAnswer = question.answer

  // Shuffle keys
  const shuffledKeys = [...optionKeys].sort(() => Math.random() - 0.5)

  // Create new options object with shuffled keys
  const newOptions: Record<string, string> = {}
  shuffledKeys.forEach((key) => {
    newOptions[key] = question.options[key]
  })

  // Find new position of correct answer
  const newAnswer = Object.entries(newOptions).find(
    ([, value]) => value === question.options[correctAnswer]
  )?.[0] || correctAnswer

  return {
    ...question,
    options: newOptions,
    answer: newAnswer,
  }
}
