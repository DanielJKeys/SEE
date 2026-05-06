import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import { Card, Button, ProgressBar } from '../../components/common/UI';
import { 
  CheckSquare, 
  TrendingUp, 
  Search, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  Zap,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ImagineerHome() {
  const { state } = useSEE();
  const navigate = useNavigate();

  // For imagineer Carlos Rivera (notional)
  const myTasks = state.projects.flatMap(p => p.tasks).filter(t => t.assignee === 'Carlos Rivera');
  const myStats = {
    total: myTasks.length,
    completed: myTasks.filter(t => t.status === 'Complete').length,
    inProgress: myTasks.filter(t => t.status === 'In Progress').length
  };

  const trendingProjects = state.projects.slice(0, 2);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Imagineer Desktop</h1>
          <p className="text-slate-500 text-sm font-medium">Ready to execute? You have {myStats.total - myStats.completed} pending tasks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             <Card className="border-l-4 border-l-blue-600">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">My Capacity</span>
                <h3 className="text-2xl font-black text-[#1F3864]">84%</h3>
                <div className="mt-2 text-[10px] font-bold text-slate-500">Utilization on track</div>
             </Card>
             <Card className="border-l-4 border-l-emerald-600">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tasks Completed</span>
                <h3 className="text-2xl font-black text-[#1F3864]">{myStats.completed}</h3>
                <div className="mt-2 text-[10px] font-bold text-slate-500">Last 30 days</div>
             </Card>
             <Card className="border-l-4 border-l-indigo-600">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Impact Score</span>
                <h3 className="text-2xl font-black text-[#1F3864]">8.2</h3>
                <div className="mt-2 text-[10px] font-bold text-slate-500">Strategy contribution level</div>
             </Card>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="font-black text-[#1F3864] uppercase text-xs tracking-widest">Priority Assignments</h3>
                <button onClick={() => navigate('/imagineer/tasks')} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                   View All <ArrowRight size={14} />
                </button>
             </div>
             <div className="grid gap-4">
                {myTasks.filter(t => t.status !== 'Complete').map((task, i) => (
                  <Card key={i} className="hover:border-blue-200 transition-all border-l-4 border-l-amber-400">
                     <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                           <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                              <Zap size={16} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-[#1F3864]">{task.title}</h4>
                              <p className="text-[10px] text-slate-500">Due by {task.dueDate} • {task.storyPoints} Story Points</p>
                           </div>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded">{task.status}</span>
                     </div>
                  </Card>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <Card title="Discover Solutions" subtitle="Prevent Duplication of Effort">
              <div className="space-y-4 pt-1 text-center">
                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <Search size={32} />
                 </div>
                 <div>
                    <h5 className="text-sm font-bold text-[#1F3864]">Unified Project Marketplace</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Search existing codebases, modules, and API layers before you build.</p>
                 </div>
                 <Button variant="outline" className="w-full" onClick={() => navigate('/imagineer/discover')}>
                    Browse Network Solutions
                 </Button>
              </div>
           </Card>

           <Card title="Coupled KPIs" subtitle="Value Tracking">
              <div className="space-y-4 pt-2">
                 {state.projects[0].metrics.map(metric => (
                   <div key={metric.id} className="space-y-2">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{metric.name}</span>
                          <span className="text-xs font-black text-emerald-600">{metric.currentValue}%</span>
                       </div>
                       <ProgressBar value={metric.currentValue} target={metric.targetValue} unit="%" />
                   </div>
                 ))}
                 <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate('/imagineer/metrics')}>
                    <TrendingUp size={14} className="mr-2" />
                    Update Metrics
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
