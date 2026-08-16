#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const username = process.argv[2];

if (!username) {
  console.error("\x1b[31m%s\x1b[0m", "Error: Please provide a GitHub username.");
  console.log("Usage: npm run new-member <github-username>");
  process.exit(1);
}

const sanitized = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
const targetDir = path.resolve(__dirname, "../src/content/members", sanitized);

if (fs.existsSync(targetDir)) {
  console.warn("\x1b[33m%s\x1b[0m", `Warning: Member folder already exists at: ${targetDir}`);
  process.exit(0);
}

fs.mkdirSync(targetDir, { recursive: true });

const profileContent = `---
username: "${sanitized}"
name: "${sanitized}"
role: "Software Developer"
bio: "Building thoughtful open source software with Amurot Labs."
avatar: "https://github.com/${sanitized}.png"
github: "https://github.com/${sanitized}"
website: ""
linkedin: ""
twitter: ""
location: "India"
institution: "Guru Ghasidas Vishwavidyalaya"
badges:
  - "Contributor"
---

## About Me
Tell the community about what you build, your favorite technologies, and what you're working on!
`;

const projectsContent = `---
projects:
  - slug: "my-first-project"
    title: "My Open Source Tool"
    tagline: "A concise summary of what this tool accomplishes."
    description: "Full description of your project, key capabilities, and architectural details."
    category: "Android"
    techStack:
      - "Kotlin"
      - "Jetpack Compose"
    status: "Active"
    githubUrl: "https://github.com/${sanitized}/my-first-project"
    liveUrl: ""
    featured: true
    highlights:
      - "Core capability 1"
      - "Core capability 2"
---
`;

fs.writeFileSync(path.join(targetDir, "PROFILE.md"), profileContent, "utf-8");
fs.writeFileSync(path.join(targetDir, "PROJECTS.md"), projectsContent, "utf-8");

console.log("\x1b[32m%s\x1b[0m", `✔ Successfully created member profile at: src/content/members/${sanitized}/`);
console.log("\x1b[36m%s\x1b[0m", "Next steps:");
console.log(`  1. Edit src/content/members/${sanitized}/PROFILE.md`);
console.log(`  2. Edit src/content/members/${sanitized}/PROJECTS.md`);
console.log("  3. Run 'npm run dev' to preview your page at http://localhost:5173/@" + sanitized);
