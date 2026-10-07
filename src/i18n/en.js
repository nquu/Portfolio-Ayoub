export default {
  nav: { over: 'About', skills: 'Skills', ervaring: 'Experience', projecten: 'Projects', contact: 'Contact', theme: 'Toggle theme' },

  profile: {
    name: 'Ayoub Guebli',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/nquu',
  },

  hero: {
    badge: 'Open to new projects',
    greeting: "Hi, I'm",
    roles: ['C# / .NET Developer', 'Backend Developer', 'Security-minded Engineer', 'Full-stack when needed'],
    intro: 'Backend developer with C# and .NET as home turf. I build APIs, services and applications that run reliably, always with a security mindset.',
    cta: 'View projects',
    contact: 'Contact',
  },

  about: {
    eyebrow: '01 — About me',
    title: 'Backend first, security always in mind',
    bio: [
      "I'm Ayoub, a C# and .NET developer. My heart is in the backend: APIs, data models, services and the logic that keeps everything running. That's where I feel most at home and where I like to build. I have enough front-end background to ship a complete feature, from endpoint to screen, but the backend is where I make the difference.",
      "I also look at what I build through a security lens more and more. Where are the weak spots, how do you handle input, auth and data, and how do you make something that doesn't just fall over? That's the area I want to go deeper into. I learn fastest by building, breaking things, and putting them back better.",
    ],
    stats: [
      { label: 'Focus', value: '.NET' },
      { label: 'Programming languages', value: '6+' },
      { label: 'Production projects', value: '2+' },
      { label: 'Security mindset', value: '24/7' },
    ],
    education: null,
  },

  skills: {
    eyebrow: '02 — Skills',
    title: 'What I work with',
    sub: 'Backend as the core, front-end where it is needed.',
    groups: [
      { group: 'Backend (core)', items: ['C#', '.NET', 'ASP.NET Core', 'REST APIs', 'Blazor (Razor)', 'SQL'] },
      { group: 'Other languages', items: ['C++', 'C', 'Python', 'JavaScript', 'Dart'] },
      { group: 'Front-end & more', items: ['React', 'TailwindCSS', 'HTML / CSS', 'Flutter', 'Electron'] },
    ],
    languages: [
      { name: 'Dutch', level: 'Native', pct: 100 },
      { name: 'English', level: 'Proficient', pct: 80 },
    ],
  },

  experience: {
    eyebrow: '03 — Experience',
    title: 'Work experience',
    items: [
      {
        title: 'Software Developer',
        company: 'DigiLab Technova',
        place: 'Ede',
        period: '2025 — 2026',
        points: [
          'Built projects that actually ship to production.',
          'Worked extensively with Flutter at production level.',
          'Learned to communicate with clients and plan work.',
        ],
        tags: ['Flutter', 'Dart', 'Production'],
      },
      {
        title: 'Software Developer',
        company: 'LCT Textilligence',
        place: 'Tiel',
        period: '2024 — 2025',
        points: [
          'Developed front-end and back-end in a new framework (Blazor + Razor).',
          'Collaborated with colleagues and mentors on practical solutions.',
          'First experience on the work floor as a developer.',
        ],
        tags: ['C#', 'Blazor', '.NET'],
      },
    ],
  },

  projects: {
    eyebrow: '05 — Projects',
    title: 'Things I have built',
    all: 'All',
    cats: { Web: 'Web', Desktop: 'Desktop', Mobile: 'Mobile' },
    items: [],
  },

  contact: {
    eyebrow: '04 — Contact',
    title: "Let's work together",
    sub: 'Looking for a .NET developer? Feel free to reach out.',
    form: {
      name: 'Name',
      email: 'Email address',
      message: 'Your message',
      send: 'Send',
      sending: 'Sending...',
      sent: 'Sent, I will get back to you soon.',
      error: 'Sending failed. Please try again later.',
    },
    labels: { linkedin: 'LinkedIn', github: 'GitHub' },
    linkedinValue: 'View profile',
    githubValue: 'Repositories',
  },

  footer: 'Built with React, TailwindCSS & Framer Motion',
}
