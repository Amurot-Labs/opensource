# Amurot Open Source (`oss.amurot.com`) — Master Architecture & Implementation Plan

> **Amurot Open Source** is a community-driven launchpad and open-source directory where Amurot team members, GGV college peers, and global developers can showcase their open-source projects, tools, and microsites via Git Pull Requests.

---

## 1. Vision & Core Philosophy

- **Decentralized, Git-Powered Publishing**: Anyone can publish and showcase their profile, projects, and custom portfolio page simply by adding a folder under `src/content/members/<username>/` containing `PROFILE.md` and `PROJECTS.md`, then opening a Pull Request.
- **Dedicated Colleague Microsites (`oss.amurot.com/@username`)**: Every member gets a personal, high-design developer portfolio page hosted directly on the platform, while also linking out to their custom domains.
- **Interactive Project Inspection**: Instant slide-over drawer modals for quick project inspection without jarring page navigations.
- **Zero-Friction Scaffolding**: Built-in CLI command (`npm run new-member <username>`) that instantly creates a new contributor folder pre-populated with clean templates.
- **Automated CI Validation**: A dedicated GitHub Actions workflow verifies markdown frontmatter integrity on every incoming PR to guarantee unbreakable builds.

---

## 2. Information Architecture & URL Routing

```
Route Architecture:
├── /                         -> HomePage (Hero, Spotlight Projects, Tech Stack Filter, Active Contributors)
├── /projects                 -> Full Project Catalog (Live Search, Category & Stack Filters)
├── /members                  -> Contributor Wall & Colleague Directory
├── /@:username               -> Dynamic Member Microsite (Personal Bio, Badges, Repositories, Social Links)
└── /guide                    -> Step-by-Step Contributor Onboarding & Scaffolding Guide
```

### UI Section Layout:
```
┌────────────────────────────────────────────────────────────────────────┐
│  [▲ Amurot OSS]      [Projects] [Members] [Guide]    [☀️/🌙] [GitHub] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   HERO: Decentralized Open Source for Builders and Creators.           │
│   "Ship your tools, build in public, and launch with Amurot Labs."     │
│   [Explore Catalog]  [Add Your Profile (+PR)]                          │
│                                                                        │
│   SPOTLIGHT / FEATURED PROJECTS                                        │
│   High-contrast cards with screenshots, tech tags, and GitHub badges.  │
│                                                                        │
│   PROJECTS DIRECTORY (Search + Tech Stack Filter)                      │
│   Filter by: Kotlin · React · Python · Flutter · CLI · Rust · AI       │
│                                                                        │
│   CREATORS & COLLEAGUES WALL                                           │
│   Member cards linking to dedicated `/@username` microsites.           │
│                                                                        │
│   STEP-BY-STEP CONTRIBUTOR ONBOARDING                                  │
│   1. `npm run new-member <name>`  2. Edit markdown  3. Submit PR       │
│                                                                        │
│   FOOTER & ECOSYSTEM ATTRIBUTION                                       │
│   Amurot Labs · amurot.com · bhaskar.amurot.com · linkerly.amurot.com  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Contributor File Specification (`src/content/members/`)

Each colleague creates a folder: `src/content/members/<username>/`:

### 3.1. `PROFILE.md` (Author Profile & Microsite Data)
```markdown
---
username: "binarybhaskar"
name: "Bhaskar Patel"
role: "Founder @ Amurot · Android Developer"
bio: "Building local-first Android apps, developer utilities, and open source tooling."
avatar: "https://github.com/binarybhaskar.png"
github: "https://github.com/binarybhaskar"
website: "https://bhaskar.amurot.com"
linkedin: "https://linkedin.com/in/binarybhaskar"
twitter: "https://x.com/binarybhaskar"
location: "India"
institution: "Guru Ghasidas Vishwavidyalaya"
badges:
  - "Core Maintainer"
  - "SIH 2025 Winner"
---

## About
Hi! I'm Bhaskar, an Android engineer and founder at Amurot. I focus on offline-first architectures, Jetpack Compose UI, and developer tooling.
```

### 3.2. `PROJECTS.md` (Project Entries)
```markdown
---
projects:
  - slug: "linkerly"
    title: "Linkerly"
    tagline: "A modern, local-first Android bookmark manager."
    description: "Organize, search, and access web bookmarks offline in milliseconds with sub-millisecond local search."
    category: "Android"
    techStack:
      - "Kotlin"
      - "Jetpack Compose"
      - "Room DB"
      - "Coroutines"
    status: "Shipped"
    githubUrl: "https://github.com/amurot-labs/linkerly"
    liveUrl: "https://linkerly.amurot.com"
    screenshot: "/screenshots/linkerly.png"
    featured: true
    highlights:
      - "Offline-first architecture with instant full-text search"
      - "Material 3 dynamic theming & custom gestures"
      - "Published on Google Play Store"

  - slug: "android-compose-kit"
    title: "Android Compose Kit"
    tagline: "Modular UI components and animation primitives for Jetpack Compose."
    description: "A plug-and-play UI kit for rapid Android prototyping."
    category: "Library"
    techStack:
      - "Kotlin"
      - "Jetpack Compose"
    status: "Active"
    githubUrl: "https://github.com/amurot-labs/compose-kit"
    featured: false
