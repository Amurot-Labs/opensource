#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const membersDir = path.resolve(__dirname, "../src/content/members");

if (!fs.existsSync(membersDir)) {
  console.log("No members directory found at:", membersDir);
  process.exit(0);
}

const entries = fs.readdirSync(membersDir, { withFileTypes: true });
let errors = 0;

console.log("🔍 Validating contributor markdown files...\n");

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const username = entry.name;
  const dirPath = path.join(membersDir, username);

  const profilePath = path.join(dirPath, "PROFILE.md");
  const projectsPath = path.join(dirPath, "PROJECTS.md");

  if (!fs.existsSync(profilePath)) {
    console.error(`❌ [${username}]: Missing PROFILE.md`);
    errors++;
  } else {
    const raw = fs.readFileSync(profilePath, "utf-8");
    if (!raw.startsWith("---")) {
      console.error(`❌ [${username}/PROFILE.md]: Missing YAML frontmatter block`);
      errors++;
    }
  }

  if (fs.existsSync(projectsPath)) {
    const raw = fs.readFileSync(projectsPath, "utf-8");
    if (!raw.startsWith("---")) {
      console.error(`❌ [${username}/PROJECTS.md]: Missing YAML frontmatter block`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n\x1b[31mValidation failed with ${errors} error(s).\x1b[0m`);
  process.exit(1);
} else {
  console.log("\x1b[32m✔ All member markdown files validated successfully!\x1b[0m\n");
}
