/**
 * Centralized portfolio projects data — sourced from resume
 */
export const projectsData = [
  {
    id: 'wheelsonrent',
    slug: 'WheelsOnRent',
    name: 'WheelsOnRent',
    tagline: 'Vehicle Rental Platform',
    category: 'Full Stack Web',
    techStack: ['Python', 'Flask', 'MongoDB', 'REST APIs', 'OTP Auth'],
    description:
      'A secure vehicle rental backend system with user authentication and OTP-based verification, vendor dashboard for inventory and booking management, and RESTful APIs for vehicle listing, search, and reservation workflows.',
    highlights: [
      'Developed a secure backend system with user authentication and OTP-based verification',
      'Implemented a vendor dashboard for vehicle inventory and booking management',
      'Designed and deployed RESTful APIs for vehicle listing, search, and reservation workflows',
    ],
  },
  {
    id: 'upes-complaint-system',
    slug: 'UPES-Complaint-System',
    name: 'UPES Complaint Management System',
    tagline: 'Full-Stack Campus Grievance Platform',
    category: 'Full Stack Web / Enterprise',
    techStack: ['React 18', 'Tailwind CSS', 'Shadcn UI', 'Flask', 'MongoDB', 'JWT', 'HttpOnly Cookies'],
    description:
      'A full-stack complaint platform for students, staff, and administrators with a complete complaint lifecycle. Features RBAC for Student, Staff, and Admin roles with protected backend routes and centralized authentication.',
    highlights: [
      'Implemented React 18, Tailwind CSS, Shadcn UI, Flask, MongoDB, and JWT-based authentication with HttpOnly cookie sessions',
      'Implemented RBAC for Student, Staff, and Admin roles with protected backend routes and centralized authentication',
      'Built complaint assignment, progress tracking, remarks, timeline/history, and SMTP email notification workflows',
      'Added automatic assignment to the least-busy staff member to support workload balancing',
    ],
  },
  {
    id: 'banking-system',
    slug: 'Banking-System',
    name: 'Banking System',
    tagline: 'Terminal-Based Application in C',
    category: 'Systems Programming / C',
    techStack: ['C', 'File Handling', 'Structured Programming'],
    description:
      'A menu-driven banking simulator supporting account creation, deposits, withdrawals, and balance inquiry. Applied structured programming principles and file handling for persistent data storage.',
    highlights: [
      'Built a menu-driven banking simulator supporting account creation, deposits, withdrawals, and balance inquiry',
      'Applied structured programming principles and file handling for persistent data storage',
    ],
  },
  {
    id: 'movietime',
    slug: 'MovieTime',
    name: 'MovieTime',
    tagline: 'Personalized Movie Recommendation System',
    category: 'AI/ML / Recommendation Engine',
    techStack: ['Python', 'Weighted Scoring Algorithm', 'TMDB API'],
    description:
      'A client-side movie recommendation engine using user preferences and viewing history. Designed a weighted scoring algorithm: favorite genres (+5), watchlist genre matches (+3), previously watched genres (+2), and TMDB rating bonus.',
    highlights: [
      'Developed a client-side movie recommendation engine using user preferences and viewing history',
      'Designed a weighted scoring algorithm with genre preference scoring and TMDB rating bonus',
      'Filtered previously watched movies, scored candidate titles, and surfaced the highest-ranked recommendations',
      'Integrated movie data and ratings to provide personalized discovery rather than generic popularity-based recommendations',
    ],
  },
];
