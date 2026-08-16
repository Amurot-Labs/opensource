import { GitFork, Terminal, FileCode2, GitPullRequest, ArrowRight } from 'lucide-react';
import { CodeSnippet } from '@/components/ui/CodeSnippet';

export function ContributeGuide() {
  const steps = [
    {
      num: '01',
      title: 'Fork and Clone',
      desc: 'Fork the repository on GitHub and clone your fork to your local machine.',
      icon: GitFork,
      code: 'git clone https://github.com/<your-username>/opensource.git && cd opensource && npm install',
    },
    {
      num: '02',
      title: 'Scaffold Your Folder',
      desc: 'Use the built-in generator to automatically create your member profile and projects file in 1 second.',
      icon: Terminal,
      code: 'npm run new-member your-github-username',
    },
    {
      num: '03',
      title: 'Add Bio & Projects',
      desc: 'Fill in your name, bio, socials in PROFILE.md and list your open-source projects in PROJECTS.md.',
      icon: FileCode2,
      code: 'npm run dev',
    },
    {
      num: '04',
      title: 'Validate and Open PR',
      desc: 'Run the schema test, commit your changes, and open a Pull Request. Once merged, it goes live!',
      icon: GitPullRequest,
      code: 'npm run validate && git push origin add-my-profile',
    },
  ];

  return (
    <section id="guide" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-1.5">
            <Terminal className="h-3.5 w-3.5" />
            <span>Developer Onboarding</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            How to Publish Your Project
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-secondary leading-relaxed">
            Publishing on Amurot Open Source takes 3 minutes. No database or backend accounts required — just clean Markdown and a Git Pull Request.
          </p>
        </div>

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
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-accent/15 via-rose-500/10 to-amber-500/10 border border-accent/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-primary">
              Ready to ship your open-source tools?
            </h3>
            <p className="mt-0.5 text-xs text-secondary max-w-lg">
              Join the community today and get your projects showcased in the official Amurot directory.
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
