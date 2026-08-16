export type ProjectStatus = "Active" | "Shipped" | "WIP" | "Archived";

export type ProjectCategory = "All" | "Android" | "Web" | "Library" | "CLI" | "AI" | "Tools";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  techStack: string[];
  status: ProjectStatus;
  githubUrl: string;
  liveUrl?: string;
  screenshot?: string;
  featured?: boolean;
  highlights?: string[];
  author: {
    username: string;
    name: string;
    avatar: string;
    role: string;
  };
};

export type Member = {
  username: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  github: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  location?: string;
  institution?: string;
  badges: string[];
  aboutContent?: string;
  projects: Project[];
};
