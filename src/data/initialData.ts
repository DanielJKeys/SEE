import { Organization, CostData, Plan, Project } from '../types';

export const INITIAL_ORG_DATA: Organization = {
  name: "Pathward Financial",
  divisions: [
    {
      id: "div-001",
      name: "Technology",
      vp: "Sarah Chen",
      headcount: 320,
      departments: [
        {
          id: "dept-001",
          name: "AI & Innovation",
          director: "James Okafor",
          headcount: 45,
          teams: [
            { id: "team-001", name: "ML Engineering", lead: "Priya Nair", headcount: 12 },
            { id: "team-002", name: "Platform Engineering", lead: "Carlos Rivera", headcount: 18 }
          ]
        },
        {
          id: "dept-002",
          name: "Data & Analytics",
          director: "Monica Tran",
          headcount: 60,
          teams: [
            { id: "team-003", name: "Data Science", lead: "Raj Patel", headcount: 20 }
          ]
        }
      ]
    },
    {
      id: "div-002",
      name: "Operations",
      vp: "David Williams",
      headcount: 210,
      departments: [
        {
          id: "dept-003",
          name: "Benefits Administration",
          director: "Angela Foster",
          headcount: 85
        }
      ]
    }
  ]
};

export const INITIAL_COST_DATA: CostData = {
  laborRates: {
    "Engineer_L1": 85,
    "Engineer_L2": 115,
    "Engineer_L3": 145,
    "DataScientist_L2": 130,
    "Manager": 160,
    "Director": 210
  },
  departmentBudgets: [
    { deptId: "dept-001", annualBudget: 4200000, allocated: 2800000, available: 1400000 },
    { deptId: "dept-002", annualBudget: 3100000, allocated: 1900000, available: 1200000 },
    { deptId: "dept-003", annualBudget: 5500000, allocated: 4100000, available: 1400000 }
  ],
  projectOverheadRate: 0.18
};

