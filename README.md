# Gudy — Guides Study 📚✨

[![Flutter](https://img.shields.io/badge/Flutter-3.27.4-02569B?logo=flutter&logoColor=white)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.6.2-0175C2?logo=dart&logoColor=white)](https://dart.dev)
[![State Management](https://img.shields.io/badge/State-Riverpod%202.6-blueviolet)](https://riverpod.dev)
[![Storage](https://img.shields.io/badge/Database-Hive%202.2-FFA000)](https://docs.hivedb.dev)
[![Platform](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS-brightgreen)](https://flutter.dev)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Branch](https://img.shields.io/badge/Branch-dev%20(Developer%20%26%20Demo%20Mode)-orange?logo=git&logoColor=white)](DEVELOPMENT.md)
[![Code Style](https://img.shields.io/badge/Style-Flutter%20Lints-00B4AB)](https://pub.dev/packages/flutter_lints)

> [!NOTE]
> **Developer & Demo Mode Branch (`dev`)**: This branch contains developer tooling, demo quick actions in Profile, and active development features. Refer to [DEVELOPMENT.md](DEVELOPMENT.md) for developer documentation. For the stable production publish release, switch to the [`main`](https://github.com/lordbarry21/gudy/tree/main) branch.

> **Gudy** (Guides Study) is an intuitive, offline-first study companion designed for students preparing for high-stakes examinations: **OSN (National Science Olympiad)**, **TKA Matematika**, **Language Mastery**, and **Vocational Certifications (Serkom Laravel/RPL)**.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Curriculum Breakdown](#-curriculum-breakdown)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Branch Strategy](#-branch-strategy)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Preparing for specialized academic and vocational competitions requires disciplined habit tracking, structured curriculum mapping, and prompt-driven active recall. **Gudy** solves this with:
- A hierarchical interactive **Tree View** for deep curriculum navigation.
- Actionable **Checklist Progress Tracking** with persistence.
- Instant **AI Prompt Generation** tailored for GPT/Gemini to deliver focused exercises and error analysis.
- Gamified **Daily Streaks** and milestone badges to keep momentum alive.

---

## 🚀 Key Features

- 🌳 **Interactive Curriculum Tree**: Visualize subject hierarchies from high-level categories down to sub-topics and specific test objectives.
- ✅ **Progress & Mastery Checklists**: Track your study status per topic (Not Started, In Progress, Mastered).
- 🤖 **One-Tap AI Study Prompt Generator**: Generate formatted prompt templates ready to copy-paste into ChatGPT or Gemini for instant deep-dive lessons and practice problems.
- 🔥 **Streak & Habit Tracking**: Automatic daily streak calculation to foster consistent daily study sessions.
- 🏆 **Achievement Badges**: Unlock milestones as you complete topic trees and maintain study streaks.
- 🌙 **Dark-Mode-First UI**: High-contrast, OLED-friendly dark palette inspired by modern developer tooling.
- ⚡ **Ultra-Lightweight & Offline-First**: Zero mandatory cloud dependency; sub-second cold starts powered by Hive NoSQL storage.

---

## 📚 Curriculum Breakdown

### 📐 Matematika OSN / High School Olympiad
- **Aljabar**: Persamaan, Pertidaksamaan, Polinomial, Fungsi, Barisan & Deret
- **Analisis & Kalkulus**: Limit, Turunan, Integral, Teorema Nilai Rata-Rata
- **Geometri**: Segitiga, Lingkaran, Trigonometri Lanjut, Geometri Analitik
- **Teori Bilangan**: Keterbagian, Bilangan Prima, Modulo, Fungsi Aritmatika
- **Kombinatorika**: Kaidah Pencacahan, Prinsip Sarang Merpati (PHP), Binomial Newton, Teori Graf

### 📊 TKA Matematika (Tes Kemampuan Akademik)
- Matematika Dasar & Aljabar Elementer
- Matematika Tingkat Lanjut & Penerapan Soal Penalaran

### 🌐 Bahasa
- **Bahasa Indonesia**: Pemahaman Bacaan, Tata Bahasa Baku (PUEBI), Penalaran Analitis
- **Bahasa Inggris**: Reading Comprehension, Grammar Mastery, Academic Vocabulary

### 💻 Sertifikasi Kompetensi (Serkom) Rekayasa Perangkat Lunak
- **Laravel Fundamentals**: Routing, Controllers, Blade & Eloquent ORM
- **Software Engineering Standards**: SDLC, Database Normalization, MVC Architecture
- **Practical Exam Readiness**: CRUD implementation, authentication, and API endpoints

---

## 🏗 Architecture & Tech Stack

Gudy adheres to **Feature-First Architecture** with strict separation of presentation, business logic, and local data persistence.

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                   │
│      (Widgets, Screens, Router, Design System)         │
└────────────────────────────┬────────────────────────────┘
                             │ State Watching
┌────────────────────────────▼────────────────────────────┐
│                  State Management Layer                 │
│              (Riverpod Notifiers & Providers)           │
└────────────────────────────┬────────────────────────────┘
                             │ Data Operations
┌────────────────────────────▼────────────────────────────┐
│                    Repository Layer                     │
│    (SubjectRepository, ProgressRepository, Seeders)     │
└────────────────────────────┬────────────────────────────┘
                             │ Storage Driver
┌────────────────────────────▼────────────────────────────┐
│                   Local Storage Layer                   │
│                 (Hive Boxes & TypeAdapters)             │
└─────────────────────────────────────────────────────────┘
```

### Core Technologies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Flutter 3.27.4](https://flutter.dev) | High performance, cross-platform UI engine |
| **Language** | [Dart 3.6.2](https://dart.dev) | Strongly typed, sound null safety |
| **State Management** | [Flutter Riverpod 2.6](https://riverpod.dev) | Reactive, compile-safe state container |
| **Local Database** | [Hive 2.2](https://docs.hivedb.dev) | Ultra-fast lightweight embedded key-value store |
| **Routing** | [GoRouter 14.8](https://pub.dev/packages/go_router) | Declarative URL-based routing |
| **Typography** | Inter ([Google Fonts](https://fonts.google.com/specimen/Inter)) | Clean, modern sans-serif typography |

---

## 🌿 Branch Strategy

This repository maintains two primary branches:

| Branch | Mode | Description |
| :--- | :--- | :--- |
| `main` | **Publish / Production Mode** | Clean, production-ready release branch with stable configurations and clean documentation. |
| `dev` | **Developer & Demo Mode** | Active development environment containing developer tooling, debug helpers, and testing setups. |

---

## 🚀 Getting Started

### Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) (`^3.27.0`)
- [Dart SDK](https://dart.dev/get-dart) (`^3.6.0`)
- Android Studio / VS Code with Flutter extensions
- Android Device or Emulator with API 21+

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lordbarry21/gudy.git
   cd gudy
   ```

2. **Install project dependencies:**
   ```bash
   flutter pub get
   ```

3. **Run code generation (if modifying Hive models):**
   ```bash
   dart run build_runner build --delete-conflicting-outputs
   ```

4. **Launch the application:**
   ```bash
   flutter run
   ```

5. **Build Release APK:**
   ```bash
   flutter build apk --release
   ```

---

## 📂 Project Structure

```
lib/
├── core/                   # Global foundations
│   ├── theme/             # AppTheme, AppColors, AppTypography
│   ├── constants/         # Global constants & keys
│   └── utils/             # Helper utilities & extensions
├── data/                  # Data tier
│   ├── local/             # HiveService, box initialization
│   ├── models/            # Domain models (Subject, Topic, Progress, Achievement)
│   └── repositories/      # SubjectRepository, ProgressRepository
├── features/              # Feature modules (Feature-First)
│   ├── home/              # Dashboard & daily goal tracker
│   ├── learn/             # Subject tree view & topic detail screen
│   ├── practice/          # Quiz & practice interface
│   ├── progress/          # Statistics & achievement showcase
│   └── profile/           # Settings & user preferences
├── router/                # Declarative routes (AppRouter)
├── shared/                # Cross-feature widgets & animations
└── main.dart              # Application bootstrap & entrypoint
```

---

## 🎨 Design System

- **Background Canvas**: `#0A0A0A` (Deep Obsidian)
- **Surface Cards**: `#1A1A1A` (Charcoal Slate)
- **Accent Emerald**: `#4ADE80` (Progress & Success)
- **Accent Amber**: `#FBBF24` (In Progress)
- **Accent Flame**: `#FF6B35` (Daily Streaks)
- **Typography**: Inter (Variable Font Weights: 400, 500, 600, 700)

---

## 🤝 Contributing

Contributions are welcome! If you would like to add curriculum topics or enhance features:

1. Switch to the `dev` branch:
   ```bash
   git checkout dev
   ```
2. Create a feature branch:
   ```bash
   git checkout -b feature/topic-algebra-update
   ```
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat(curriculum): add combinatorics graph theory modules"
   ```
4. Push to your branch and open a Pull Request into `dev`.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>Made with ❤️ for students preparing for OSN, TKA, and certifications</b><br>
  <sub>Maintained by <a href="https://github.com/lordbarry21">@lordbarry21</a></sub>
</p>
