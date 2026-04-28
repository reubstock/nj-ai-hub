# NJ AI Hub — Project Guide

## What This Is
A website inspired by njaihub.org — for the New Jersey AI Hub, a state-wide
center for AI research, innovation, accelerator programs, and workforce
training. Founded by Princeton University, NJEDA, Microsoft, and CoreWeave.

## Running Locally
```bash
npm install
npm start        # runs on http://localhost:3002
npm run dev      # same, with nodemon auto-restart
```

## Tech Stack
- **Backend**: Node.js + Express (`server/index.js`)
- **Database**: In-memory JS store (`server/store.js`) — seeds reset on cold start
- **Frontend**: Vanilla HTML/CSS/JS, no framework
- **Maps**: Leaflet.js with CartoDB Voyager tiles
- **Deployment**: Vercel (`vercel.json` routes all traffic through Express)

## File Structure
```
public/
  index.html       — Homepage (hero, mission, news preview, events, partners, CTA)
  news.html        — News & Announcements
  events.html      — Events listing + submit-event modal
  location.html    — NJ-focused Leaflet map (West Windsor pin + partner pins)
  team.html        — Team directory
  about.html       — About + contact form
  css/styles.css   — All styles
  js/nav.js        — Active nav link + mobile hamburger toggle

server/
  index.js         — Express app, static file serving, API route mounting
  store.js         — In-memory data store (news, events, team, partners, contacts)
  routes/
    news.js        — GET /api/news, GET /api/news/:id, POST /api/news
    events.js      — GET /api/events(?upcoming=true), GET/POST
    team.js        — GET /api/team, GET /api/team/:id
    partners.js    — GET /api/partners
    contact.js     — POST /api/contact
```

## Design System
- **Colors**: `--navy: #0b1d3a`, `--orange: #f57c00`, `--blue: #2b6cb0`, `--blue-light: #4a90d9`
- **Wordmark**: NJ (blue) + AI (orange) + HUB (white, small caps)
- **Theme**: Navy hero + light body + orange/blue accents, modern sans-serif

## Nav Links (all pages)
Home (`/`) | News | Events | Location | Our Team | Contact Us (CTA)

## Map (Location page)
Leaflet with CartoDB Voyager tiles. Default view uses `fitBounds` over a
NJ-focused bounding box — `[38.85, -75.75]` to `[41.45, -73.75]` — so NJ
fills the frame with slices of NY/PA/DE visible. Orange pulsing pin marks
the West Windsor hub; blue pins mark partners (Princeton, NJEDA, Rutgers,
NJIT, CoreWeave HQ).

## Deployment
- **Repo**: https://github.com/reubstock/nj-ai-hub
- Vercel auto-deploys on push to `main`
- `vercel.json` routes all requests through `server/index.js`
- Node 22 is pinned in `package.json`
- Data does not persist across Vercel cold starts — seeded data is always available

## Content Sources
- Press release content from princeton.edu/news (March 28, 2025 ribbon cutting)
- Partner/program details from njaihub.org news cards
- Visual identity inspired by njaihub.org (navy + orange, network motif)
