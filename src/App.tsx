import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/lib/theme-context';
import { UsernameProvider } from '@/lib/username-context';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { getAllMembers, getAllProjects, getMemberByUsername } from '@/lib/content-loader';
import type { Project } from '@/lib/types';
import { HomePage } from '@/pages/HomePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { MembersPage } from '@/pages/MembersPage';
import { MemberProfilePage } from '@/pages/MemberProfilePage';
import { GuidePage } from '@/pages/GuidePage';

export function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      return hash || '/';
    }
    return '/';
  });

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const members = getAllMembers();
  const projects = getAllProjects();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentPath(hash || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Router resolution
  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          projects={projects}
          members={members}
          onSelectProject={setActiveProject}
        />
      );
    }

    if (currentPath.startsWith('/projects')) {
      return (
        <ProjectsPage
          projects={projects}
          onSelectProject={setActiveProject}
        />
      );
    }

    if (currentPath.startsWith('/members')) {
      return <MembersPage members={members} />;
    }

    if (currentPath.startsWith('/@') || currentPath.startsWith('/member/')) {
      const username = currentPath.replace(/^\/(@|member\/)/, '');
      const member = getMemberByUsername(username);
      return (
        <MemberProfilePage
          member={member}
          onSelectProject={setActiveProject}
        />
      );
    }

    if (currentPath.startsWith('/guide')) {
      return <GuidePage />;
    }

    // Default Fallback
    return (
      <HomePage
        projects={projects}
        members={members}
        onSelectProject={setActiveProject}
      />
    );
  };

  return (
    <ThemeProvider>
      <UsernameProvider>
        <div className="min-h-screen flex flex-col bg-primary-bg text-primary">
          <Navbar currentPath={currentPath} />
          <div className="flex-1">
            {renderPage()}
          </div>
          <Footer />

          {/* Global Slide-Over Project Detail Drawer */}
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        </div>
      </UsernameProvider>
    </ThemeProvider>
  );
}

export default App;
