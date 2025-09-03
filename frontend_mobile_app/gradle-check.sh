#!/usr/bin/env bash
set -euo pipefail

ANDROID_DIR="$(cd "$(dirname "$0")" && pwd)/android"

if [ ! -d "$ANDROID_DIR" ] || [ ! -f "$ANDROID_DIR/gradlew" ]; then
  echo "[gradle-check] Android project or gradlew not found. Skipping Gradle step."
  exit 0
fi

echo "[gradle-check] Gradle wrapper found. Running assembleDebug..."
( cd "$ANDROID_DIR" && ./gradlew assembleDebug )
