# Portfolio — Ayoub Guebli

Persoonlijke portfoliosite. React + Vite + TailwindCSS v4 + Framer Motion, met NL/EN taalkeuze en dark/light thema.

## Starten

```bash
npm install
npm run dev
```

## Bouwen

```bash
npm run build
```

De output staat in `dist/`. Bij elke push naar `main` bouwt GitHub Actions de site en publiceert hem automatisch op GitHub Pages.

## Aanpassen

Alle content staat in `src/i18n/nl.js` (Nederlands) en `src/i18n/en.js` (Engels).
Het contactformulier verstuurt via Formspree; vul het endpoint in bovenaan `src/components/Contact.jsx`.
