# Energy Frontend

React + TypeScript frontend for the UK Energy Mix & EV Charging Optimizer.

## Live app

https://energy-frontend-ft9h.onrender.com

## Features

- Three pie charts (today, tomorrow, day after tomorrow) showing the average energy mix per day
- A table under each chart listing every fuel and its share, so the data does not depend on colour or on overlapping labels
- Clean energy percentage for each day
- Optimal EV charging window calculator (1 to 6 hours) with input validation
- Loading, error and empty states for every request

## Tech stack

- React 19 + TypeScript
- Vite
- Recharts (pie charts)
- Axios (API calls)
- Vitest + Testing Library (unit and component tests)
- Deployed on Render

## Configuration

The backend URL is read from the `VITE_API_BASE_URL` environment variable (see `.env.example`).

```bash
cp .env.example .env.local
```

Without a `.env.local`, the app falls back to `http://localhost:5252/api/energy`.
On Render, set `VITE_API_BASE_URL` in the service's Environment tab.

## Run locally

Start the backend first (see the backend repository), then:

```bash
npm install
npm run dev
```

The app is available at `http://localhost:5173`.

## Tests

```bash
npm test
```

The API layer (`src/api.ts`) is mocked, so tests are deterministic and need no network.

## Project structure

```
src/
  api.ts                 HTTP calls (typed with Axios)
  types.ts               API types
  constants.ts           Allowed duration range, number of days shown
  validation.ts          Duration input parsing
  format.ts              Date formatting
  chartData.ts           Chart data preparation and fuel colours
  getErrorMessage.ts     Extracts a readable message from API errors
  hooks/                 useEnergyMix, useOptimalWindow
  components/            EnergyMixSection, OptimalWindowSection
  EnergyPieChart.tsx     One day: pie chart + table
```

## Backend repository

https://github.com/davidset87/energy-api