import { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, User, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import type { Project } from '@/lib/types';
import { TechBadge } from './TechBadge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface border border-border-card p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-muted hover:text-primary hover:bg-subtle transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto pr-1">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider bg-subtle text-muted border border-border-subtle">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{project.status}</span>
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Featured Project
              </span>
            )}
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
            {project.title}
          </h2>
          <p className="mt-1.5 text-sm text-secondary leading-relaxed">
            {project.tagline}
          </p>

          {/* Description */}
          <div className="mt-5 pt-5 border-t border-border-subtle">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
              Overview
            </h3>
            <p className="mt-2 text-sm text-secondary leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
                Key Highlights
              </h3>
              <ul className="mt-2.5 space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-secondary">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mt-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
              Technologies & Stack
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <TechBadge key={tech} name={tech} size="md" />
              ))}
            </div>
          </div>

          {/* Creator Attribution */}
          <div className="mt-6 p-3.5 rounded-xl bg-subtle border border-border-subtle flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={project.author.avatar}
                alt={project.author.name}
                className="h-9 w-9 rounded-full object-cover border border-border-subtle"
              />
              <div>
                <div className="text-xs font-semibold text-primary">
                  {project.author.name}
                </div>
                <div className="text-[11px] text-muted">
                  {project.author.role}
                </div>
              </div>
            </div>

            <a
              href={`#/@${project.author.username}`}
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              <User className="h-3.5 w-3.5" />
              <span>View Profile</span>
            </a>
          </div>

          {/* Action Links */}
          <div className="mt-6 pt-5 border-t border-border-subtle flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-accent flex-1 justify-center sm:flex-initial text-xs py-2 px-4"
              >
                <GithubIcon size={15} />
                <span>Open GitHub</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-secondary flex-1 justify-center sm:flex-initial text-xs py-2 px-4"
              >
                <ArrowUpRight className="h-4 w-4" />
                <span>Launch Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
