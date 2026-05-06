/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'Leadership' | 'Manager' | 'Imagineer';

export interface Team {
  id: string;
  name: string;
  lead: string;
  headcount: number;
}

export interface Department {
  id: string;
  name: string;
  director: string;
  headcount: number;
  teams?: Team[];
}

export interface Division {
  id: string;
  name: string;
  vp: string;
  headcount: number;
  departments: Department[];
}

export interface Organization {
  name: string;
  divisions: Division[];
}

export interface LaborRates {
  [key: string]: number;
}

export interface DepartmentBudget {
  deptId: string;
  annualBudget: number;
  allocated: number;
  available: number;
}

export interface CostData {
  laborRates: LaborRates;
  departmentBudgets: DepartmentBudget[];
  projectOverheadRate: number;
}

export interface SmartGoal {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface KPI {
  id: string;
  name: string;
  target: number;
  unit: string;
  current: number;
}

export interface RiskAssessment {
  score: 'Low' | 'Medium' | 'High';
  factors: string[];
  mitigations: string[];
  summary?: string;
}

export interface Plan {
  id: string;
  title: string;
  owner: string;
  createdDate: string;
  status: 'Draft' | 'Active' | 'Complete';
  smartGoal: SmartGoal;
  kpis: KPI[];
  riskAssessment?: RiskAssessment;
  linkedProjectIds: string[];
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'Not Started' | 'In Progress' | 'Complete';
  dueDate: string;
  storyPoints: number;
}

export interface Metric {
  id: string;
  name: string;
  linkedKpiId: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  source: string;
  lastUpdated: string;
}

export interface Project {
  id: string;
  parentPlanId: string;
  title: string;
  manager: string;
  status: 'Not Started' | 'In Progress' | 'Complete';
  startDate: string;
  targetEndDate: string;
  budget: {
    allocated: number;
    spent: number;
    remaining: number;
  };
  tasks: Task[];
  metrics: Metric[];
}

export interface AppState {
  role: Role | null;
  organization: Organization;
  costData: CostData;
  plans: Plan[];
  projects: Project[];
}