export const INITIAL_PLANS: Plan[] = [
  {
    id: "plan-001",
    title: "AI-Powered Benefits Approval Vetting",
    owner: "Sarah Chen (CTO)",
    createdDate: "2026-01-15",
    status: "Active",
    smartGoal: {
      specific: "Integrate an AI model that automatically vets patient applications for benefits eligibility.",
      measurable: "Achieve >= 97% prediction accuracy on vetting decisions.",
      achievable: "Leverage existing ML Engineering team + 2 contract hires.",
      relevant: "Reduce manual review time and improve approval throughput.",
      timeBound: "Full deployment by Q4 2026."
    },
    kpis: [
      { id: "kpi-001", name: "Prediction Accuracy", target: 97, unit: "percent", current: 89.4 },
      { id: "kpi-002", name: "Manual Review Reduction", target: 60, unit: "percent", current: 15 },
      { id: "kpi-003", name: "Avg Processing Time", target: 2, unit: "minutes", current: 18 }
    ],
    riskAssessment: {
      score: "Medium",
      factors: ["Regulatory change risk", "Model bias risk", "Staff adoption resistance"],
      mitigations: ["Bias audit pipeline", "Change management plan"]
    },
    linkedProjectIds: ["proj-001", "proj-002"]
  },
  {
    id: "plan-002",
    title: "Operational Cost Reduction via Automation",
    owner: "David Williams (COO)",
    createdDate: "2026-02-10",
    status: "Active",
    smartGoal: {
      specific: "Automate 40% of standard claims processing workflows.",
      measurable: "25% reduction in operational costs.",
      achievable: "Utilize existing RPA tools and external consultants.",
      relevant: "Optimize margins and scale without proportional headcount growth.",
      timeBound: "By Q3 2026."
    },
    kpis: [
      { id: "kpi-004", name: "Cost Reduction", target: 25, unit: "percent", current: 8 },
      { id: "kpi-005", name: "Automation Rate", target: 40, unit: "percent", current: 12 }
    ],
    linkedProjectIds: ["proj-003"]
  },
  {
    id: "plan-003",
    title: "Employee Digital Experience Modernization",
    owner: "Sarah Chen (CTO)",
    createdDate: "2026-03-05",
    status: "Draft",
    smartGoal: {
      specific: "Upgrade internal communication and project management toolsets.",
      measurable: "Internal NPS score >= 75.",
      achievable: "Rollout Microsoft 365 and SEE platform.",
      relevant: "Improve employee retention and collaboration efficiency.",
      timeBound: "By Q1 2027."
    },
    kpis: [
      { id: "kpi-006", name: "Internal NPS", target: 75, unit: "score", current: 0 }
    ],
    linkedProjectIds: ["proj-004"]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-001",
    parentPlanId: "plan-001",
    title: "ML Model Training Pipeline",
    manager: "James Okafor",
    status: "In Progress",
    startDate: "2026-02-01",
    targetEndDate: "2026-08-31",
    budget: {
      allocated: 480000,
      spent: 142000,
      remaining: 338000
    },
    tasks: [
      { id: "task-001", title: "Data ingestion pipeline setup", assignee: "Priya Nair", status: "Complete", dueDate: "2026-03-15", storyPoints: 8 },
      { id: "task-002", title: "Train baseline classification model", assignee: "Raj Patel", status: "In Progress", dueDate: "2026-06-30", storyPoints: 21 },
      { id: "task-003", title: "Bias audit and fairness testing", assignee: "Unassigned", status: "Not Started", dueDate: "2026-07-31", storyPoints: 13 },
      { id: "task-009", title: "Scale database clusters for training feedback", assignee: "Carlos Rivera", status: "In Progress", dueDate: "2026-06-15", storyPoints: 8 }
    ],
    metrics: [
      { id: "metric-001", name: "Model Accuracy", linkedKpiId: "kpi-001", currentValue: 89.4, targetValue: 97, unit: "percent", source: "Coupled (notional)", lastUpdated: "2026-05-01" }
    ],
    tags: ["AI/ML"]
  },
  {
    id: "proj-002",
    parentPlanId: "plan-001",
    title: "Benefits API Integration Layer",
    manager: "James Okafor",
    status: "In Progress",
    startDate: "2026-03-01",
    targetEndDate: "2026-09-30",
    budget: {
      allocated: 220000,
      spent: 121000,
      remaining: 99000
    },
    tasks: [
      { id: "task-004", title: "API authentication logic", assignee: "Carlos Rivera", status: "Complete", dueDate: "2026-04-10", storyPoints: 5 },
      { id: "task-005", title: "Legacy system endpoint discovery", assignee: "Carlos Rivera", status: "In Progress", dueDate: "2026-05-20", storyPoints: 13 },
      { id: "task-010", title: "API caching layer optimization", assignee: "Carlos Rivera", status: "Not Started", dueDate: "2026-07-15", storyPoints: 5 },
      { id: "task-011", title: "CI/CD deployment script for legacy proxy", assignee: "Carlos Rivera", status: "In Progress", dueDate: "2026-05-25", storyPoints: 8 }
    ],
    metrics: [],
    tags: ["Infrastructure", "Legacy"]
  },
  {
    id: "proj-003",
    parentPlanId: "plan-002",
    title: "RPA Claims Processing Bot",
    manager: "Monica Tran",
    status: "Complete",
    startDate: "2026-01-01",
    targetEndDate: "2026-04-30",
    budget: {
      allocated: 310000,
      spent: 308000,
      remaining: 2000
    },
    tasks: [
      { id: "task-006", title: "Script claim validation steps", assignee: "Priya Nair", status: "Complete", dueDate: "2026-02-15", storyPoints: 13 },
      { id: "task-007", title: "UAT with Operations team", assignee: "Monica Tran", status: "Complete", dueDate: "2026-04-15", storyPoints: 8 }
    ],
    metrics: [
      { id: "metric-002", name: "Automation Efficiency", linkedKpiId: "kpi-005", currentValue: 12, targetValue: 40, unit: "percent", source: "Internal Tool", lastUpdated: "2026-04-30" }
    ],
    tags: ["Automation"]
  },
  {
    id: "proj-004",
    parentPlanId: "plan-003",
    title: "Internal HR Portal Rebuild",
    manager: "Monica Tran",
    status: "Not Started",
    startDate: "2026-06-01",
    targetEndDate: "2026-12-31",
    budget: {
      allocated: 190000,
      spent: 0,
      remaining: 190000
    },
    tasks: [
      { id: "task-008", title: "Define portal architecture", assignee: "Carlos Rivera", status: "Not Started", dueDate: "2026-06-30", storyPoints: 13 },
      { id: "task-012", title: "Mobile responsiveness audit for portal", assignee: "Carlos Rivera", status: "Not Started", dueDate: "2026-08-15", storyPoints: 3 }
    ],
    metrics: [],
    tags: ["Infrastructure", "Mobile"]
  }
];
