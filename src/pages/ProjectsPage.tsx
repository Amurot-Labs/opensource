import type { Project } from '@/lib/types';
import { ProjectDirectory } from '@/components/sections/ProjectDirectory';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function ProjectsPage({ projects, onSelectProject }: ProjectsPageProps) {
  return (
    <main className="pt-20 sm:pt-24 pb-12">
      <ProjectDirectory projects={projects} onSelectProject={onSelectProject} />
    </main>
  );
}