---
```

---

## 4. Technical Architecture & Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript + Vite | Blazing fast build times, client-side routing, type safety |
| **Design & Theming** | Developer Editorial (Dark/Light Hybrid) | Monospaced tags, syntax-accented cards, and theme switcher |
| **Icons** | `lucide-react` | Crisp, modern developer UI icons |
| **Content Engine** | Vite `import.meta.glob` + Frontmatter Parser | Bundles member markdown at build time into typed JSON |
| **Modals & Animations**| CSS Transitions & Tailwind Tokens | Lightweight slide-over drawers with zero bundle bloat |
| **CLI Generator** | Node.js Scaffolder (`scripts/new-member.js`) | One-line folder generation for newcomers |
| **CI / PR Check** | GitHub Actions (`.github/workflows/validate.yml`) | Validates member frontmatter on every incoming PR |
| **Hosting** | Vercel (`oss.amurot.com`) | Instant global edge CDN and automatic PR preview URLs |

---

## 5. Directory Structure

```
AmurotOpenSource/
├── PLAN.md                          # Master architecture guide
├── index.html                       # HTML entry point with OpenGraph and SEO tags
├── package.json                     # Scripts (dev, build, validate, new-member)
├── vite.config.ts                   # Path aliases (@/*)
├── scripts/
│   ├── new-member.js                # CLI scaffolding script: npm run new-member <username>
│   └── validate-content.js          # CI validator for incoming PRs
├── .github/
│   └── workflows/
│       └── validate-pr.yml          # Automated GitHub Actions PR check
├── public/
│   ├── favicon.png
│   ├── amurot-oss-logo.svg
│   └── screenshots/
└── src/
    ├── main.tsx
    ├── App.tsx                      # Hash/Browser router handling /projects, /members, /@username
    ├── styles.css                   # Dark/Light CSS tokens and typography
    ├── content/
    │   └── members/                 # Contributor folders
    │       ├── binarybhaskar/
    │       │   ├── PROFILE.md
    │       │   └── PROJECTS.md
    │       └── template/            # Starter template
    │           ├── PROFILE.md
    │           └── PROJECTS.md
    ├── lib/
    │   ├── content-loader.ts        # Parses and aggregates member markdown
    │   ├── types.ts                 # Typed schemas for Member, Project, Badge
    │   └── theme-context.tsx        # Dark/Light theme state
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx           # Logo, nav links, theme toggle, and GitHub link
    │   │   └── Footer.tsx           # Amurot Labs ecosystem links
    │   ├── sections/
    │   │   ├── Hero.tsx             # Main hero with PR submission CTA
    │   │   ├── FeaturedProjects.tsx # Spotlight top community projects
    │   │   ├── ProjectDirectory.tsx # Filterable search grid by tech & category
    │   │   ├── MembersWall.tsx      # Colleague directory grid
    │   │   └── ContributeGuide.tsx  # Step-by-step PR guide with copyable commands
    │   └── ui/
    │       ├── ProjectCard.tsx      # Project tile with tags & drawer trigger
    │       ├── ProjectModal.tsx     # Slide-over project detail drawer
    │       ├── MemberCard.tsx       # Contributor profile tile
    │       ├── TechBadge.tsx        # Styled tech stack pill
    │       └── CodeSnippet.tsx      # Copyable terminal command block
    └── pages/
        ├── HomePage.tsx             # Unified main dashboard
        ├── ProjectsPage.tsx         # Dedicated project catalog
        ├── MembersPage.tsx          # Dedicated members directory
        ├── MemberProfilePage.tsx    # Dedicated /@username personal microsite
        └── GuidePage.tsx            # Full contribution tutorial
```

---

## 6. Implementation Checklist

- [ ] **Phase 1: Project Setup & Scaffolding Tool**
  - Set up `vite.config.ts` aliases (`@/*`).
  - Configure `styles.css` with Dark/Light theme tokens, typography, and clean syntax highlights.
  - Create `scripts/new-member.js` and `scripts/validate-content.js`.
- [ ] **Phase 2: Content Parsing & Starter Template**
  - Build `src/lib/content-loader.ts` to dynamically parse `src/content/members/*` files.
  - Create `template/` and initial founder files for `binarybhaskar`.
- [ ] **Phase 3: Core UI & Slide-Over Drawers**
  - Implement `Navbar.tsx`, `Hero.tsx`, `TechBadge.tsx`, and `ProjectCard.tsx`.
  - Build `ProjectModal.tsx` slide-over drawer.
- [ ] **Phase 4: Dynamic Member Microsite (`/@username`)**
  - Build `MemberProfilePage.tsx` rendering custom developer portfolio pages for each member.
- [ ] **Phase 5: Search & Tech Filtering**
  - Implement real-time fuzzy/keyword search and multi-tag filtering across projects.
- [ ] **Phase 6: Contributor Guide & GitHub Actions**
  - Build `ContributeGuide.tsx` with copy-paste commands.
  - Create `.github/workflows/validate-pr.yml` for automated CI checks.
- [ ] **Phase 7: Mobile Polish & Ecosystem Integration**
  - Test responsiveness across mobile, tablet, and desktop viewports.
  - Add SEO metadata and footer backlinks to `amurot.com`, `bhaskar.amurot.com`, and `linkerly.amurot.com`.
