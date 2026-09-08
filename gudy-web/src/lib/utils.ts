import type { ChecklistItem } from '@/types'

// Generate unique ID
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get greeting based on hour
export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// Format time
export function formatStudyTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

// Format date
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getFullYear()}`
}

// Calculate progress percentage
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

// Get subject gradient colors
export function getSubjectGradient(subjectId: string): { from: string; to: string } {
  const gradients: Record<string, { from: string; to: string }> = {
    matematika_osn: { from: '#3A92A6', to: '#2E7585' },
    tka_matematika: { from: '#D97757', to: '#B85538' },
    bahasa_indonesia: { from: '#D9943B', to: '#B87826' },
    bahasa_inggris: { from: '#B86877', to: '#974C5A' },
    serkom: { from: '#459A72', to: '#337A58' },
  }
  return gradients[subjectId] || { from: '#D97757', to: '#B85538' }
}

// Create default checklist
export function createDefaultChecklist(topicName: string): ChecklistItem[] {
  const defaultTitles = [
    'Read theory',
    'Watch video (optional)',
    'Practice problems',
    'Review mistakes',
    'Self-quiz',
  ]

  return defaultTitles.map((title, index) => ({
    id: `${topicName.toLowerCase().replace(/\s+/g, '_')}_${index}`,
    title,
    isChecked: false,
    createdAt: new Date().toISOString(),
  }))
}

// Clamp value
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// Classnames helper
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
