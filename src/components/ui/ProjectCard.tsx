import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import type { Project } from '@/lib/types';
import { TechBadge } from './TechBadge';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const statusColor = {
    Shipped: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    Active: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    WIP: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    Archived: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
  }[project.status] || 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';

  return (
    <article className="card-surface flex flex-col justify-between p-5 h-full relative group">
      <div>
        {/* Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-subtle text-muted border border-border-subtle">
            {project.category}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${statusColor}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            <span>{project.status}</span>
          </span>
        </div>

        {/* Title & Tagline */}
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="text-left w-full group/title cursor-pointer focus:outline-none block"
        >
          <h3 className="font-display text-lg font-bold text-primary group-hover/title:text-accent transition-colors flex items-center gap-1.5">
            <span>{project.title}</span>
            {project.featured && (
              <Sparkles className="h-3.5 w-3.5 text-accent inline-block shrink-0" />
            )}
          </h3>
          <p className="mt-1.5 text-xs text-secondary line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </button>

        {/* Tech Stack Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} size="sm" />
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-mono text-muted self-center">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Creator info & Outbound Links */}
      <div className="mt-5 pt-3.5 border-t border-border-subtle flex items-center justify-between gap-2">
        <a
          href={`#/@${project.author.username}`}
          className="flex items-center gap-2 group/author hover:opacity-85 transition-opacity"
        >
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="h-6 w-6 rounded-full object-cover border border-border-subtle"
            loading="lazy"
          />
          <span className="text-xs font-medium text-secondary group-hover/author:text-accent transition-colors truncate max-w-[110px]">
            {project.author.name}
          </span>
        </a>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-subtle transition-colors cursor-pointer"
            title="Inspect project details"
            aria-label={`View ${project.title} details`}
          >
            <Layers className="h-4 w-4" />
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-subtle transition-colors"
              title="View GitHub Repository"
              aria-label="GitHub Repository"
            >
              <GithubIcon size={15} />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-subtle transition-colors"
              title="Visit Live Deployment"
              aria-label="Live Demo"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
