#!/usr/bin/env node
/**
 * Runs Android Gradle build only if the Gradle wrapper exists.
 * Exits 0 when gradle is not present (managed workflow without prebuild).
 */
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const androidDir = path.join(__dirname, '..', 'android');
const gradlew = path.join(androidDir, 'gradlew');

if (!fs.existsSync(androidDir) || !fs.existsSync(gradlew)) {
  // eslint-disable-next-line no-console
  console.log('[run-gradle-if-present] gradlew not found. Skipping Gradle build.');
  process.exit(0);
}

// Run ./gradlew assembleDebug
const proc = spawn('./gradlew', ['assembleDebug'], {
  cwd: androidDir,
  stdio: 'inherit',
  shell: true,
});

proc.on('close', (code) => {
  process.exit(code ?? 1);
});
