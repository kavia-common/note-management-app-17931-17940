#!/usr/bin/env node
/**
 * Ensures the Android Gradle wrapper exists before attempting to run Gradle.
 * If the wrapper is missing (managed workflow without prebuild), exit with 0 after logging a notice.
 * CI can call this to avoid failing builds that run gradle checks unconditionally.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const androidDir = path.join(__dirname, '..', 'android');
const gradlew = path.join(androidDir, 'gradlew');

if (!fs.existsSync(androidDir) || !fs.existsSync(gradlew)) {
  // eslint-disable-next-line no-console
  console.log('[ensure-gradle] Android project or gradlew not found. Skipping Gradle step.');
  process.exit(0);
}

// If gradle exists, return non-zero to indicate caller should proceed to Gradle invocation.
// eslint-disable-next-line no-console
console.log('[ensure-gradle] Gradle wrapper found. Proceeding.');
process.exit(2);
