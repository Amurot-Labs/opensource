import { load } from 'js-yaml';
import type { Member, Project, ProjectStatus } from './types';

interface RawFiles {
  [path: string]: string;
}

// Vite eager raw import of all member markdown files
const rawFiles = import.meta.glob('/src/content/members/*/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as RawFiles;

/**
 * Robust YAML frontmatter parser using js-yaml
 */
function parseFrontmatter(content: string): { data: Record<string, any>; body: string } {
  const trimmed = content.trim();
  if (!trimmed.startsWith('---')) {
    return { data: {}, body: content };
  }

  // Find closing --- after the opening ---
  const afterFirst = trimmed.slice(3);
  const closingIdx = afterFirst.indexOf('---');
  if (closingIdx === -1) {
    return { data: {}, body: content };
  }

  const yamlText = afterFirst.slice(0, closingIdx).trim();
  const bodyText = afterFirst.slice(closingIdx + 3).trim();

  try {
    const data = (load(yamlText) as Record<string, any>) || {};
    return { data, body: bodyText };
  } catch (err) {
    console.error('Failed to parse YAML frontmatter:', err);
    return { data: {}, body: bodyText };
  }
}

// Cache parsed members & projects
let cachedMembers: Member[] | null = null;

export function getAllMembers(): Member[] {
  if (cachedMembers) return cachedMembers;

  const memberMap = new Map<string, Partial<Member>>();

  for (const [filePath, content] of Object.entries(rawFiles)) {
    // Expected path: /src/content/members/<username>/<file>.md
    const parts = filePath.split('/');
    const username = parts[parts.length - 2];
    const filename = parts[parts.length - 1];

    if (!username || username === 'template') continue;

    if (!memberMap.has(username)) {
      memberMap.set(username, {
        username,
        badges: [],
        projects: [],
      });
    }

    const member = memberMap.get(username)!;
    const { data, body } = parseFrontmatter(content);

    if (filename === 'PROFILE.md') {
      member.name = data.name || username;
      member.role = data.role || 'Software Developer';
      member.bio = data.bio || 'Open Source Contributor @ Amurot Labs';
      member.avatar = data.avatar || `https://github.com/${username}.png`;
      member.github = data.github || `https://github.com/${username}`;
      member.website = data.website || '';
      member.linkedin = data.linkedin || '';
      member.twitter = data.twitter || '';
      member.location = data.location || 'India';
      member.institution = data.institution || 'Guru Ghasidas Vishwavidyalaya';
      member.badges = Array.isArray(data.badges) ? data.badges : ['Contributor'];
      member.aboutContent = body || '';
    } else if (filename === 'PROJECTS.md') {
      if (Array.isArray(data.projects)) {
        member.projects = data.projects.map((p: any) => ({
          slug: p.slug || 'project',
          title: p.title || 'Untitled Project',
          tagline: p.tagline || '',
          description: p.description || p.tagline || '',
          category: p.category || 'Tools',
          techStack: Array.isArray(p.techStack) ? p.techStack : [],
          status: (p.status as ProjectStatus) || 'Active',
          githubUrl: p.githubUrl || `https://github.com/${username}`,
          liveUrl: p.liveUrl || '',
          screenshot: p.screenshot || '',
          featured: Boolean(p.featured),
          highlights: Array.isArray(p.highlights) ? p.highlights : [],
          author: {
            username: member.username || username,
            name: member.name || username,
            avatar: member.avatar || `https://github.com/${username}.png`,
            role: member.role || 'Developer',
          },
        }));
      }
    }
  }

  cachedMembers = Array.from(memberMap.values()) as Member[];
  return cachedMembers;
}

export function getMemberByUsername(username: string): Member | undefined {
  const sanitized = username.replace(/^@/, '').toLowerCase();
  return getAllMembers().find((m) => m.username.toLowerCase() === sanitized);
}

export function getAllProjects(): Project[] {
  const members = getAllMembers();
  const all: Project[] = [];
  for (const member of members) {
    if (member.projects && Array.isArray(member.projects)) {
      for (const p of member.projects) {
        // Ensure author is attached
        p.author = {
          username: member.username,
          name: member.name,
          avatar: member.avatar,
          role: member.role,
        };
        all.push(p);
      }
    }
  }
  return all;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllTechStacks(): string[] {
  const projects = getAllProjects();
  const set = new Set<string>();
  for (const p of projects) {
    for (const tech of p.techStack) {
      if (tech) set.add(tech);
    }
  }
  return Array.from(set).sort();
}
