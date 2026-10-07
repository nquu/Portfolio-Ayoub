export default {
  nav: {
    over: 'Over',
    skills: 'Skills',
    ervaring: 'Ervaring',
    projecten: 'Projecten',
    contact: 'Contact',
    theme: 'Thema wisselen',
  },

  hero: {
    badge: 'Beschikbaar voor nieuwe projecten',
    greeting: 'Hoi, ik ben',
    roles: ['C# / .NET Developer', 'Backend Developer', 'Security-minded Engineer', 'Full-stack als het moet'],
    intro:
      "Backend developer met C# en .NET als thuisbasis. Ik bouw API's, services en applicaties die stabiel draaien, en kijk daarbij altijd met een security-bril.",
    cta: 'Bekijk projecten',
    contact: 'Contact',
  },

  about: {
    eyebrow: '01 — Over mij',
    title: 'Backend eerst, security altijd in het achterhoofd',
    bio: [
      "Ik ben Ayoub, C# en .NET developer. Mijn hart ligt bij de backend: API's, datamodellen, services en de logica die alles laat draaien. Daar voel ik me het meest thuis en daar bouw ik het liefst aan. Ik heb genoeg front-end achtergrond om een hele feature op te leveren, van endpoint tot scherm, maar de backend is waar ik het verschil maak.",
      'Daarnaast kijk ik steeds vaker door een security-bril naar wat ik bouw. Waar zitten de zwakke plekken, hoe ga je om met input, auth en data, en hoe maak je iets dat niet zomaar omvalt? Dat is de kant waar ik me verder in wil verdiepen. Ik leer het snelst door zelf te bouwen, dingen te slopen en ze beter terug te zetten.',
    ],
    stats: [
      { label: 'Focus', value: '.NET' },
      { label: 'Programmeertalen', value: '6+' },
      { label: 'Productie-projecten', value: '2+' },
      { label: 'Security mindset', value: '24/7' },
    ],
  },

  skills: {
    eyebrow: '02 — Skills',
    title: 'Waar ik mee werk',
    subtitle: 'Backend als zwaartepunt, front-end waar het nodig is.',
    groups: [
      { title: 'Backend (kern)', items: ['C#', '.NET', 'ASP.NET Core', "REST API's", 'Blazor (Razor)', 'SQL'] },
      { title: 'Overige talen', items: ['C++', 'C', 'Python', 'JavaScript', 'Dart'] },
      { title: 'Front-end & overig', items: ['React', 'TailwindCSS', 'HTML / CSS', 'Flutter', 'Electron'] },
    ],
    languages: [
      { name: 'Nederlands', level: 'Moedertaal', percentage: 100 },
      { name: 'Engels', level: 'Goede beheersing', percentage: 80 },
    ],
  },

  experience: {
    eyebrow: '03 — Ervaring',
    title: 'Werkervaring',
    items: [
      {
        title: 'Software Developer',
        company: 'DigiLab Technova',
        place: 'Ede',
        period: '2025 — 2026',
        points: [
          'Projecten gebouwd die daadwerkelijk in productie gaan.',
          'Uitgebreid gewerkt met Flutter op productieniveau.',
          'Geleerd om met klanten te communiceren en werk te plannen.',
        ],
        tags: ['Flutter', 'Dart', 'Productie'],
      },
      {
        title: 'Software Developer',
        company: 'LCT Textilligence',
        place: 'Tiel',
        period: '2024 — 2025',
        points: [
          'Front-end en back-end ontwikkeld in een nieuw framework (Blazor + Razor).',
          "Samengewerkt met collega's en begeleiders aan praktijkgerichte oplossingen.",
          'Eerste ervaring op de werkvloer als developer.',
        ],
        tags: ['C#', 'Blazor', '.NET'],
      },
    ],
  },

  projects: {
    eyebrow: '05 — Projecten',
    title: 'Dingen die ik gebouwd heb',
    all: 'Alle',
    categories: { Web: 'Web', Desktop: 'Desktop', Mobile: 'Mobile' },
    items: [],
  },

  contact: {
    eyebrow: '04 — Contact',
    title: 'Laten we samenwerken',
    subtitle: 'Op zoek naar een .NET developer? Stuur gerust een bericht.',
    form: {
      name: 'Naam',
      email: 'E-mailadres',
      message: 'Je bericht',
      send: 'Versturen',
      sending: 'Versturen...',
      sent: 'Verstuurd, ik neem snel contact op.',
      error: 'Versturen is mislukt. Probeer het later opnieuw.',
    },
    social: {
      linkedin: { label: 'LinkedIn', value: 'Profiel bekijken' },
      github: { label: 'GitHub', value: 'Repositories' },
    },
  },

  footer: 'Gebouwd met React, TailwindCSS & Framer Motion',
}
