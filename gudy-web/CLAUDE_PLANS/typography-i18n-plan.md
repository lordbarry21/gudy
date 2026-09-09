# Typography & i18n Enhancement Plan

## Overview
1. **Typography Upgrade**: Improve fonts with Steve Jobs-level intentionality - fonts with meaning
2. **Bilingual Support**: Add Indonesian/English language switch for UI elements

---

## Part 1: Typography Enhancement

### Current State
| Variable | CSS References | Actually Loaded |
|----------|---------------|----------------|
| `--font-display` | Fraunces | Fraunces ✓ |
| `--font-serif` | Source Serif 4 | **NOT LOADED** ✗ |
| `--font-sans` | Plus Jakarta Sans | **NOT LOADED** ✗ |

**Problem**: Inconsistency between layout.tsx (loads Fraunces, Literata, Sora) and globals.css (expects Source Serif 4, Plus Jakarta Sans).

### Steve Jobs Font Philosophy
Steve Jobs said: *"Typography has a voice. You have to choose typefaces the way you choose what someone sounds like when they speak."*

For this educational app:
- **Display/Headings** = Fraunces: Quirky, editorial soul - inspires confidence
- **Body/Learning** = Literata: Designed specifically for long-form digital reading
- **UI/Navigation** = Plus Jakarta Sans: Warm, friendly - Indonesian students feel at home

### Implementation

**1. Update `src/app/layout.tsx`:**
```typescript
// Remove Sora, add Plus Jakarta Sans
import { Fraunces, Literata, Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', ... })
const literata = Literata({ subsets: ['latin'], variable: '--font-body', ... })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-ui', ... })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif', ... })
```

**2. Update `src/styles/globals.css`:**
```css
:root {
  --font-display: 'Fraunces', Georgia, serif;  /* Editorial authority */
  --font-serif: 'Source Serif 4', Georgia, serif;  /* Reading comfort */
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;  /* Warm UI */
}
```

---

## Part 2: i18n Implementation

### Approach
Using Zustand for lightweight state management (already in project).

### File Structure
```
src/
├── lib/
│   └── i18n/
│       ├── translations.ts    # Translation files
│       └── useLanguage.ts     # Zustand language hook
└── components/
    └── LanguageSwitch.tsx     # Toggle button
```

### Translation Keys (UI elements only, NOT study materials)

| Key | Indonesian | English |
|-----|------------|---------|
| `nav.home` | Beranda | Home |
| `nav.learn` | Belajar | Learn |
| `nav.progress` | Progres | Progress |
| `nav.practice` | Latihan | Practice |
| `nav.profile` | Profil | Profile |
| `home.greeting` | based on time | based on time |
| `home.dailyStreak` | Streak Harian | Daily Streak |
| `home.target` | Target harian | Daily target |
| `home.overallProgress` | Progres Keseluruhan | Overall Progress |
| `home.topicsDone` | Topik Selesai | Topics Done |
| `home.studyTime` | Waktu Belajar | Study Time |
| `home.bestStreak` | Streak Terbaik | Best Streak |
| `home.subjects` | Mata Pelajaran | Subjects |
| `home.viewAll` | Lihat Semua | View All |
| `profile.title` | Profil Pengguna | User Profile |
| `profile.dailyTarget` | Target Belajar Harian | Daily Study Target |
| `profile.reminder` | Pengingat Belajar | Study Reminder |
| `profile.reset` | Reset Seluruh Progres | Reset All Progress |
| `profile.about` | Tentang Aplikasi | About App |
| `timer.focusMode` | Mode Fokus | Focus Mode |
| `timer.start` | Mulai Fokus | Start Focus |
| `timer.pause` | Pause | Pause |
| `timer.resume` | Lanjut | Resume |
| `timer.complete` | Selesai | Complete |
| `timer.reset` | Reset | Reset |
| `timer.break` | Istirahat | Break |
| `timer.dailyTarget` | Target Harian | Daily Target |
| `quiz.previous` | Sebelumnya | Previous |
| `quiz.next` | Selanjutnya | Next |
| `quiz.submit` | Submit | Submit |
| `quiz.result` | Hasil Quiz | Quiz Result |
| `quiz.correct` | Benar | Correct |
| `quiz.incorrect` | Salah | Incorrect |
| `theme.dark` | Dark Mode | Dark Mode |
| `theme.light` | Light Mode | Light Mode |
| `common.save` | Simpan | Save |
| `common.cancel` | Batal | Cancel |
| `common.confirm` | Konfirmasi | Confirm |

### Language Switch Component

**Location in Navigation:**
```
[Desktop Sidebar Footer]
┌─────────────────────────────┐
│  🌐 EN ▾                     │  ← Language switch (new)
│  ☀️ Light Mode  [Toggle]    │  ← Theme toggle (existing)
│                             │
│  Map Your Mastery           │
└─────────────────────────────┘
```

**Mobile Header:**
```
┌────────────────────────────────────────┐
│  📖 Gudy    [🌐] [☀️/🌙]              │
│             ↑ Language toggle          │
└────────────────────────────────────────┘
```

---

## Implementation Order

### Phase 1: Typography Fix
1. Update `layout.tsx` to load correct fonts
2. Update `globals.css` font references
3. Test all pages for font rendering

### Phase 2: i18n Infrastructure
1. Create `src/lib/i18n/translations.ts`
2. Create `src/lib/i18n/useLanguage.ts` (Zustand store)
3. Create `LanguageSwitch.tsx` component

### Phase 3: UI Translation
1. Update `navigation.tsx` - navigation labels + theme labels
2. Update `constants.ts` - remove hardcoded nav labels
3. Update `page.tsx` (home) - all UI text
4. Update `profile/page.tsx` - all UI text
5. Update `StudyTimer.tsx` - all UI text
6. Update `QuizModal.tsx` - all UI text

---

## Files to Modify

### New Files:
- `src/lib/i18n/translations.ts`
- `src/lib/i18n/useLanguage.ts`
- `src/components/LanguageSwitch.tsx`

### Modified Files:
- `src/app/layout.tsx` (font loading)
- `src/styles/globals.css` (font variables)
- `src/components/navigation/navigation.tsx` (i18n + switch)
- `src/lib/constants.ts` (remove hardcoded nav)
- `src/app/page.tsx` (home translations)
- `src/app/profile/page.tsx` (profile translations)
- `src/components/study-timer/StudyTimer.tsx` (timer translations)
- `src/components/quiz/QuizModal.tsx` (quiz translations)

---

## Estimated Effort
- Typography fix: 15 min
- i18n infrastructure: 30 min
- Component translations: 45 min
- Testing: 15 min
- **Total: ~1.5 hours**
