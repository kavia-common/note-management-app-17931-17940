Scripts:
- ensure-gradle.mjs: used in CI to safely skip Gradle when the native Android project hasn't been generated yet (Expo managed workflow).
- run-gradle-if-present.mjs: runs Gradle only if the wrapper exists.
- build script: uses run-gradle-if-present.mjs; if gradlew exists, it runs Gradle; otherwise it exits successfully.
- build:full-android: runs expo prebuild then gradle assembleDebug.

Note: In some CI environments you may need to ensure execute permissions:
- chmod +x android/gradlew
- chmod +x android/gradle/gradle
- chmod +x gradle-check.sh
