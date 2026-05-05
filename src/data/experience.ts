export interface Role {
  title: string;
  startDate: string; // "Nov 2024" format
  endDate: string | 'Present';
  accomplishments: string[];
}

export interface Experience {
  company: string;
  location: string;
  companyUrl?: string;
  roles: Role[];
}

export const experiences: Experience[] = [
  {
    company: 'PayPal',
    location: 'San Jose, CA',
    companyUrl: 'https://www.paypal.com',
    roles: [
      {
        title: 'Technical Lead - Braintree Forward API',
        startDate: 'Nov 2024',
        endDate: 'Present',
        accomplishments: [
          'Initially contributed as IC, now leading a team of 5 engineers that oversees support, maintenance and growth of payment method forwarding REST API application. Contributed to growth of gross margin from $800k per year to $3 million over 3 years.',
          'Modernizing development process with Claude Code by adding skills, hooks, subagents and settings to codebase for team to use.',
          'Training management, product, engineering and support regarding product. Leading backlog grooming, planning, and mentoring.',
        ],
      },
      {
        title: 'Senior Software Engineer - Braintree Forward API',
        startDate: 'Jul 2022',
        endDate: 'Nov 2024',
        accomplishments: [
          'Migrated application from on-prem to managed Kubernetes on AWS. Designed smoke tests, scaling policies, consolidated file and secret loads from multiple sources. Modernized deployment processes with eventual convergence on CI/CD deployments.',
          'Designed and Implemented Event Publisher for consumption by Event Based Billing and central analytics subscribers.',
          'Designed and Implemented Reverse API to support Private Label Credit Card Issuance and shield merchants from PCI scoped data, in support of Merchant\'s in-store loyalty program enrollment.',
          'Designed wrapper scripts for mTLS certificate management between application and internal services as well as merchants and their destination APIs. Authored processes and runbooks by learning from taking point on multiple escalations during onboarding.',
          'Implement Datadog metric emissions and overhaul log emissions to modernize observability.',
        ],
      },
    ],
  },
  {
    company: 'Stockpile Investments',
    location: 'San Francisco, CA',
    companyUrl: 'https://www.stockpile.com',
    roles: [
      {
        title: 'Software Engineer',
        startDate: 'Apr 2021',
        endDate: 'Jul 2022',
        accomplishments: [
          'Integrated backend with third party APIs for payments, customer verification, onboarding, and bank verification features.',
          'Improved ACH transfer settlement time by 200% by using APIs for reconciliation instead of flat files.',
          'Improved security by implementing business logic that disallows fraudulent micro-deposit transactions.',
          'Led the design, implementation and testing of new trade insurance POC that has never been seen on any brokerage platform.',
          'Improved efficiency of batch jobs by 33% by retiring redundant jobs and cleaning up unused files and databases.',
          'Performed third-party library and dependency upgrades for bank verification features.',
          'Enabled SonarQube code quality and security analysis on all working repositories to improve visibility on code coverage, code smells and vulnerabilities. Added automated report generation in Jenkins\'s build stages for all repositories.',
          'Set up Email Automation server and integrated APIs to the QA automation codebase.',
        ],
      },
    ],
  },
  {
    company: 'NortonLifeLock',
    location: 'Culver City, CA',
    roles: [
      {
        title: 'Software Engineer',
        startDate: 'Oct 2020',
        endDate: 'Mar 2021',
        accomplishments: [
          'Support UI automation efforts, Rebuilt unit tests to improve coverage and authored technical documentation to support new joiners ramp to codebase.',
        ],
      },
    ],
  },
  {
    company: 'Qualcomm',
    location: 'San Diego, CA',
    companyUrl: 'https://www.qualcomm.com',
    roles: [
      {
        title: 'IT Engineer',
        startDate: 'Aug 2020',
        endDate: 'Oct 2020',
        accomplishments: [],
      },
      {
        title: 'IT Intern',
        startDate: 'Jun 2019',
        endDate: 'Aug 2019',
        accomplishments: [],
      },
    ],
  },
  {
    company: 'Accenture',
    location: 'Bangalore, India',
    roles: [
      {
        title: 'Associate Software Engineer',
        startDate: 'Nov 2016',
        endDate: 'Jul 2018',
        accomplishments: [
          'Web application testing and automation framework setup leveraging headless Chrome, Selenium, and Python.',
        ],
      },
    ],
  },
];
