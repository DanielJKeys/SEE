import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Role, AppState, Plan, Project, Task, Metric } from '../types';
import { INITIAL_ORG_DATA, INITIAL_COST_DATA, INITIAL_PLANS, INITIAL_PROJECTS } from '../data/initialData';

type Action =
  | { type: 'SET_ROLE'; payload: Role | null }
  | { type: 'ADD_PLAN'; payload: Plan }
  | { type: 'UPDATE_PLAN'; payload: Plan }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'UPDATE_TASK'; payload: { projectId: string; task: Task } }
  | { type: 'UPDATE_METRIC'; payload: { projectId: string; metric: Metric } };

const initialState: AppState = {
  role: null,
  organization: INITIAL_ORG_DATA,
  costData: INITIAL_COST_DATA,
  plans: INITIAL_PLANS,
  projects: INITIAL_PROJECTS,
};

const SEEContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'ADD_PLAN':
      return { ...state, plans: [...state.plans, action.payload] };
    case 'UPDATE_PLAN':
      return {
        ...state,
        plans: state.plans.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        projects: state.projects.map((p) => {
          if (p.id === action.payload.projectId) {
            return {
              ...p,
              tasks: p.tasks.map((t) => (t.id === action.payload.task.id ? action.payload.task : t)),
            };
          }
          return p;
        }),
      };
    case 'UPDATE_METRIC':
      return {
        ...state,
        projects: state.projects.map((p) => {
          if (p.id === action.payload.projectId) {
            return {
              ...p,
              metrics: p.metrics.map((m) => (m.id === action.payload.metric.id ? action.payload.metric : m)),
            };
          }
          return p;
        }),
      };
    default:
      return state;
  }
}

export function SEEProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <SEEContext.Provider value={{ state, dispatch }}>{children}</SEEContext.Provider>;
}

export function useSEE() {
  const context = useContext(SEEContext);
  if (context === undefined) {
    throw new Error('useSEE must be used within a SEEProvider');
  }
  return context;
}
