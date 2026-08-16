import { ArrowUpRight, Globe, MapPin, Building2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import type { Member } from '@/lib/types';

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="card-surface flex flex-col justify-between p-5 h-full relative group">
      <div>
        {/* Header: Avatar, Name & Badges */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <a
            href={`#/@${member.username}`}
            className="shrink-0 hover:scale-105 transition-transform"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="h-12 w-12 rounded-xl object-cover border border-border-card shadow-sm"
              loading="lazy"
            />
          </a>

          <div className="min-w-0">
            <a
              href={`#/@${member.username}`}
              className="font-display text-base font-bold text-primary hover:text-accent transition-colors block truncate"
            >
              {member.name}
            </a>
            <div className="text-xs text-muted truncate mt-0.5">
              {member.role}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mt-1.5">
              {member.badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-accent-subtle text-accent border border-accent/20"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
          {member.bio}
        </p>

        {/* Location & Institution Meta */}
        <div className="mt-3 flex flex-col gap-1 text-[11px] text-muted">
          {member.institution && (
            <div className="flex items-center gap-1.5 truncate">
              <Building2 className="h-3 w-3 shrink-0 text-muted" />
              <span className="truncate">{member.institution}</span>
            </div>
          )}
          {member.location && (
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="h-3 w-3 shrink-0 text-muted" />
              <span>{member.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Projects Count & Links */}
      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted font-medium">
          {member.projects.length} {member.projects.length === 1 ? 'project' : 'projects'}
        </span>

        <div className="flex items-center gap-1.5">
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer noopener"
              className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-subtle transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={14} />
            </a>
          )}
          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noreferrer noopener"
              className="p-1.5 rounded-md text-muted hover:text-accent hover:bg-subtle transition-colors"
              title="Personal Website"
              aria-label="Personal Website"
            >
              <Globe className="h-3.5 w-3.5" />
            </a>
          )}
          <a
            href={`#/@${member.username}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors ml-1"
          >
            <span>Microsite</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
