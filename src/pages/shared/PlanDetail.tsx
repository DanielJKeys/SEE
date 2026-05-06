import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import { Card, Button, ProgressBar } from '../../components/common/UI';
import { 
  ChevronLeft, 
  Target, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar,
  User,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function PlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useSEE();
  const plan = state.plans.find(p => p.id === id);

  if (!plan) return <div className="p-12 text-center text-slate-400 font-bold">Plan not found.</div>;

  const linkedProjects = state.projects.filter(p => plan.linkedProjectIds.includes(p.id));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#1F3864] transition-colors shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">{plan.title}</h1>
            <span className={cn(
              "px-2 py-0.5 rounded text-[10px] font-black uppercase",
              plan.status === 'Active' ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
            )}>
              {plan.status}
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
            <User size={14} className="text-blue-500" />
            Strategy Owner: {plan.owner} • Created {plan.createdDate}
          </p>
        </div>
        {state.role === 'Manager' && (
           <Button onClick={() => navigate('/manager/instantiate', { state: { planId: plan.id } })}>
             <Plus size={18} className="mr-2" />
             Instantiate New Project
           </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card title="SMART Goal Framework" subtitle="Strategic Definition">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              <div className="space-y-4">
                 <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">Specific</span>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{plan.smartGoal.specific}</p>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">Measurable</span>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{plan.smartGoal.measurable}</p>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">Achievable</span>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{plan.smartGoal.achievable}</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">Relevant</span>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{plan.smartGoal.relevant}</p>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">Time-Bound</span>
                    <div className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                       <Calendar size={16} className="text-blue-500" />
                       {plan.smartGoal.timeBound}
                    </div>
                 </div>
              </div>
            </div>
          </Card>

          <Card title="Key Performance Indicators" subtitle="Success Metrics">
             <div className="space-y-8 pt-4">
                {plan.kpis.map((kpi) => (
                  <ProgressBar 
                    key={kpi.id}
                    label={kpi.name}
                    value={kpi.current}
                    target={kpi.target}
                    unit={kpi.unit === 'percent' ? '%' : ''}
                  />
                ))}
             </div>
          </Card>

          <div className="space-y-4">
             <h3 className="font-black text-[#1F3864] uppercase text-xs tracking-widest">Linked Operational Projects</h3>
             <div className="grid gap-4">
                {linkedProjects.map(proj => (
                  <Card 
                    key={proj.id} 
                    className="hover:border-blue-200 cursor-pointer transition-all border-l-4 border-l-indigo-600"
                    onClick={() => navigate(`/projects/${proj.id}`)}
                  >
                     <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-[#1F3864] text-sm">{proj.title}</h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{proj.manager} • {proj.status}</span>
                        </div>
                        <ArrowUpRight size={18} className="text-slate-300" />
                     </div>
                  </Card>
                ))}
                {linkedProjects.length === 0 && (
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400 text-sm font-bold">
                    No projects have been instantiated for this strategy yet.
                  </div>
                )}
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card title="Strategic Resilience" subtitle="Audit Report">
             {plan.riskAssessment ? (
               <div className="space-y-6 pt-2">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Score</span>
                     <div className={cn(
                       "px-2 py-1 rounded text-xs font-black uppercase tracking-tighter",
                       plan.riskAssessment.score === 'Low' ? "bg-emerald-100 text-emerald-700" :
                       plan.riskAssessment.score === 'Medium' ? "bg-amber-100 text-amber-700" :
                       "bg-rose-100 text-rose-700"
                     )}>
                       {plan.riskAssessment.score}
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary Indicators</span>
                     <div className="space-y-2">
                        {plan.riskAssessment.factors.map((factor, i) => (
                          <div key={i} className="flex gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                             <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                             <span className="text-[11px] font-bold text-slate-600">{factor}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-3">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-emerald-600">Mitigation Strategy</span>
                     <div className="space-y-2">
                        {plan.riskAssessment.mitigations.map((mitigation, i) => (
                          <div key={i} className="flex gap-2 p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                             <ShieldCheck size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                             <span className="text-[11px] font-bold text-emerald-800">{mitigation}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
             ) : (
               <div className="text-center py-6">
                  <p className="text-sm text-slate-400 font-bold mb-4">No risk audit found for this plan.</p>
                  {state.role === 'Leadership' && (
                    <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/leadership/ideate')}>Run Risk Analysis</Button>
                  )}
               </div>
             )}
          </Card>

          <Card title="Strategy Ownership">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#1F3864] font-black">SC</div>
                <div>
                   <h4 className="text-sm font-bold text-[#1F3864]">{plan.owner}</h4>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Strategic Lead</p>
                </div>
             </div>
             <div className="mt-6 pt-6 border-t border-slate-50 space-y-4">
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-slate-400 font-medium">Division</span>
                   <span className="text-[#1F3864]">Technology</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-slate-400 font-medium">Approved Value</span>
                   <span className="text-[#1F3864]">$1.2M NPV</span>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
