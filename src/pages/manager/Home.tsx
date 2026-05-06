import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import { Card, Button, ProgressBar } from '../../components/common/UI';
import { 
  Plus, 
  ArrowRight, 
  Library, 
  Briefcase, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ExternalLink,
  Users,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ManagerHome() {
  const { state } = useSEE();
  const navigate = useNavigate();

  // For manager James Okafor (notional)
  const myProjects = state.projects.filter(p => p.manager === 'James Okafor');
  const assignedPlans = state.plans.filter(p => p.status === 'Active');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Manager Hub</h1>
          <p className="text-slate-500 text-sm font-medium">James, you have {myProjects.length} active projects in your division.</p>
        </div>
        <Button onClick={() => navigate('/manager/instantiate')}>
          <Plus size={18} className="mr-2" />
          Instantiate Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Projects Summary */}
          <div className="space-y-4">
             <h3 className="font-black text-[#1F3864] uppercase text-xs tracking-widest">Ongoing Projects</h3>
             <div className="grid gap-4">
                {myProjects.map((project) => {
                   const progress = (project.tasks.filter(t => t.status === 'Complete').length / project.tasks.length) * 100;
                   return (
                     <Card 
                        key={project.id}
                        className="hover:border-blue-200 cursor-pointer transition-all border-l-4 border-l-indigo-600"
                        onClick={() => navigate(`/projects/${project.id}`)}
                     >
                        <div className="flex items-center justify-between">
                           <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-[#1F3864] text-sm">{project.title}</h4>
                                <span className="text-[10px] font-black px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded uppercase">{project.status}</span>
                              </div>
                              <ProgressBar value={progress} className="max-w-md" />
                           </div>
                           <div className="text-right ml-6">
                              <div className="text-sm font-black text-[#1F3864]">{Math.round(progress)}%</div>
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Done</div>
                           </div>
                        </div>
                     </Card>
                   );
                })}
             </div>
          </div>

          {/* Operational Alerts */}
          <Card title="Management Alerts" subtitle="Division: Technology">
             <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 bg-rose-50 rounded-2xl border border-rose-100">
                   <div className="flex items-center gap-3">
                      <AlertCircle className="text-rose-600" size={18} />
                      <span className="text-xs font-bold text-rose-900">Task "Bias Audit" Overdue (PROJ-001)</span>
                   </div>
                   <Button size="sm" variant="ghost" className="text-rose-600 text-[10px]">Resolve</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                   <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-600" size={18} />
                      <span className="text-xs font-bold text-emerald-900">Milestone "API Auth" Achieved (PROJ-002)</span>
                   </div>
                   <Button size="sm" variant="ghost" className="text-emerald-600 text-[10px]">Acknowledge</Button>
                </div>
             </div>
          </Card>
        </div>

        <div className="space-y-6">
           <Card title="Assigned Plans" subtitle="Translate into Projects">
              <div className="space-y-4 pt-2">
                 {assignedPlans.map(plan => (
                   <div key={plan.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <h5 className="text-xs font-black text-[#1F3864]">{plan.title}</h5>
                      <p className="text-[10px] text-slate-500 line-clamp-2 italic">"{plan.smartGoal.specific}"</p>
                      <button 
                         onClick={() => navigate('/manager/instantiate', { state: { planId: plan.id }})}
                         className="text-[10px] font-black text-blue-600 flex items-center gap-1 hover:underline pt-1"
                      >
                         <Plus size={12} /> Instantiate New Project
                      </button>
                   </div>
                 ))}
              </div>
           </Card>

           <Card title="Quick Actions">
              <div className="grid gap-2 pt-2">
                 <Button variant="outline" size="sm" className="justify-start text-xs" onClick={() => navigate('/dashboard/progress')}>
                    <TrendingUp size={14} className="mr-2" />
                    Open Progress Dashboard
                 </Button>
                 <Button variant="outline" size="sm" className="justify-start text-xs">
                    <Users size={14} className="mr-2" />
                    Manage Division Teams
                 </Button>
                 <Button variant="outline" size="sm" className="justify-start text-xs">
                    <DollarSign size={14} className="mr-2" />
                    Review Budget Allocations
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
