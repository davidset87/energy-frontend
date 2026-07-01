# Energy Frontend 🌱

React + TypeScript frontend for the UK Energy Mix & EV Charging Optimizer app.

## Live App
🔗 https://energy-frontend-ft9h.onrender.com

## Features
- 📊 3 pie charts showing energy mix for today, tomorrow, and the day after tomorrow
- ⚡ Optimal EV charging window calculator (1–6 hours)
- 🌿 Clean energy percentage displayed for each day
- 🔴 Real-time data from the UK Carbon Intensity API

## Tech Stack
- React 18 + TypeScript
- Vite
- Recharts (pie charts)
- Axios (API calls)
- Deployed on Render

## Run Locally

```bash
npm install
npm run dev
```

App will be available at `http://localhost:5173`

> ⚠️ Make sure the backend is running at `http://localhost:5252` or update `src/api.ts` with the correct URL.

## Backend Repository
🔗 https://github.com/davidset87/energy-api