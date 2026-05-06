import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import { Card, Button, ProgressBar } from '../../components/common/UI';
import { 
  ChevronLeft, 
  Briefcase, 
  CheckSquare, 
  DollarSign, 
  Calendar,
  User,
  Users,
  Target,
  Clock,
  MoreVertical,
  Info,
  ArrowUpRight
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useSEE();
  const project = state.projects.find(p => p.id === id);

  if (!project) return <div className="p-12 text-center text-slate-400 font-bold">Project not found.</div>;

  const parentPlan = state.plans.find(p => p.id === project.parentPlanId);
  const completedTasks = project.tasks.filter(t => t.status === 'Complete').length;
  const progress = (completedTasks / (project.tasks.length || 1)) * 100;
  const budgetUsed = (project.budget.spent / project.budget.allocated) * 100;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#1F3864] transition-colors shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">{project.title}</h1>
            <span className={cn(
              "px-2 py-0.5 rounded text-[10px] font-black uppercase",
              project.status === 'Complete' ? "bg-emerald-100 text-emerald-700" :
              project.status === 'In Progress' ? "bg-blue-100 text-blue-700" :
              "bg-slate-100 text-slate-700"
            )}>
              {project.status}
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
            <User size={14} className="text-indigo-500" />
            Project Manager: {project.manager} • Timeline: {project.startDate} to {project.targetEndDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="text-center">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Execution Status</span>
                 <div className="text-3xl font-black text-[#1F3864]">{Math.round(progress)}%</div>
                 <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">{completedTasks} / {project.tasks.length} Sub-tasks Done</div>
              </Card>
              <Card className="text-center">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Budget Allocation</span>
                 <div className="text-3xl font-black text-indigo-600">{formatCurrency(project.budget.allocated)}</div>
                 <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">{Math.round(budgetUsed)}% Spent vs Approved</div>
              </Card>
              <Card className="text-center">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Impact Coupling</span>
                 <div className="text-3xl font-black text-emerald-600">{project.metrics.length}</div>
                 <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">Strategic Indicators Linked</div>
              </Card>
           </div>

           <Card title="Task Pipeline" subtitle="Operational Sub-units">
              <div className="space-y-2 pt-2">
                 {project.tasks.map((task) => (
                   <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className={cn(
                           "w-3 h-3 rounded-full",
                           task.status === 'Complete' ? "bg-emerald-500" :
                           task.status === 'In Progress' ? "bg-blue-500" :
                           "bg-slate-300"
                         )}></div>
                         <div>
                            <h5 className="text-sm font-bold text-[#1F3864] leading-tight">{task.title}</h5>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Assignee: {task.assignee}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="text-[10px] font-black text-slate-400 uppercase">{task.dueDate}</span>
                         <MoreVertical size={16} className="text-slate-300" />
                      </div>
                   </div>
                 ))}
              </div>
           </Card>

           {project.metrics.length > 0 && (
             <Card title="Coupled Value Metrics" subtitle="Real-time Strategic Feedback">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                   {project.metrics.map(metric => (
                     <div key={metric.id} className="space-y-4">
                        <div className="flex justify-between items-end">
                           <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{metric.name}</span>
                              <div className="text-2xl font-black text-emerald-600">{metric.currentValue}{metric.unit === 'percent' ? '%' : ''}</div>
                           </div>
                           <div className="text-right">
                              <span className="text-[10px] font-black font-mono text-slate-300 uppercase block leading-none">Target</span>
                              <span className="text-sm font-black text-slate-300">{metric.targetValue}{metric.unit === 'percent' ? '%' : ''}</span>
                           </div>
                        </div>
                        <ProgressBar value={metric.currentValue} target={metric.targetValue} unit={metric.unit === 'percent' ? '%' : ''} />
                        <div className="flex items-center gap-2 pt-1">
                           <div className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase">Source: {metric.source}</div>
                           <span className="text-[9px] text-slate-400 font-bold">Last Updated: {metric.lastUpdated}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </Card>
           )}
        </div>

        <div className="space-y-8">
           <Card title="Parent Strategy">
              {parentPlan ? (
                <div className="space-y-4">
                   <div className="flex items-center gap-2">
                      <Target size={14} className="text-blue-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Strategic Goal</span>
                   </div>
                   <h4 className="text-sm font-bold text-[#1F3864] leading-tight">{parentPlan.title}</h4>
                   <p className="text-[11px] text-slate-500 italic leading-relaxed">"{parentPlan.smartGoal.specific}"</p>
                   <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/plans/${parentPlan.id}`)}>
                      Explore Strategy <ArrowUpRight size={14} className="ml-2" />
                   </Button>
                </div>
              ) : (
                <p className="text-sm text-slate-400 font-bold">Standalone Project</p>
              )}
           </Card>

           <Card title="Project Resources">
              <div className="space-y-6 pt-2">
                 <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                       <Users size={16} className="text-blue-500" />
                       <span className="text-slate-500 font-medium tracking-tight">Active Contributors</span>
                    </div>
                    <span className="text-[#1F3864]">12</span>
                 </div>
                 <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                       <Clock size={16} className="text-amber-500" />
                       <span className="text-slate-500 font-medium tracking-tight">Elapsed Days</span>
                    </div>
                    <span className="text-[#1F3864]">42</span>
                 </div>
                 <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                       <DollarSign size={16} className="text-emerald-500" />
                       <span className="text-slate-500 font-medium tracking-tight">Average Hourly Rate</span>
                       <Info size={12} className="text-slate-300" />
                    </div>
                    <span className="text-[#1F3864]">$125</span>
                 </div>
              </div>
           </Card>

           <Card title="Operational Control">
              <div className="grid grid-cols-2 gap-2">
                 <Button variant="outline" size="sm" className="text-[10px] p-2 h-auto text-left flex flex-col items-start gap-1">
                    <CheckSquare size={14} />
                    Audit Logs
                 </Button>
                 <Button variant="outline" size="sm" className="text-[10px] p-2 h-auto text-left flex flex-col items-start gap-1">
                    <Briefcase size={14} />
                    Resource Panel
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
