import { Sparkles } from 'lucide-react';
import type { Project } from '@/lib/types';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface FeaturedProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function FeaturedProjects({ projects, onSelectProject }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Curated Spotlight</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Featured Tools & Apps
            </h2>
            <p className="mt-1.5 text-sm text-text-muted max-w-xl leading-relaxed">
              Hand-picked flagship open source applications and developer tools built by Amurot community members.
            </p>
          </div>

          <a
            href="#/projects"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline shrink-0"
          >
            <span>View all projects</span>
            <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
