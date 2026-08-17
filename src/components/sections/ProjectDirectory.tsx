import { useState, useMemo } from 'react';
import { Search, Filter, Layers, GitPullRequest } from 'lucide-react';
import type { Project, ProjectCategory } from '@/lib/types';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface ProjectDirectoryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Android', 'Web', 'Library', 'CLI', 'AI', 'Tools'];

export function ProjectDirectory({ projects, onSelectProject }: ProjectDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Extract all unique tech stack tags
  const allTechStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  // Filtered projects list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const catLower = p.category.toLowerCase();
      const selectedLower = selectedCategory.toLowerCase();
      const matchesCategory =
        selectedCategory === 'All' ||
        catLower === selectedLower ||
        catLower.includes(selectedLower) ||
        (selectedCategory === 'AI' && (catLower.includes('ai') || catLower.includes('ml')));

      const matchesTech =
        !selectedTech ||
        p.techStack.some((t) => t.toLowerCase() === selectedTech.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.author.name.toLowerCase().includes(query) ||
        p.techStack.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [projects, selectedCategory, selectedTech, searchQuery]);

  return (
    <section id="directory" className="py-10 sm:py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-1">
              <Layers className="h-3.5 w-3.5" />
              <span>Catalog</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              Community Project Directory
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted max-w-xl">
              Explore open-source Android apps, developer libraries, and web tools built by Amurot members.
            </p>
          </div>

          <div className="font-mono text-xs text-muted bg-surface px-3 py-1.5 rounded-xl border border-border-card self-start sm:self-auto shrink-0 shadow-sm">
            Showing <strong className="text-primary">{filteredProjects.length}</strong> of {projects.length}
          </div>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="space-y-3.5 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, tech stack, description, or creator..."
                className="w-full rounded-xl bg-surface border border-border-card pl-9 pr-12 py-2 text-xs sm:text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted hover:text-primary px-1.5 py-0.5 rounded hover:bg-subtle"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Reset Filters */}
            {(selectedCategory !== 'All' || selectedTech || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedTech(null);
                  setSearchQuery('');
                }}
                className="btn-secondary text-xs py-2 px-3 shrink-0"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                    active
                      ? 'bg-accent text-white shadow-sm'
                      : 'bg-surface text-secondary hover:bg-subtle border border-border-card'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Tech Stack Chips Bar */}
          {allTechStacks.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[11px] font-mono text-muted flex items-center gap-1 mr-1 font-medium">
                <Filter className="h-3 w-3 text-accent" /> Stack:
              </span>
              {allTechStacks.map((tech) => {
                const active = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => setSelectedTech((prev) => (prev === tech ? null : tech))}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                      active
                        ? 'bg-primary text-primary-bg font-bold shadow-sm'
                        : 'bg-subtle text-muted hover:text-primary hover:bg-card-hover border border-border-subtle'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={`${project.author.username}-${project.slug}`}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border-card p-10 text-center bg-surface/50">
            <Layers className="h-8 w-8 text-muted mx-auto mb-2.5" />
            <h3 className="font-display text-base font-bold text-primary">
              No matching projects found
            </h3>
            <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
              We couldn&apos;t find any open source projects matching your search criteria.
            </p>
            <div className="mt-5 flex justify-center">
              <a
                href="https://github.com/amurot-labs/opensource/pulls"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-accent text-xs py-2 px-3.5 shadow-sm"
              >
                <GitPullRequest className="h-3.5 w-3.5" />
                <span>Submit this project via PR</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
