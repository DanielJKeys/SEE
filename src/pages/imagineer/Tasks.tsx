import React from 'react';
import { useSEE } from '../../context/SEEContext';
import { Card, Button } from '../../components/common/UI';
import { 
  CheckSquare, 
  Clock, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function MyTasks() {
  const { state, dispatch } = useSEE();
  
  // Notional: Get tasks for Priya Nair
  const myProjectTasks = state.projects.map(p => ({
    projectId: p.id,
    projectTitle: p.title,
    tasks: p.tasks.filter(t => t.assignee === 'Priya Nair')
  })).filter(p => p.tasks.length > 0);

  const handleToggleTask = (projectId: string, task: any) => {
    const newStatus = task.status === 'Complete' ? 'In Progress' : 'Complete';
    dispatch({
      type: 'UPDATE_TASK',
      payload: { projectId, task: { ...task, status: newStatus } }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Daily Execution</h1>
        <p className="text-slate-500 text-sm font-medium">Manage your active assignments and report operational progress.</p>
      </div>

      <div className="space-y-12">
        {myProjectTasks.map((group, gi) => (
          <div key={group.projectId} className="space-y-4">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center">
                  <CheckSquare size={14} />
                </div>
                <h3 className="font-black text-[#1F3864] uppercase text-xs tracking-widest">{group.projectTitle}</h3>
             </div>

             <div className="grid gap-4">
                {group.tasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="hover:border-blue-200 transition-all p-0">
                       <div className="flex items-center p-4">
                          <button 
                             onClick={() => handleToggleTask(group.projectId, task)}
                             className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 mr-4",
                                task.status === 'Complete' 
                                  ? "bg-emerald-100 text-emerald-600" 
                                  : "bg-slate-100 text-slate-300 hover:bg-slate-200"
                             )}
                          >
                             {task.status === 'Complete' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                          </button>

                          <div className={cn("flex-1", task.status === 'Complete' && "opacity-50")}>
                             <h4 className={cn(
                                "font-bold text-[#1F3864]",
                                task.status === 'Complete' && "line-through grayscale"
                             )}>
                               {task.title}
                             </h4>
                             <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                   <Calendar size={12} />
                                   <span>Due {task.dueDate}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                   <Clock size={12} />
                                   <span>{task.storyPoints} Points</span>
                                </div>
                             </div>
                          </div>

                          <div className="flex items-center gap-4">
                             <span className={cn(
                               "px-2 py-0.5 rounded text-[9px] font-black uppercase",
                               task.status === 'Complete' ? "bg-emerald-50 text-emerald-700" :
                               task.status === 'In Progress' ? "bg-blue-50 text-blue-700" :
                               "bg-slate-50 text-slate-500"
                             )}>
                               {task.status}
                             </span>
                             <button className="text-slate-200 hover:text-slate-400">
                               <MoreVertical size={18} />
                             </button>
                          </div>
                       </div>
                    </Card>
                  </motion.div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
