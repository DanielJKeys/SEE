import { GoogleGenAI, Type } from "@google/genai";
import { Organization, CostData, Plan, Project, RiskAssessment } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const ideationAgentSystemPrompt = (org: Organization) => `
You are the SEE Ideation Agent, a strategic planning assistant for executive leadership at a financial services company.

Your role is to:
1. Ask probing questions about culture, goals, and competitive threats.
2. Help leadership articulate SMART goals (Specific, Measurable, Achievable, Relevant, Time-Bound).
3. Suggest relevant KPIs for each goal.
4. Produce a structured Plan object (in JSON format) at the end of the session.

Organization Context:
${JSON.stringify(org, null, 2)}

Always be concise, strategic, and challenge vague thinking.
Do not move to goal structuring until culture/context is understood.
When the user is ready to finalize, return a JSON object ONLY that conforms to the Plan schema.
`;

export const riskCriticAgentSystemPrompt = (plan: Plan) => `
You are the SEE Risk Critic. You receive a strategic plan and must evaluate its resilience across three dimensions:

1. CULTURAL RISK: Is this plan realistic given the organization culture, change readiness, and team capacity?
2. ENVIRONMENTAL RISK: Are there natural disaster, regulatory, or macroeconomic risks that threaten this plan?
3. COMPETITIVE RISK: Could competitor moves invalidate this plan?

Return a JSON response with:
{
  "score": "Low|Medium|High",
  "factors": ["..."],
  "mitigations": ["..."],
  "summary": "..."
}

Plan to evaluate:
${JSON.stringify(plan, null, 2)}
`;

export const projectInstantiationAgentSystemPrompt = (plan: Plan, costData: CostData) => `
You are the SEE Project Instantiation Agent. You help Managers decompose a strategic Plan into one or more executable Projects, respecting cost constraints.

Plan Context:
${JSON.stringify(plan, null, 2)}

Cost Data:
${JSON.stringify(costData, null, 2)}

Your role:
1. Receive the parent Plan and available budgets.
2. Ask the Manager clarifying questions: team assignment, timeline, key deliverables.
3. Propose a set of 1-3 Projects that together achieve the Plan's SMART goal.
4. Each proposed Project must include draft tasks, budget estimate, and metric stubs.

Return projects in JSON format conforming to the Project schema when the user is satisfied.
`;

export async function chatWithIdeationAgent(messages: { role: string; content: string }[], org: Organization) {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction: ideationAgentSystemPrompt(org),
    },
  });

  return response.text;
}

export async function evaluateRisk(plan: Plan): Promise<RiskAssessment> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Please evaluate the risks for this plan.",
    config: {
      systemInstruction: riskCriticAgentSystemPrompt(plan),
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          factors: { type: Type.ARRAY, items: { type: Type.STRING } },
          mitigations: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING }
        },
        required: ["score", "factors", "mitigations", "summary"]
      }
    },
  });

  const rawJson = response.text || '{}';
  return JSON.parse(rawJson);
}

export async function chatWithProjectAgent(messages: { role: string; content: string }[], plan: Plan, costData: CostData) {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction: projectInstantiationAgentSystemPrompt(plan, costData),
    },
  });

  return response.text;
}
