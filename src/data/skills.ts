export interface SkillCategory {
  label: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['Java', 'Clojure', 'Ruby', 'Python'],
  },
  {
    label: 'Web Technologies',
    skills: ['Jetty', 'Nginx', 'Apache Kafka', 'REST API', 'Grails', 'Node.js', 'mutual TLS'],
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'Tools & Infrastructure',
    skills: ['Claude Code', 'Docker', 'Kubernetes', 'Argo', 'Splunk', 'AWS', 'Sumo Logic', 'Bash', 'Git', 'JMeter'],
  },
];
