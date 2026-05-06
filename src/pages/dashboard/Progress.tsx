import React from 'react';
import { useSEE } from '../../context/SEEContext';
import { Card, ProgressBar } from '../../components/common/UI';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Layers
} from 'lucide-react';
import { cn, formatCurrency, formatPercent } from '../../lib/utils';
import { motion } from 'motion/react';

export default function ProgressDashboard() {
  const { state } = useSEE();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Progress Dashboard</h1>
        <p className="text-slate-500 text-sm font-medium">Real-time operational visibility across all active projects.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <Card className="bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Layers size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Projects</p>
                <h3 className="text-xl font-black text-[#1F3864]">{state.projects.length}</h3>
              </div>
            </div>
         </Card>
         <Card className="bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed</p>
                <h3 className="text-xl font-black text-[#1F3864]">
                  {state.projects.filter(p => p.status === 'Complete').length}
                </h3>
              </div>
            </div>
         </Card>
         <Card className="bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Progress</p>
                <h3 className="text-xl font-black text-[#1F3864]">
                  {state.projects.filter(p => p.status === 'In Progress').length}
                </h3>
              </div>
            </div>
         </Card>
         <Card className="bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">At Risk</p>
                <h3 className="text-xl font-black text-[#1F3864]">1</h3>
              </div>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {state.projects.map((project, i) => {
          const completedTasks = project.tasks.filter(t => t.status === 'Complete').length;
          const totalTasks = project.tasks.length;
          const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
          const budgetUsed = (project.budget.spent / project.budget.allocated) * 100;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card 
                title={project.title}
                subtitle={`Owned by ${project.manager}`}
                actions={<MoreVertical size={16} className="text-slate-400" />}
                className="hover:border-blue-300 transition-all"
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-2xl">
                       <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Timeline</span>
                       <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Calendar size={14} className="text-blue-500" />
                          <span>{project.startDate} — {project.targetEndDate}</span>
                       </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl">
                       <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Budget Burn</span>
                       <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-xs font-black",
                            budgetUsed > 90 ? "text-rose-600" : "text-blue-600"
                          )}>
                            {formatPercent(budgetUsed)}
                          </span>
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                             <div 
                                className={cn(
                                  "h-full rounded-full",
                                  budgetUsed > 90 ? "bg-rose-500" : "bg-blue-500"
                                )} 
                                style={{ width: `${budgetUsed}%` }}
                             />
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Execution Progress</span>
                       <span className="text-xl font-black text-[#1F3864]">{Math.round(progress)}%</span>
                    </div>
                    <ProgressBar value={progress} />
                  </div>

                  {project.metrics.length > 0 && (
                    <div className="pt-4 border-t border-slate-50 space-y-3">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Coupled Metrics</span>
                       {project.metrics.map(metric => (
                         <div key={metric.id} className="flex items-center justify-between p-2 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                            <span className="text-[11px] font-bold text-[#1F3864]">{metric.name}</span>
                            <div className="flex items-center gap-2">
                               <span className="text-[11px] font-black text-indigo-600">{metric.currentValue}{metric.unit === 'percent' ? '%' : ''}</span>
                               <span className="text-[9px] text-indigo-300 font-bold">Target: {metric.targetValue}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between text-[11px] font-bold">
                    <div className="flex items-center gap-4 text-slate-500">
                       <div className="flex items-center gap-1">
                          <CheckCircle2 size={14} className="text-emerald-500" />
                          <span>{completedTasks} / {totalTasks} Tasks</span>
                       </div>
                       <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{project.metrics.length > 0 ? 'Linked' : 'Standalone'}</span>
                       </div>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded uppercase font-black text-[9px]",
                      project.status === 'Complete' ? "bg-emerald-100 text-emerald-700" :
                      project.status === 'In Progress' ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-700"
                    )}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
