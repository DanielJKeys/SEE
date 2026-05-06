import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import { Card, Button } from '../../components/common/UI';
import { Shield, LayoutGrid, List, Search, Plus, ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function PlanLibrary() {
  const { state } = useSEE();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Plan Library</h1>
          <p className="text-slate-500 text-sm font-medium">Browse and manage the organization's strategic repository.</p>
        </div>
        <Button onClick={() => navigate('/leadership/ideate')}>
          <Plus size={18} className="mr-2" />
          Create New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card 
              className="h-full flex flex-col hover:border-blue-300 transition-all cursor-pointer group"
              title={plan.title}
              actions={
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                  plan.status === 'Active' ? "bg-blue-100 text-blue-700" :
                  plan.status === 'Draft' ? "bg-slate-100 text-slate-700" :
                  "bg-emerald-100 text-emerald-700"
                )}>
                  {plan.status}
                </span>
              }
              subtitle={`Created by ${plan.owner} • ${plan.createdDate}`}
            >
              <div 
                className="flex-1 space-y-4"
                onClick={() => navigate(`/plans/${plan.id}`)}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Objective</span>
                  <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                    {plan.smartGoal.specific}
                  </p>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-slate-50">
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#1F3864]">{plan.kpis.length}</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">KPIs</div>
                  </div>
                  <div className="text-center px-4 border-x border-slate-100">
                    <div className="text-sm font-bold text-[#1F3864]">{plan.linkedProjectIds.length}</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className={cn(
                      "text-sm font-bold",
                      plan.riskAssessment?.score === 'High' ? "text-rose-600" :
                      plan.riskAssessment?.score === 'Medium' ? "text-amber-600" :
                      "text-emerald-600"
                    )}>
                      {plan.riskAssessment?.score || 'N/A'}
                    </div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Risk Score</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">+2</div>
                  </div>
                  <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    <ExternalLink size={16} />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
