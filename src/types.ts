export interface Project {
  id: string;
  name: string;
  description: string;
  extendedDescription?: string;
  language: string;
  languages: string[];
  stars: number;
  forks: number;
  githubUrl: string;
  demoUrl?: string;
  category: 'Security' | 'Web Apps' | 'Automation' | 'Games & Creative';
  featured: boolean;
  builtAt: string;
  impact?: string;
  status?: 'Live' | 'Active' | 'Prototype' | 'Archived';
}


export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  iconType: 'code' | 'shield' | 'terminal' | 'server' | 'game';
  projectsLinked?: string[];
}

export interface SkillCategory {
  title: string;
  summary?: string;
  skills: { name: string; level: number; iconName: string }[];
}

export interface ProfileMetric {
  label: string;
  value: string;
  detail: string;
}

export interface FocusArea {
  title: string;
  description: string;
  signal: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
