export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  color?: string;
}

export const projects: Project[] = [
  {
    title: 'folio',
    description: 'You\'re looking at it. This card is about the site that contains this card.',
    techStack: ['Astro', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/savyasachi16/folio',
    liveUrl: 'https://savyasachi.dev',
    featured: true,
    color: '#7eb8f7',
  },
  {
    title: 'lorekeeper',
    description: 'LLM-curated Obsidian wiki built incrementally from PDFs and notes. Karpathy\'s LLM Wiki pattern.',
    techStack: ['TypeScript', 'Claude Agent SDK', 'MCP'],
    githubUrl: 'https://github.com/savyasachi16/lorekeeper',
    featured: true,
    color: '#f7e57e',
  },
  {
    title: 'ai-dotfiles',
    description: 'Cross-machine AI agent configuration for Mac and Linux.',
    techStack: ['Shell'],
    githubUrl: 'https://github.com/savyasachi16/ai-dotfiles',
    featured: true,
    color: '#f7a07e',
  },
  {
    title: 'f5e',
    description: 'Personal care brand focused on mental health and skincare.',
    techStack: ['Brand'],
    githubUrl: 'https://github.com/savyasachi16/f5e',
    liveUrl: 'https://www.myf5e.com/',
    featured: true,
    color: '#f7a57e',
  },
  {
    title: 'vitals',
    description: 'Personal Apple Health dashboard visualizing exported metrics. Built with Astro, React, Recharts, and SQLite.',
    techStack: ['Astro', 'React', 'SQLite', 'Recharts'],
    githubUrl: 'https://github.com/savyasachi16/vitals',
    featured: true,
    color: '#f77e9e',
  },
  {
    title: 'kriyaos',
    description: 'AI agent operating system for independent businesses across WhatsApp and the web.',
    techStack: ['TypeScript', 'WhatsApp', 'DeepSeek'],
    githubUrl: 'https://github.com/savyasachi16/kriyaos',
    liveUrl: 'https://www.kriyaos.com/',
    featured: true,
    color: '#7ecff7',
  },
];
