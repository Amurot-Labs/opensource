# Amurot Open Source (`oss.amurot.com`)

> The decentralized open-source launchpad and project directory for Amurot team members, GGV college peers, and community builders.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Live Portal](https://img.shields.io/badge/Live-oss.amurot.com-FF2056.svg)](https://oss.amurot.com)

---

## 🚀 What is Amurot Open Source?

Amurot Open Source is a Git-driven community showcase. Any colleague, student builder, or developer can publish their profile, open-source projects, and personal microsite simply by adding a folder under `src/content/members/<username>/` and submitting a Pull Request.

### Key Features
- **Decentralized Publishing**: No logins, no backend database. Everything is defined in human-readable Markdown (`PROFILE.md` and `PROJECTS.md`).
- **Dedicated Colleague Microsites**: Every contributor gets a custom developer portfolio at `oss.amurot.com/@username`.
- **Slide-Over Project Drawers**: Fast, interactive project inspection with screenshots, key highlights, and direct repository links.
- **Automated CI Validation**: Pull requests are automatically verified with schema checks before merging.
- **Fast Developer Workflow**: Scaffold a new member folder in 1 second with `npm run new-member <username>`.

---

## 🛠️ Quick Start for Contributors

### 1. Clone the repository
```bash
git clone https://github.com/amurot-labs/opensource.git
cd opensource
npm install
```

### 2. Scaffold your member profile
```bash
npm run new-member your-github-username
```
This generates `src/content/members/your-github-username/` containing:
- `PROFILE.md` — Your name, bio, avatar, socials, and badges.
- `PROJECTS.md` — Your open-source projects, tags, descriptions, and repo links.

### 3. Test locally
```bash
npm run dev
```
Visit `http://localhost:5173/@your-github-username` to preview your live microsite and projects!

### 4. Submit a Pull Request
Commit your files, push to your fork, and open a Pull Request. Once merged, your profile and projects will be deployed live to [oss.amurot.com](https://oss.amurot.com)!

For detailed instructions, read [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🏛️ Amurot Ecosystem

- **Studio Apex**: [amurot.com](https://amurot.com)
- **Founder Portfolio**: [bhaskar.amurot.com](https://bhaskar.amurot.com)
- **Flagship App (Linkerly)**: [linkerly.amurot.com](https://linkerly.amurot.com)
- **Open Source Hub**: [oss.amurot.com](https://oss.amurot.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
