# Strategic Executive Engine (SEE)

An AI-augmented enterprise platform that bridges strategy and execution. SEE provides three distinct role-based portals — **Leadership**, **Manager**, and **Imagineer** — each powered by Gemini AI agents to close the gap between organizational vision and operational delivery.

Built for Pathward Financial as a prototype for the Google SEE initiative.

---

## Architecture Overview

```
src/
├── components/
│   ├── ai/          # ChatInterface — shared AI conversation UI
│   ├── common/      # RoleGuard, reusable UI primitives
│   └── layout/      # MainLayout, Sidebar
├── context/         # SEEContext — global state via useReducer
├── data/            # initialData.ts — seed plans, projects, org structure
├── pages/
│   ├── leadership/  # Ideate, PlanLibrary, ROIDashboard
│   ├── manager/     # Home, Instantiate
│   ├── imagineer/   # Home, Tasks, Metrics, Discover
│   ├── dashboard/   # Progress (shared Leadership + Manager)
│   └── shared/      # PlanDetail, ProjectDetail
├── services/
│   └── geminiService.ts  # Three Gemini AI agents
└── types.ts         # Core domain types
```

## Role-Based Portals

### Leadership
- **Ideate** — conversational AI workspace (Gemini Ideation Agent) to craft SMART goals and KPIs, with a live plan preview sidebar
- **Risk Audit** — Gemini Risk Critic evaluates plans across cultural, environmental, and competitive dimensions
- **Plan Library** — browse, view, and manage committed strategic plans
- **ROI Dashboard** — aggregate savings, investment, ROI ratio, payback period, and KPI progress visualizations via Recharts

### Manager
- **Home** — overview of active plans and linked projects
- **Instantiate** — conversational AI workspace (Gemini Project Agent) to decompose strategic plans into executable projects with tasks, budgets, and metric stubs

### Imagineer
- **Home** — personal task summary and project health
- **Tasks** — view and update task status across assigned projects
- **Metrics** — update KPI-linked metrics that feed back into leadership dashboards
- **Discover** — explore organizational knowledge and solutions

## AI Agents

All three agents are implemented in [src/services/geminiService.ts](src/services/geminiService.ts) using `@google/genai`:

| Agent | Trigger | Output |
|---|---|---|
| **Ideation Agent** | Leadership → Ideate | SMART goal + KPI structured `Plan` JSON |
| **Risk Critic** | Leadership → Run Risk Audit | `RiskAssessment` JSON (score, factors, mitigations) |
| **Project Instantiation Agent** | Manager → Instantiate | Array of `Project` JSON objects with tasks and budgets |

Structured JSON outputs use `responseMimeType: "application/json"` with a typed `responseSchema` where applicable.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript + Vite 6 |
| Routing | React Router v7 |
| State | React `useReducer` + Context API |
| AI | Google Gemini (`@google/genai`) |
| Charts | Recharts |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the example env file and add your Gemini API key:
   ```
   cp .env.example .env.local
   ```
   Then set `GEMINI_API_KEY` in `.env.local` to your key from [Google AI Studio](https://aistudio.google.com/app/apikey).

3. Start the dev server:
   ```
   npm run dev
   ```
   The app runs at `http://localhost:3000`.

4. On the login screen, select a role (**Leadership**, **Manager**, or **Imagineer**) to enter the corresponding portal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type check |

## State Management

Global app state lives in [src/context/SEEContext.tsx](src/context/SEEContext.tsx) and manages:
- Active role
- Organization hierarchy (Divisions → Departments → Teams)
- Cost data (labor rates, department budgets)
- Plans and Projects (including nested Tasks and Metrics)

State mutations are dispatched via typed actions: `SET_ROLE`, `ADD_PLAN`, `UPDATE_PLAN`, `ADD_PROJECT`, `UPDATE_PROJECT`, `UPDATE_TASK`, `UPDATE_METRIC`.

---

© 2026 Pathward Financial — Strategic Executive Engine v1.0 Prototype
