# Implementation Plan: Interactive Quiz System with Firebase Auth

## Overview
Convert the existing PDF-based practice system into an interactive quiz system with Firebase authentication for cloud sync of progress and streaks.

---

## Part 1: Convert Python Questions to JSON

### 1.1 Create Python Script to Parse Questions
- **File**: `scripts/practice_generator/convert_to_json.py`
- Parse all 5 `data_*.py` files
- Output JSON files to `/public/practice/data/`
- Structure:
```json
{
  "subject_id": "bahasa_indonesia",
  "subject_name": "TKA Wajib: Bahasa Indonesia",
  "icon": "📝",
  "color": "#D9943B",
  "subcategories": [
    {
      "id": "teks_informasi",
      "title": "Keterampilan Membaca Teks Informasi",
      "questions": [
        {
          "num": 1,
          "topic": "Ide Pokok Paragraf Deduktif",
          "question": "...",
          "options": { "A": "...", "B": "...", ... },
          "answer": "B",
          "solution": "..."
        }
      ]
    }
  ]
}
```

### 1.2 Run Conversion
- Execute the script to generate JSON files
- Verify output in `/public/practice/data/`

---

## Part 2: Interactive Quiz System

### 2.1 Type Definitions
- **File**: `src/types/index.ts` (add new types)
```typescript
interface QuizQuestion {
  num: number
  topic: string
  question: string
  options: Record<string, string>  // A, B, C, D, E
  answer: string
  solution: string
}

interface QuizSubcategory {
  id: string
  title: string
  questions: QuizQuestion[]
}

interface QuizData {
  subject_id: string
  subject_name: string
  icon: string
  color: string
  subcategories: QuizSubcategory[]
}

interface QuizAttempt {
  id: string
  subcategoryId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  answers: Record<number, string>  // questionNum -> selectedAnswer
  completedAt: string
}

interface QuizState {
  currentSubcategory: QuizSubcategory | null
  currentQuestionIndex: number
  selectedAnswers: Record<number, string>
  isSubmitted: boolean
  showSolution: boolean
}
```

### 2.2 Quiz Data Loader
- **File**: `src/lib/quiz-data.ts`
- Load quiz JSON files dynamically
- Cache loaded data in memory
- Functions: `getQuizData(subjectId)`, `getSubcategoryData(subjectId, subcategoryId)`

### 2.3 Quiz Components
Create in `src/components/quiz/`:

1. **QuizCard.tsx** - Card component for practice page (replaces PDF link)
   - Shows subcategory info, question count
   - "Mulai Quiz" button
   - Best score badge (if attempted)

2. **QuizModal.tsx** - Full-screen quiz experience
   - Progress bar (question X of Y)
   - Timer display
   - Question display area
   - Answer options (A-E)
   - Navigation (prev/next)
   - Submit button

3. **QuestionCard.tsx** - Single question display
   - Question number and topic
   - Question text (with formatting)
   - Option buttons

4. **AnswerOption.tsx** - Individual answer button
   - States: default, selected, correct, incorrect
   - Color coding based on state

5. **SolutionPanel.tsx** - Shows after answering
   - Correct/incorrect indicator
   - Full solution text
   - "Next" button

6. **QuizResult.tsx** - Summary screen after quiz
   - Score with percentage
   - Breakdown: correct/wrong/skipped
   - Per-question review
   - "Retry" and "Back to Practice" buttons

### 2.4 Quiz State Management
- **File**: `src/lib/quiz-store.ts` (new Zustand store)
```typescript
interface QuizStore {
  // State
  activeQuiz: {
    subjectId: string
    subcategoryId: string
    questions: QuizQuestion[]
    currentIndex: number
    answers: Record<number, string>
    startTime: string
  } | null

  // Actions
  startQuiz: (subjectId: string, subcategoryId: string) => void
  selectAnswer: (questionNum: number, answer: string) => void
  nextQuestion: () => void
  prevQuestion: () => void
  submitQuiz: () => QuizAttempt
  resetQuiz: () => void
}
```

---

## Part 3: Firebase Integration

### 3.1 Firebase Setup
- **Install**: `npm install firebase @react-firebase/auth @react-firebase/firestore`
- **Config**: `src/lib/firebase.ts`
```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
```

