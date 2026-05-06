import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import ChatInterface from '../../components/ai/ChatInterface';
import { chatWithIdeationAgent, evaluateRisk } from '../../services/geminiService';
import { Plan, KPI, RiskAssessment } from '../../types';
import { Card, Button, ProgressBar } from '../../components/common/UI';
import { Save, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function Ideate() {
  const { state, dispatch } = useSEE();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hello Director. I am your Strategic Executive Engine Ideation Agent. To begin building a new strategic plan, could you tell me about the specific organizational challenge or opportunity you'd like to address today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Partial<Plan>>({
    title: "New Strategic Plan Draft",
    status: "Draft",
    owner: "Sarah Chen (CTO)", // Should ideally come from current user context
    smartGoal: {
      specific: "",
      measurable: "",
      achievable: "",
      relevant: "",
      timeBound: ""
    },
    kpis: [],
    linkedProjectIds: []
  });
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);
  const [isEvaluatingRisk, setIsEvaluatingRisk] = useState(false);

  const handleSendMessage = async (content: string) => {
    const newMessages = [...messages, { role: 'user' as const, content }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await chatWithIdeationAgent(newMessages, state.organization);
      
      // Try to see if Gemini returned a JSON plan
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const extractedPlan = JSON.parse(jsonMatch[0]);
          if (extractedPlan.smartGoal) {
            setCurrentPlan(prev => ({ ...prev, ...extractedPlan }));
          }
        } catch (e) {
          console.error("Failed to parse plan JSON from agent", e);
        }
      }

      setMessages([...newMessages, { role: 'assistant', content: response.replace(/\{[\s\S]*\}/, '').trim() }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: "I apologize, but I encountered an error processing your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvaluateRisk = async () => {
    if (!currentPlan.smartGoal?.specific) return;
    setIsEvaluatingRisk(true);
    try {
      const risk = await evaluateRisk(currentPlan as Plan);
      setRiskAssessment(risk);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEvaluatingRisk(false);
    }
  };

  const handleSavePlan = () => {
    const finalPlan: Plan = {
      ...currentPlan,
      id: `plan-${Math.floor(Math.random() * 1000)}`,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      riskAssessment: riskAssessment || undefined
    } as Plan;

    dispatch({ type: 'ADD_PLAN', payload: finalPlan });
    navigate('/leadership/plans');
  };

  const Sidebar = (
    <div className="space-y-4">
      <Card title="Plan Definition" subtitle="Real-time Preview">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Title</label>
            <div className="text-sm font-bold text-[#1F3864]">
              {currentPlan.title || 'Untitled Plan'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">SMART Goal</label>
            {Object.entries(currentPlan.smartGoal || {}).map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <div className="w-4 text-[10px] font-black text-blue-500 uppercase">{key[0]}</div>
                <div className="text-[11px] text-slate-600 italic">
                  {val || <span className="opacity-30">Pending...</span>}
                </div>
              </div>
            ))}
          </div>

          {currentPlan.kpis && currentPlan.kpis.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Suggested KPIs</label>
              {currentPlan.kpis.map((kpi: any, i: number) => (
                <div key={i} className="px-2 py-1 bg-blue-50 rounded text-[11px] font-medium text-blue-700">
                  {kpi.name}: {kpi.target} {kpi.unit}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {currentPlan.smartGoal?.specific && (
        <Card title="Strategic Resilience" subtitle="Powered by Risk Critic">
          {riskAssessment ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Risk Score</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                  riskAssessment.score === 'Low' ? "bg-emerald-100 text-emerald-700" :
                  riskAssessment.score === 'Medium' ? "bg-amber-100 text-amber-700" :
                  "bg-rose-100 text-rose-700"
                )}>
                  {riskAssessment.score}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed italic border-l-2 border-amber-400 pl-2">
                {riskAssessment.summary}
              </p>
              <div className="pt-2">
                 <Button size="sm" variant="outline" className="w-full text-[10px] py-1" onClick={() => setRiskAssessment(null)}>
                   Re-evaluate
                 </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-[10px] text-slate-400 mb-3">Analyze plan for cultural & environmental risks.</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={handleEvaluateRisk}
                isLoading={isEvaluatingRisk}
                disabled={!currentPlan.smartGoal?.specific}
              >
                <AlertTriangle size={14} className="mr-2" />
                Run Risk Audit
              </Button>
            </div>
          )}
        </Card>
      )}

      <div className="pt-4">
        <Button 
          variant="secondary" 
          className="w-full py-4 shadow-xl shadow-blue-600/20"
          onClick={handleSavePlan}
          disabled={!currentPlan.smartGoal?.specific}
        >
          <Save size={18} className="mr-2" />
          Commit Strategy
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Ideation Workspace</h1>
          <p className="text-slate-500 text-sm font-medium">Collaborate with SEE AI to craft precise strategic goals.</p>
        </div>
      </div>

      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        agentName="Ideation Agent"
        placeholder="Discuss your strategy, challenges, or goals..."
        sidebarContent={Sidebar}
      />
    </div>
  );
}
