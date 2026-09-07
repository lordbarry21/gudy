# Gudy — Developer & Demo Mode Guide 🛠️

Welcome to the **Developer & Demo** branch (`dev`) of Gudy!

This branch is specifically configured for development, feature testing, UI iteration, and demo presentation.

---

## 🚀 Quick Start for Developers

### 1. Environment Configuration
The application environment is managed via [`lib/core/config/app_config.dart`](file:///d:/Bari/Study%20Tracker%20App/lib/core/config/app_config.dart):
- `isDevMode`: `true`
- `showDebugBanner`: `true` (helps identify test builds)
- `enableDevTools`: `true` (enables developer action chips in Profile)

### 2. Running the App in Dev Mode
```bash
# Get packages
flutter pub get

# Run on connected device or emulator
flutter run
```

---

## 🧰 Developer & Demo Tools

When running on the `dev` branch, open **Profile → Developer & Demo Tools**:
- **+3 Streak (Demo)**: Instantly increments the study streak to test streak animations and badge unlocking thresholds without waiting days.
- **Reset Demo Data**: Reinitializes local Hive storage to fresh default state with all default curriculum topics intact.
- **Debug Banner**: Visible in the top-right corner to distinguish developer builds from release builds.

---

## 📦 Hive Local Database & Code Generation

Gudy uses Hive for ultra-fast offline storage. Whenever you modify a model (`@HiveType` or `@HiveField` in `lib/data/models/`):

1. Run the build runner:
   ```bash
   dart run build_runner build --delete-conflicting-outputs
   ```
2. Ensure new adapters are registered in [`lib/data/local/hive_service.dart`](file:///d:/Bari/Study%20Tracker%20App/lib/data/local/hive_service.dart).

---

## 🧪 Testing & Code Quality

Run tests and static analysis before pushing commits:

```bash
# Run static analysis
flutter analyze

# Run unit and widget tests
flutter test
```

---

## 🌿 Git Workflow & Release Promotion

```
   dev (Active feature development & demo testing)
    │
    ▼ (Tested & Verified)
   main (Publish / Production Mode: stable, clean, tagged releases)
```

1. Create feature branch from `dev`:
   ```bash
   git checkout dev
   git checkout -b feature/new-curriculum-topic
   ```
2. Commit with conventional commit messages:
   ```bash
   git commit -m "feat: add discrete mathematics curriculum tree"
   ```
3. Merge back into `dev` after testing.
4. When ready for production publish, create a PR from `dev` to `main`.
