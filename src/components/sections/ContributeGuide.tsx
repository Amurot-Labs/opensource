import { GitFork, Terminal, FileCode2, GitPullRequest, ArrowRight, UploadCloud, CheckCircle2, Wrench } from 'lucide-react';
import { CodeSnippet } from '@/components/ui/CodeSnippet';

export function ContributeGuide() {
  const prerequisites = [
    { label: 'Git', version: '>= 2.30', desc: 'Installed & linked to GitHub' },
    { label: 'Node.js', version: '>= 18.x', desc: 'LTS (v20 / v22 recommended)' },
    { label: 'npm', version: '>= 9.x', desc: 'Default package manager' },
    { label: 'GitHub Account', version: 'Active', desc: 'For forking & creating PR' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Fork & Clone Repository',
      desc: 'Fork the repository on GitHub to your account, then clone it locally and install dependencies:',
      icon: GitFork,
      code: 'git clone https://github.com/<username>/opensource.git && cd opensource && npm install',
      hint: 'Replace <username> with your GitHub username',
    },
    {
      num: '02',
      title: 'Create Branch & Scaffold Folder',
      desc: 'Create a dedicated feature branch and scaffold your contributor folder automatically:',
      icon: Terminal,
      code: 'git checkout -b add-profile-<username> && npm run new-member <username>',
      hint: 'Creates src/content/members/<username>/ with PROFILE.md & PROJECTS.md',
    },
    {
      num: '03',
      title: 'Edit Content & Test Locally',
      desc: 'Fill in your bio, socials, and project details, preview your live microsite, and validate the schema:',
      icon: FileCode2,
      code: 'npm run dev && npm run validate',
      hint: 'Preview live at http://localhost:5173/@<username>',
    },
    {
      num: '04',
      title: 'Stage, Commit & Push',
      desc: 'Stage your folder only, commit with the standard convention, and push your branch to GitHub:',
      icon: UploadCloud,
      code: 'git add src/content/members/<username> && git commit -m "feat(members): add <username> profile and projects" && git push -u origin add-profile-<username>',
      hint: 'Only replace <username> with your handle',
    },
  ];

  const guiSteps = [
    'Open your browser and visit https://github.com/amurot-labs/opensource',
    'Click the green "Compare & pull request" banner displayed at the top',
    'Review your changes (ensure it only touches your src/content/members/<username>/ folder)',
    'Click "Create pull request" — once verified and merged, your site is live at oss.amurot.com/@<username>!',
  ];

  return (
    <section id="guide" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-1.5">
            <Terminal className="h-3.5 w-3.5" />
            <span>Developer Onboarding</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            How to Publish Your Project
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-secondary leading-relaxed">
            Publishing on Amurot Open Source takes 3 minutes. Verify prerequisites, run the CLI commands, and submit your Pull Request.
          </p>
        </div>

        {/* Prerequisites Card */}
        <div className="mb-6 card-surface p-5 sm:p-6 border-accent/20 bg-surface">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle text-accent border border-accent/20">
                <Wrench className="h-4 w-4" />
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-accent uppercase tracking-wider">
                  Prerequisites
                </span>
                <h3 className="font-display text-base font-bold text-primary">
                  System Requirements
                </h3>
              </div>
            </div>

            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <CodeSnippet code="git --version && node -v && npm -v" prefix="$" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-border-subtle">
            {prerequisites.map((req) => (
              <div
                key={req.label}
                className="p-2.5 rounded-xl bg-subtle border border-border-subtle flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-semibold text-xs text-primary">{req.label}</span>
                  <span className="font-mono text-[10px] text-accent px-1.5 py-0.5 rounded bg-accent-subtle font-medium">
                    {req.version}
                  </span>
                </div>
                <span className="text-[11px] text-muted truncate">{req.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Command Line Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="card-surface p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle text-accent border border-accent/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-base font-bold text-muted/50">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4">
                  <CodeSnippet code={step.code} />
                  <div className="mt-1.5 text-[11px] font-mono text-secondary">
                    💡 {step.hint}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step 05: GitHub Web GUI Walkthrough */}
        <div className="mt-6 card-surface p-5 sm:p-6 border-accent/30 bg-surface">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle text-accent border border-accent/20">
              <GitPullRequest className="h-4 w-4" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                Step 05 · GitHub GUI
              </span>
              <h3 className="font-display text-base font-bold text-primary">
                Open Your Pull Request on GitHub
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {guiSteps.map((stepText, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-subtle border border-border-subtle text-xs text-secondary leading-relaxed"
              >
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-semibold">Step {idx + 1}:</strong> {stepText}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-accent/15 via-rose-500/10 to-amber-500/10 border border-accent/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-primary">
              Ready to ship your open-source tools?
            </h3>
            <p className="mt-0.5 text-xs text-secondary max-w-lg">
              Scaffold your folder, push your branch, and get your developer microsite live on Amurot OSS.
            </p>
          </div>

          <a
            href="https://github.com/amurot-labs/opensource"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-accent py-2 px-4 text-xs shrink-0 shadow-sm"
          >
            <span>Open GitHub Repo</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
