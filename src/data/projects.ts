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
    title: 'ai-dotfiles',
    description: 'Cross-machine AI agent configuration for Mac and Linux.',
    techStack: ['Shell'],
    githubUrl: 'https://github.com/jsavyasachi/ai-dotfiles',
    featured: true,
    color: '#f7a07e',
  },
  {
    title: 'kriyaos',
    description: 'Agentic personal OS.',
    techStack: ['Goose', 'Mem0', 'Python'],
    githubUrl: 'https://github.com/jsavyasachi/kriyaos',
    featured: true,
    color: '#7ecff7',
  },
  {
    title: 'f5e',
    description: 'Personal finance analysis & advice.',
    techStack: ['Python', 'SQLite', 'Plaid'],
    githubUrl: 'https://github.com/jsavyasachi/f5e',
    featured: true,
    color: '#f7a57e',
  },
  {
    title: 'vitals',
    description: 'Personal Apple Health dashboard visualizing exported metrics. Astro + React + Recharts frontend on a Rust XML parser that streams the 1.3GB export into SQLite.',
    techStack: ['Rust', 'Astro', 'React', 'SQLite', 'Recharts'],
    githubUrl: 'https://github.com/jsavyasachi/vitals',
    featured: true,
    color: '#f77e9e',
  },
  {
    title: 'lorekeeper',
    description: 'LLM-curated Obsidian wiki built incrementally from PDFs and notes. Karpathy\'s LLM Wiki pattern.',
    techStack: ['TypeScript', 'Claude Agent SDK', 'MCP'],
    githubUrl: 'https://github.com/jsavyasachi/lorekeeper',
    featured: true,
    color: '#f7e57e',
  },
  {
    title: 'tmux-auto-name',
    description: 'AI-powered tmux window auto-renamer using a local LLM via Ollama.',
    techStack: ['Bash', 'tmux', 'Ollama', 'Qwen 2.5'],
    githubUrl: 'https://github.com/jsavyasachi/tmux-auto-name',
    featured: true,
    color: '#a07ef7',
  },
  {
    title: 'folio',
    description: 'You\'re looking at it. This card is about the site that contains this card.',
    techStack: ['Astro', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/jsavyasachi/folio',
    liveUrl: 'https://savyasachi.dev',
    featured: true,
    color: '#7eb8f7',
  },
];
