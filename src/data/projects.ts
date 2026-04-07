export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: 'savyasachi-portfolio',
    description: 'The site you\'re on right now, which contains a card for the site you\'re on right now, which contains a card for the site you\'re on right now—',
    techStack: ['Astro', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/savyasachi16/savyasachi-portfolio',
    liveUrl: 'https://savyasachi.dev',
    featured: true,
  },
  {
    title: 'claude-dotfiles',
    description: 'Cross-machine Claude Code settings for Mac and Linux.',
    techStack: ['Shell'],
    githubUrl: 'https://github.com/savyasachi16/claude-dotfiles',
    featured: true,
  },
  {
    title: 'mac-battery-cycle-history',
    description: 'An easy guide to check your Mac\'s battery cycle history.',
    techStack: ['Shell'],
    githubUrl: 'https://github.com/savyasachi16/mac-battery-cycle-history',
    featured: true,
  },
  {
    title: 'SampleChain',
    description: 'Simple blockchain transaction validator and miner implementation with proof-of-work.',
    techStack: ['Python'],
    githubUrl: 'https://github.com/savyasachi16/SampleChain',
    featured: true,
  },
];
