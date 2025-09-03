# Notes App (React Native / Expo)

Features:
- UI-only authentication (Login/Signup)
- Notes CRUD (create, edit, delete)
- List and search notes
- Sync placeholder (no real backend)
- Light/Dark theme switching
- Modern UI with primary #1976D2, accent #FFCA28, secondary #424242
- Floating action button and header navigation

How to run:
- Install dependencies: npm install
- Start: npm start (or npm run android / ios / web)

CI/Build notes:
- Managed workflow by default (Expo). Native Android project may not exist until you run prebuild.
- A gradle wrapper shim is included at android/gradlew to avoid CI failures that call Gradle directly when no native project exists.
- To avoid CI failures when Gradle is invoked without a native project, you can:
  - npm run build (skips if gradlew is absent), or
  - ./gradle-check.sh (skips if gradlew is absent), or
  - npm run build:full-android to generate native project and build it.

Project structure:
- src/theme: theme provider and colors
- src/context: notes state and persistence (AsyncStorage)
- src/components: shared UI components
- src/screens: app screens
- src/navigation: minimal in-app navigator (no external router)

Notes data is stored locally using AsyncStorage; no backend required.
