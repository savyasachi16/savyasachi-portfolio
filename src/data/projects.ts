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
    title: 'claude-dotfiles',
    description: 'Cross-machine Claude Code settings for Mac and Linux.',
    techStack: ['Shell'],
    githubUrl: 'https://github.com/savyasachi16/claude-dotfiles',
    featured: true,
    color: '#f7a07e',
  },
  {
    title: 'mac-battery-cycle-history',
    description: 'An easy guide to check your Mac\'s battery cycle history.',
    techStack: ['Shell'],
    githubUrl: 'https://github.com/savyasachi16/mac-battery-cycle-history',
    featured: true,
    color: '#7ef7b8',
  },
  {
    title: 'SampleChain',
    description: 'Simple blockchain transaction validator and miner implementation with proof-of-work.',
    techStack: ['Python'],
    githubUrl: 'https://github.com/savyasachi16/SampleChain',
    featured: true,
    color: '#c87ef7',
  },
];
