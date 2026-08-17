import { ArrowRight, GitPullRequest, Terminal } from 'lucide-react';
import { CodeSnippet } from '@/components/ui/CodeSnippet';

interface HeroProps {
  projectCount: number;
  memberCount: number;
}

export function Hero({ projectCount, memberCount }: HeroProps) {
  return (
    <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 overflow-hidden">
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] [background:radial-gradient(ellipse_60%_50%_at_50%_20%,var(--accent-glow),transparent_70%)] opacity-70"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-surface border border-border-card shadow-sm mb-6">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-secondary font-mono">Amurot Labs OSS</span>
          <span className="text-muted">·</span>
          <span className="text-muted font-mono">
            {projectCount > 0
              ? `${projectCount} Projects · ${memberCount} Creators`
              : 'Open for Submissions · Community Launchpad'}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight">
          Build in public.{' '}
          <span className="bg-gradient-to-r from-accent via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Ship with Amurot.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-secondary leading-relaxed max-w-2xl mx-auto font-normal">
          The decentralized open-source launchpad where colleagues, student builders, and open-source contributors publish their tools, apps, and microsites via simple Git PRs.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#/projects" className="btn-accent text-xs sm:text-sm py-2.5 px-5 shadow-sm">
            <span>Explore Projects</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="https://github.com/amurot-labs/opensource/pulls"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary text-xs sm:text-sm py-2.5 px-5"
          >
            <GitPullRequest className="h-4 w-4 text-accent" />
            <span>Add Your Profile (+PR)</span>
          </a>
        </div>

        {/* Interactive CLI Scaffolding Prompt */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="text-xs font-mono text-muted mb-2 flex items-center justify-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span>Scaffold your folder in 1 second</span>
          </div>
          <CodeSnippet code="npm run new-member your-github-username" />
        </div>
      </div>
    </section>
  );
}
