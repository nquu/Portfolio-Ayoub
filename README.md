# Portfolio

Persoonlijke portfoliosite van Ayoub Guebli. Gebouwd met React, Vite, TailwindCSS v4 en Framer Motion. Tweetalig (NL/EN) met dark/light thema.

## Ontwikkelen

```bash
npm install
npm run dev
```

## Bouwen

```bash
npm run build
```

De output komt in `dist/`. Elke push naar `main` wordt via GitHub Actions gebouwd en op GitHub Pages gepubliceerd.

## Structuur

```
src/
  components/   UI-secties (Navbar, Hero, About, Skills, Experience, Projects, Contact, Footer)
  hooks/        useTheme, useTypewriter, useActiveSection
  i18n/         Vertalingen (nl.js, en.js) en LanguageContext
  lib/          Gedeelde helpers (animaties, storage)
  config.js     Social links en contactformulier-endpoint
```

## Content aanpassen

Teksten staan in `src/i18n/nl.js` en `src/i18n/en.js`. Projecten voeg je toe aan `projects.items`; de sectie verschijnt automatisch zodra de lijst gevuld is.

Het contactformulier verstuurt naar het endpoint in `src/config.js` (bijvoorbeeld een Formspree-URL).