### 3.2 Firebase Auth Context
- **File**: `src/contexts/AuthContext.tsx`
- Provide: `user`, `loading`, `signIn`, `signUp`, `signOut`, `signInWithGoogle`
- Handle auth state changes
- Persist auth state

### 3.3 Firestore Schema
```
users/{userId}
  - email: string
  - displayName: string
  - createdAt: timestamp
  - progress: {
      streak: number
      longestStreak: number
      lastActiveAt: timestamp
      totalTopicsCompleted: number
      totalMinutesSpent: number
      dailyGoal: number
      totalStudyDays: number
    }
  - topics: array of topic data
  - achievements: array of achievement data
  - quizAttempts: array of quiz attempts
  - createdAt: timestamp
  - updatedAt: timestamp
```

### 3.4 Firebase Store Integration
- **File**: `src/lib/firebase-store.ts`
- Hybrid approach: localStorage for offline, Firebase for sync
- On login: merge cloud data with local
- On save: update both local and cloud
- Functions:
  - `syncToCloud(userId, data)`
  - `loadFromCloud(userId)`
  - `mergeData(local, cloud)`

### 3.5 Auth UI Components
- **File**: `src/components/auth/AuthModal.tsx`
- Login/Register tabs
- Email/password form
- Google sign-in button
- Form validation
- Error handling

### 3.6 Update Navigation
- Add user avatar/login button to sidebar
- Show "Login to sync progress" prompt for non-authenticated users
- Protected routes for profile settings

---

## Part 4: Update Practice Page

### 4.1 Replace PDF Cards with Quiz Cards
- Modify `src/app/practice/page.tsx`
- Each practice exam card shows:
  - Title, description, question count
  - Best score (if user has attempted)
  - "Mulai Quiz" button (opens QuizModal)
  - "Lihat PDF" secondary action

### 4.2 Quiz History Tracking
- Store best score per subcategory
- Show "Best: 85%" badge on cards
- Track total quiz attempts

---

## Files to Create/Modify

### New Files:
```
src/
├── components/
│   ├── quiz/
│   │   ├── QuizCard.tsx
│   │   ├── QuizModal.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerOption.tsx
│   │   ├── SolutionPanel.tsx
│   │   ├── QuizResult.tsx
│   │   └── index.ts
│   └── auth/
│       └── AuthModal.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── quiz-data.ts
│   ├── quiz-store.ts
│   ├── firebase.ts
│   └── firebase-store.ts
└── types/
    └── index.ts (add new types)

scripts/
└── practice_generator/
    └── convert_to_json.py

public/
└── practice/
    └── data/
        ├── bahasa_indonesia.json
        ├── bahasa_inggris.json
        ├── matematika_osn.json
        ├── tka_matematika.json
        └── serkom.json
```

### Files to Modify:
- `src/app/practice/page.tsx` - Integrate quiz components
- `src/app/layout.tsx` - Add AuthProvider
- `src/lib/store.ts` - Add Firebase sync hooks
- `.env.local` - Add Firebase config (user needs to create)
- `package.json` - Add Firebase dependencies

---

## Implementation Order

1. **Part 1**: Convert Python to JSON (1 script run)
2. **Part 2.1-2.2**: Type definitions + Data loader
3. **Part 2.3**: Quiz components (QuizCard, QuestionCard, AnswerOption)
4. **Part 2.4**: Quiz state management
5. **Part 2.3 cont**: QuizModal, SolutionPanel, QuizResult
6. **Part 4**: Update practice page to use quiz
7. **Part 3.1-3.2**: Firebase setup + Auth context
8. **Part 3.3-3.4**: Firestore schema + Store integration
9. **Part 3.5-3.6**: Auth UI + Navigation updates

---

## User Actions Required

1. Create Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password + Google)
3. Create Firestore database
4. Add Firebase config to `.env.local`
5. Run `python scripts/practice_generator/convert_to_json.py`
6. Run `npm install firebase @react-firebase/auth @react-firebase/firestore`

---

## Estimated Effort
- Python conversion: ~30 min (script already has data)
- Quiz system: ~4-6 hours
- Firebase integration: ~3-4 hours
- Testing & polish: ~2 hours
- **Total: ~10-12 hours**
