import type { Member, Project } from './types';

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
 * Lightweight, safe YAML frontmatter parser for frontmatter blocks
 */
function parseFrontmatter(content: string): { data: Record<string, any>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: content };
  }

  const yamlBlock = match[1];
  const body = match[2].trim();
  const data: Record<string, any> = {};

  const lines = yamlBlock.split('\n');
  let currentKey = '';
  let inArray = false;
  let inProjects = false;
  let currentProject: Record<string, any> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Handle projects list
    if (trimmed.startsWith('projects:')) {
      inProjects = true;
      data.projects = [];
      continue;
    }

    if (inProjects) {
      if (line.startsWith('  - ') || line.startsWith('  -')) {
        currentProject = {};
        data.projects.push(currentProject);
        const rest = line.replace(/^\s*-\s*/, '').trim();
        if (rest.includes(':')) {
          const [k, ...v] = rest.split(':');
          const val = v.join(':').trim().replace(/^["']|["']$/g, '');
          currentProject[k.trim()] = val === 'true' ? true : val === 'false' ? false : val;
        }
        continue;
      }

      if (currentProject && line.startsWith('    ')) {
        const itemTrimmed = line.trim();
        if (itemTrimmed.startsWith('- ')) {
          const val = itemTrimmed.replace(/^[-\s]+/, '').replace(/^["']|["']$/g, '');
          if (currentKey && Array.isArray(currentProject[currentKey])) {
            currentProject[currentKey].push(val);
          }
          continue;
        }

        if (itemTrimmed.includes(':')) {
          const [k, ...v] = itemTrimmed.split(':');
          const keyName = k.trim();
          const rawVal = v.join(':').trim();

          if (!rawVal) {
            currentKey = keyName;
            currentProject[keyName] = [];
          } else {
            const cleanVal = rawVal.replace(/^["']|["']$/g, '');
            currentProject[keyName] = cleanVal === 'true' ? true : cleanVal === 'false' ? false : cleanVal;
            currentKey = keyName;
          }
        }
        continue;
      }
    }

    // Top level keys and arrays
    if (trimmed.startsWith('- ')) {
      const val = trimmed.replace(/^[-\s]+/, '').replace(/^["']|["']$/g, '');
      if (inArray && currentKey && Array.isArray(data[currentKey])) {
        data[currentKey].push(val);
      }
      continue;
    }

    if (line.includes(':')) {
      inArray = false;
      const [k, ...v] = line.split(':');
      const keyName = k.trim();
      const rawVal = v.join(':').trim();

      if (!rawVal) {
        inArray = true;
        currentKey = keyName;
        data[keyName] = [];
      } else {
        const cleanVal = rawVal.replace(/^["']|["']$/g, '');
        data[keyName] = cleanVal === 'true' ? true : cleanVal === 'false' ? false : cleanVal;
      }
    }
  }

  return { data, body };
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
          status: p.status || 'Active',
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
