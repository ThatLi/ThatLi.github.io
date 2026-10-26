export interface PortfolioImage {
  file: string
  alt: string
  width: number
  height: number
  caption: string
  credit?: { label: string; url: string }
  license?: { label: string; url: string }
}

export interface Experience {
  role: string
  organization: string
  period: string
  location?: string
  details: string[]
  image?: PortfolioImage
}

export interface Project {
  name: string
  context: string
  period: string
  technologies: string[]
  details: string[]
  url?: string
  images?: PortfolioImage[]
}

export interface Portfolio {
  name: string
  initials: string
  location: string
  eyebrow: string
  headline: string[]
  introduction: string
  cv: { file: string; label: string }
  contacts: { label: string; value: string; href: string }[]
  projects: Project[]
  experience: Experience[]
  community: Experience[]
  education: {
    institution: string
    degree: string
    period: string
    location: string
    coursework: string[]
    image?: PortfolioImage
  }[]
  awards: { title: string; date: string; description: string }[]
  skills: { category: string; items: string[] }[]
}

// Sources: the supplied CV, user-provided project links and images, and credited campus photos.
export const portfolio: Portfolio = {
  name: 'That Li',
  initials: 'tl',
  location: 'Singapore',
  eyebrow: 'Computer science · National University of Singapore',
  headline: ['Building software.', 'Thinking about people.'],
  introduction:
    "I'm a Computer Science student at the National University of Singapore. I contribute to educational software, design interfaces, and help students build their programming foundations.",
  cv: { file: 'That-Li-CV.pdf', label: 'View CV' },
  contacts: [
    { label: 'Email', value: 'thatli3163@gmail.com', href: 'mailto:thatli3163@gmail.com' },
    { label: 'Phone', value: '+65-8902-0992', href: 'tel:+6589020992' },
    { label: 'LinkedIn', value: 'linkedin.com/in/that-li', href: 'https://www.linkedin.com/in/that-li/' },
    { label: 'GitHub', value: 'github.com/ThatLi', href: 'https://github.com/ThatLi' },
  ],
  projects: [
    {
      name: 'Source Academy',
      context: 'CP3108 · Frontend development',
      period: 'January 2026 – May 2026',
      technologies: ['TypeScript', 'React'],
      url: 'https://github.com/source-academy/frontend',
      images: [{
        file: 'images/source-academy.webp',
        alt: 'Source Academy artwork depicting students and characters in a futuristic computing academy.',
        width: 1440, height: 810,
        caption: 'Source Academy · Artwork from the frontend repository',
        credit: { label: 'Source Academy', url: 'https://github.com/source-academy/frontend/blob/master/src/assets/academy_background.jpg' },
        license: { label: 'Apache 2.0', url: 'images/source-academy-LICENSE.txt' },
      }],
      details: [
        'Improved the UI/UX of an open-source educational programming platform used by 1,000+ NUS freshmen annually, based on student feedback.',
        'Implemented an alternative program visualization in React and TypeScript to improve readability for students.',
        'Collaborated across operational teams on feature development, in-depth documentation, and regression testing.',
      ],
    },
    {
      name: 'TuteeDex',
      context: 'CS2103T · Student management application',
      period: 'September 2026 – Present',
      technologies: ['Java', 'JavaFX', 'JUnit', 'Git'],
      url: 'https://github.com/AY2627S1-CS2103T-F13-2/tp',
      images: [
        {
          file: 'images/tuteedex-ui.webp',
          alt: 'TuteeDex desktop interface with student rows, total and paid summaries, and a command input.',
          width: 726, height: 593,
          caption: 'Application UI · Repository screenshot',
          credit: { label: 'TuteeDex', url: 'https://github.com/AY2627S1-CS2103T-F13-2/tp/blob/master/docs/images/Ui.png' },
        },
        {
          file: 'images/tuteedex-design.webp',
          alt: 'TuteeDex design board showing student-management and help-window mockups alongside visual references.',
          width: 1213, height: 968,
          caption: 'Interface design exploration · Supplied screenshot',
        },
      ],
      details: [
        'Collaborated in a five-person team to extend an existing Java application into a desktop application for private tutors to manage student profiles and schedule lessons.',
        'Designed JavaFX interfaces using Figma, implementing reusable student cards, summary feedback, command controls, and interactive help windows.',
        'Maintained user guides, developer documentation, and UML diagrams explaining application behaviour and implementation decisions.',
      ],
    },
    {
      name: 'Mr. Krabs',
      context: 'Telegram scheduling bot',
      period: 'April 2026 – April 2026',
      technologies: ['OpenClaw API', 'Python'],
      url: 'https://github.com/ThatLi/openclaw-hackathon',
      images: [{
        file: 'images/mr-krabs-event.webp',
        alt: 'Agnes OpenClaw hackathon participants gathered for a group photo in a lecture theatre.',
        width: 1800, height: 1020,
        caption: 'Agnes OpenClaw · Hackathon group photo',
      }],
      details: [
        'Built a Telegram bot using OpenClaw to distinguish conversational messages from scheduling requests and create tasks directly from group-chat interactions.',
        'Coordinated interfaces with teammates responsible for scheduling and agent components.',
      ],
    },
  ],
  experience: [
    {
      role: 'Teaching Assistant for NUS Computing: CS1101S',
      organization: 'NUS School of Computing',
      period: 'August 2026 – Present',
      location: 'Kent Ridge Crescent, Singapore',
      image: {
        file: 'images/nus-computing.webp',
        alt: 'The glass entrance of NUS School of Computing COM1, with the school name above the doors.',
        width: 1000, height: 750,
        caption: 'NUS Computing · COM1',
        credit: { label: 'Photo: Soccorpcomm', url: 'https://commons.wikimedia.org/wiki/File:NUS_School_of_Computing.JPG' },
        license: { label: 'CC BY-SA 3.0 · Resized to WebP', url: 'https://creativecommons.org/licenses/by-sa/3.0/' },
      },
      details: [
        'Mentored 8 students through weekly tutorials on the Structure and Interpretation of Computer Programs (SICP) curriculum in Python.',
        'Strengthened foundational concepts of functional paradigms and computational models through personalized learning tailored to each student’s needs.',
      ],
    },
  ],
  community: [
    {
      role: 'Publicity Executive',
      organization: 'NUS: Product Club',
      period: 'April 2026 – Present',
      details: ['Designed audience-focused promotional graphics using established design principles while conveying brand identity.'],
    },
    {
      role: 'Publicity Director',
      organization: 'NUS: Game Development Group',
      period: 'September 2025 – Present',
      details: ['Collaborated with NUS Library as part of Discover Digital to host the NUS Library Collection Game Jam, raising awareness of Library resources through innovative games.'],
    },
  ],
  education: [
    {
      institution: 'National University of Singapore',
      degree: 'Bachelor of Computing in Computer Science',
      period: 'Aug. 2025 – May 2029',
      location: 'Singapore, Singapore',
      coursework: ['Technical Management and Leadership', 'Design Thinking', 'Communication for Computing Professionals', 'Software Engineering', 'Data Structures and Algorithms'],
      image: {
        file: 'images/nus-campus.webp',
        alt: 'NUS University Hall surrounded by trees on the Kent Ridge campus.',
        width: 1200, height: 900,
        caption: 'National University of Singapore · University Hall',
        credit: { label: 'Photo: Sengkang', url: 'https://commons.wikimedia.org/wiki/File:NUS,_University_Hall,_Nov_06.JPG' },
      },
    },
  ],
  awards: [
    {
      title: 'The 28th STePs: Best Project – Platinum',
      date: 'April 2026',
      description: 'Awarded 1st place for CSE Environment Diagrams at the NUS School of Computing project showcase.',
    },
    {
      title: 'NUS ASEAN Undergraduate Scholarship',
      date: 'June 2025',
      description: 'One of five recipients selected from Myanmar based on academic performance and scholarship selection.',
    },
  ],
  skills: [
    { category: 'Languages', items: ['Java', 'Python', 'C', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
    { category: 'Frameworks & libraries', items: ['React', 'Node.js', 'JavaFX', 'JUnit'] },
    { category: 'Developer tools', items: ['Docker', 'Git', 'Gradle', 'Yarn', 'Figma'] },
  ],
}
