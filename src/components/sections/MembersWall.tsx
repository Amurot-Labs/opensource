import { Users, UserPlus } from 'lucide-react';
import type { Member } from '@/lib/types';
import { MemberCard } from '@/components/ui/MemberCard';

interface MembersWallProps {
  members: Member[];
}

export function MembersWall({ members }: MembersWallProps) {
  return (
    <section id="members" className="py-10 sm:py-14 px-4 sm:px-6 bg-surface/30 border-y border-border-subtle">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-1">
              <Users className="h-3.5 w-3.5" />
              <span>Community</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              Creators & Colleagues
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted max-w-xl">
              Meet the developers contributing open source projects to the Amurot directory.
            </p>
          </div>

          <a
            href="https://github.com/amurot-labs/opensource/pulls"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary text-xs py-1.5 px-3 self-start sm:self-auto"
          >
            <UserPlus className="h-3.5 w-3.5 text-accent" />
            <span>Join Community</span>
          </a>
        </div>

        {members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.map((member) => (
              <MemberCard key={member.username} member={member} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border-card p-10 text-center bg-surface/50">
            <Users className="h-8 w-8 text-muted mx-auto mb-2.5" />
            <h3 className="font-display text-base font-bold text-primary">
              Community Directory Opening
            </h3>
            <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
              Be the first builder to list your open-source projects on Amurot OSS by submitting a pull request!
            </p>
            <div className="mt-5 flex justify-center">
              <a
                href="https://github.com/amurot-labs/opensource/pulls"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-accent text-xs py-2 px-3.5 shadow-sm"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Add Your Profile (+PR)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
