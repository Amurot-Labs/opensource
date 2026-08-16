import { ArrowUpRight, Heart } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { AmurotLogo } from '@/components/ui/AmurotLogo';

export function Footer() {
  return (
    <footer className="mt-14 sm:mt-20 border-t border-border-subtle bg-surface/50 pt-10 sm:pt-12 pb-8 sm:pb-10 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-border-subtle">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <a href="#/" className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 border border-accent/20">
                <AmurotLogo size={16} color="#FF2056" />
              </div>
              <span className="font-display font-bold text-base text-primary">
                amurot<span className="text-accent">.oss</span>
              </span>
            </a>
            <p className="mt-2 text-xs text-muted leading-relaxed max-w-sm">
              The decentralized open-source launchpad and project directory for Amurot team members, GGV college peers, and community builders.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <a
                href="https://github.com/amurot-labs/opensource"
                target="_blank"
                rel="noreferrer noopener"
                className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-subtle transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
              Explore
            </h4>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              <li>
                <a href="#/projects" className="text-secondary hover:text-accent transition-colors">
                  Project Catalog
                </a>
              </li>
              <li>
                <a href="#/members" className="text-secondary hover:text-accent transition-colors">
                  Creators & Colleagues
                </a>
              </li>
              <li>
                <a href="#/guide" className="text-secondary hover:text-accent transition-colors">
                  Contributor Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Amurot Ecosystem */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
              Amurot Network
            </h4>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              <li>
                <a
                  href="https://amurot.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-secondary hover:text-accent transition-colors"
                >
                  <span>amurot.com</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://bhaskar.amurot.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-secondary hover:text-accent transition-colors"
                >
                  <span>bhaskar.amurot.com</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkerly.amurot.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-secondary hover:text-accent transition-colors"
                >
                  <span>linkerly.amurot.com</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted">
          <div className="flex items-center gap-1">
            <span>Open source under MIT License. Crafted with</span>
            <Heart className="h-3 w-3 text-accent inline fill-accent" />
            <span>by Amurot Labs.</span>
          </div>

          <div className="font-mono">
            oss.amurot.com
          </div>
        </div>
      </div>
    </footer>
  );
}
