import type { Member, Project } from '@/lib/types';
import { Hero } from '@/components/sections/Hero';
import { ProjectDirectory } from '@/components/sections/ProjectDirectory';
import { MembersWall } from '@/components/sections/MembersWall';
import { ContributeGuide } from '@/components/sections/ContributeGuide';

interface HomePageProps {
  projects: Project[];
  members: Member[];
  onSelectProject: (project: Project) => void;
}

export function HomePage({
  projects,
  members,
  onSelectProject,
}: HomePageProps) {
  return (
    <main>
      <Hero projectCount={projects.length} memberCount={members.length} />
      <ProjectDirectory projects={projects} onSelectProject={onSelectProject} />
      <MembersWall members={members} />
      <ContributeGuide />
    </main>
  );
}
