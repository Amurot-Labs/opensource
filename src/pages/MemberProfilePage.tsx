import { Globe, MapPin, Building2, ArrowLeft, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/Icons';
import type { Member, Project } from '@/lib/types';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface MemberProfilePageProps {
  member: Member | undefined;
  onSelectProject: (project: Project) => void;
}

export function MemberProfilePage({ member, onSelectProject }: MemberProfilePageProps) {
  if (!member) {
    return (
      <main className="pt-28 pb-20 px-4 sm:px-6 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            Member Not Found
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            We couldn&apos;t find a member profile matching this username.
          </p>
          <div className="mt-5">
            <a href="#/members" className="btn-accent text-xs py-2 px-4">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Members</span>
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Back Link */}
        <div className="mb-5">
          <a
            href="#/members"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Members</span>
          </a>
        </div>

        {/* Profile Header Banner */}
        <section className="glass-card p-5 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <img
              src={member.avatar}
              alt={member.name}
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border-2 border-border-card shadow-md shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-text-muted">@{member.username}</span>
                {member.badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-accent-subtle text-accent border border-accent/20"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                {member.name}
              </h1>

              <p className="mt-0.5 text-sm sm:text-base font-medium text-text-secondary">
                {member.role}
              </p>

              <p className="mt-2.5 text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
                {member.bio}
              </p>

              {/* Meta details */}
              <div className="mt-3.5 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                {member.institution && (
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-accent" />
                    <span>{member.institution}</span>
                  </div>
                )}
                {member.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    <span>{member.location}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    <GithubIcon size={14} />
                    <span>GitHub</span>
                  </a>
                )}
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    <Globe className="h-3.5 w-3.5 text-accent" />
                    <span>Portfolio</span>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    <LinkedinIcon size={14} />
                    <span>LinkedIn</span>
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    <TwitterIcon size={14} />
                    <span>Twitter/X</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* About Statement from Markdown */}
          {member.aboutContent && (
            <div className="mt-10 pt-8 border-t border-border-subtle">
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold mb-3">
                About the Creator
              </h3>
              <div className="text-base text-text-secondary leading-relaxed whitespace-pre-line font-normal max-w-3xl">
                {member.aboutContent.replace(/^##\s+About\s*\n*/i, '').trim()}
              </div>
            </div>
          )}
        </section>

        {/* Member Projects List */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div className="flex items-center gap-2.5">
              <Layers className="h-5 w-5 text-accent" />
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-text-primary">
                Projects by {member.name}
              </h2>
            </div>

            <span className="font-mono text-xs sm:text-sm text-text-muted bg-bg-surface px-4 py-1.5 rounded-xl border border-border-card shadow-sm">
              {member.projects.length} {member.projects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>

          {member.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {member.projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  onSelect={onSelectProject}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card p-14 text-center rounded-3xl">
              <p className="text-base text-text-muted">
                No projects listed yet for this member.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
