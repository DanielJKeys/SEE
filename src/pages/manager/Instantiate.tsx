import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import ChatInterface from '../../components/ai/ChatInterface';
import { chatWithProjectAgent } from '../../services/geminiService';
import { Card, Button } from '../../components/common/UI';
import { Project, Plan } from '../../types';
import { Save, Briefcase, ChevronLeft, Target } from 'lucide-react';

export default function Instantiate() {
  const { state, dispatch } = useSEE();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlanId = location.state?.planId;
  const initialPlan = state.plans.find(p => p.id === selectedPlanId) || state.plans[0];

  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: `Hello Manager. I am ready to help you instantiate projects for the strategy: "${initialPlan.title}". What is your proposed timeline and first major deliverable for this initiative?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [proposedProjects, setProposedProjects] = useState<Project[]>([]);

  const handleSendMessage = async (content: string) => {
    const newMessages = [...messages, { role: 'user' as const, content }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await chatWithProjectAgent(newMessages, initialPlan, state.costData);
      
      // Try to extract proposed projects JSON
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
         try {
           const projects = JSON.parse(jsonMatch[0]);
           if (Array.isArray(projects)) {
             setProposedProjects(projects);
           }
         } catch (e) {
           console.error("Failed to parse projects", e);
         }
      }

      setMessages([...newMessages, { role: 'assistant', content: response.replace(/\[[\s\S]*\]/, '').trim() }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptProject = (project: Project) => {
    const finalProject = {
      ...project,
      id: `proj-${crypto.randomUUID()}`,
      parentPlanId: initialPlan.id,
      manager: 'James Okafor', // Notional
      status: 'Not Started' as const,
    };
    dispatch({ type: 'ADD_PROJECT', payload: finalProject });
    navigate('/manager');
  };

  const Sidebar = (
    <div className="space-y-4">
      <Card title="Strategy Context">
         <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase text-slate-400">Parent Plan</span>
            </div>
            <h4 className="text-sm font-bold text-[#1F3864] leading-tight">{initialPlan.title}</h4>
            <p className="text-[11px] text-slate-500 italic leading-relaxed">"{initialPlan.smartGoal.specific}"</p>
         </div>
      </Card>

      <div className="space-y-4">
        <h3 className="font-black text-[#1F3864] uppercase text-xs tracking-widest px-2">Proposed Structures</h3>
        {proposedProjects.length > 0 ? (
          proposedProjects.map((proj, i) => (
            <Card key={i} title={proj.title} subtitle="AI Generated Structure">
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400 uppercase">Tasks</span>
                    <span className="text-[#1F3864]">{proj.tasks.length}</span>
                  </div>
                  <div className="space-y-1">
                    {proj.tasks.slice(0, 3).map((t, ti) => (
                      <div key={ti} className="text-[10px] text-slate-600 truncate">• {t.title}</div>
                    ))}
                    {proj.tasks.length > 3 && <div className="text-[9px] text-blue-500 italic">+{proj.tasks.length - 3} more</div>}
                  </div>
                  <Button size="sm" className="w-full" onClick={() => handleAcceptProject(proj)}>
                    <Save size={14} className="mr-2" />
                    Accept & Instantiate
                  </Button>
               </div>
            </Card>
          ))
        ) : (
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-2">
             <Briefcase className="mx-auto text-slate-300" size={32} />
             <p className="text-xs font-bold text-slate-400">Discuss with Agent to generate project structures.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#1F3864] transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Project Instantiation</h1>
          <p className="text-slate-500 text-sm font-medium">Decompose strategy into executable operational pipelines.</p>
        </div>
      </div>

      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        agentName="Project Agent"
        placeholder="Discuss team requirements, timelines, and milestones..."
        sidebarContent={Sidebar}
      />
    </div>
  );
}
