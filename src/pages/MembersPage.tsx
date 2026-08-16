import type { Member } from '@/lib/types';
import { MembersWall } from '@/components/sections/MembersWall';

interface MembersPageProps {
  members: Member[];
}

export function MembersPage({ members }: MembersPageProps) {
  return (
    <main className="pt-20 sm:pt-24 pb-12">
      <MembersWall members={members} />
    </main>
  );
}
