export interface Education {
  institution: string;
  location: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export const education: Education[] = [
  {
    institution: 'San Jose State University',
    location: 'San Jose, CA',
    degree: 'Master of Science',
    field: 'Computer Engineering',
    startDate: 'Aug 2018',
    endDate: 'May 2020',
  },
  {
    institution: 'Dayananda Sagar College of Engineering',
    location: 'Bangalore, India',
    degree: 'Bachelor of Engineering',
    field: 'Telecommunications',
    startDate: 'Sep 2012',
    endDate: 'Jun 2016',
  },
];
