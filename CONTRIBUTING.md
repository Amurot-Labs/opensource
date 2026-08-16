# Contributing to Amurot Open Source

Thank you for contributing to Amurot Open Source! We welcome contributions from Amurot team members, GGV students, and developers from around the world.

---

## 🌟 How to Add Your Profile & Projects

We use a simple, Git-driven workflow to list creators and projects.

### Step 1: Fork and Clone
```bash
git clone https://github.com/<your-username>/opensource.git
cd opensource
git checkout -b add-<your-username>
npm install
```

### Step 2: Create Your Member Folder
Run the CLI generator:
```bash
npm run new-member <your-github-username>
```

This creates `src/content/members/<your-github-username>/` with two starter files:
- `PROFILE.md`
- `PROJECTS.md`

### Step 3: Customize `PROFILE.md`
Edit `PROFILE.md` with your information:
```markdown
---
username: "your-github-username"
name: "Your Full Name"
role: "Android Developer / Web Developer"
bio: "A brief one-line description of what you build and care about."
avatar: "https://github.com/your-github-username.png"
github: "https://github.com/your-github-username"
website: "https://your-portfolio.com"       # Optional
linkedin: "https://linkedin.com/in/username" # Optional
twitter: "https://x.com/username"          # Optional
location: "India"
institution: "Guru Ghasidas Vishwavidyalaya" # Optional
badges:
  - "Contributor"
  - "Android Lead"
---

## About
Write a short paragraph about yourself, your background, and your developer journey.
```

### Step 4: Add Your Projects to `PROJECTS.md`
Add your open-source tools, apps, or libraries:
```markdown
---
projects:
  - slug: "project-slug"
    title: "Project Name"
    tagline: "A concise 1-sentence description of the project."
    description: "Detailed overview explaining what the project does, key features, and problem it solves."
    category: "Android" # e.g. Android | Web | CLI | Library | AI | Tools
    techStack:
      - "Kotlin"
      - "Jetpack Compose"
    status: "Active" # Active | Shipped | WIP
    githubUrl: "https://github.com/your-username/project-repo"
    liveUrl: "https://your-project-live-demo.com" # Optional
    screenshot: "" # Optional path in /public/screenshots/
    featured: false
    highlights:
      - "Key feature or performance highlight 1"
      - "Key feature or performance highlight 2"
---
```

### Step 5: Test Locally
```bash
npm run dev
```
Open your browser to:
- `http://localhost:5173/` (To verify your project shows up in the directory)
- `http://localhost:5173/@your-github-username` (To preview your dedicated personal microsite)

Run the schema validation test:
```bash
npm run validate
```

### Step 6: Submit a Pull Request
1. Commit your changes:
   ```bash
   git add src/content/members/your-github-username/
   git commit -m "feat(members): add @your-github-username profile and projects"
   git push origin add-your-github-username
   ```
2. Open a Pull Request on [github.com/amurot-labs/opensource](https://github.com/amurot-labs/opensource).
3. Automated CI checks will validate your markdown schema. Once approved and merged, your portfolio and projects will go live on [oss.amurot.com](https://oss.amurot.com)!

---

## 📜 Acceptance Guidelines for Projects

- **Public Repository**: Projects must have a public, accessible GitHub repository.
- **Working Code**: Repositories should contain functional code and a readable `README.md`.
- **Open Source**: The project should have an open-source license (e.g. MIT, Apache 2.0, GPL).
- **Respectful & Original**: No plagiarized code or spam repositories.

---

## 💬 Questions or Help?

If you need help or run into any issues, please open a [GitHub Issue](https://github.com/amurot-labs/opensource/issues).
