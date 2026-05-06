import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEE } from '../../context/SEEContext';
import { Card, Button, ProgressBar } from '../../components/common/UI';
import { 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { motion } from 'motion/react';

export default function LeadershipHome() {
  const { state } = useSEE();
  const navigate = useNavigate();

  const activePlans = state.plans.filter(p => p.status === 'Active');
  const totalBudget = state.projects.reduce((acc, curr) => acc + curr.budget.allocated, 0);
  const totalSpent = state.projects.reduce((acc, curr) => acc + curr.budget.spent, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Executive Command</h1>
          <p className="text-slate-500 text-sm font-medium">Welcome back, Sarah. Here is your strategic update.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/leadership/roi')}>
            <TrendingUp size={18} className="mr-2" />
            View ROI Analysis
          </Button>
          <Button onClick={() => navigate('/leadership/ideate')}>
            <Plus size={18} className="mr-2" />
            New Strategy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats & Active Plans */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl">
              <p className="text-[10px] font-black uppercase text-blue-100 tracking-widest mb-1">Portfolio Health</p>
              <h2 className="text-4xl font-black mb-4">94%</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-100">
                <CheckCircle2 size={16} />
                <span>7 Active Plans On Track</span>
              </div>
            </Card>
            <Card className="bg-white border-2 border-blue-50">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Aggregated Budget Burn</p>
              <h2 className="text-4xl font-black text-[#1F3864] mb-2">{Math.round((totalSpent / totalBudget) * 100)}%</h2>
              <ProgressBar value={totalSpent} target={totalBudget} unit="$" />
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[#1F3864] uppercase text-xs tracking-widest">Priority Strategies</h3>
              <button 
                onClick={() => navigate('/leadership/plans')}
                className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
              >
                View Library <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="grid gap-4">
              {activePlans.slice(0, 3).map((plan) => (
                <Card 
                  key={plan.id}
                  className="hover:border-blue-200 cursor-pointer transition-all border-l-4 border-l-blue-600"
                  onClick={() => navigate(`/plans/${plan.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1F3864] text-sm">{plan.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{plan.smartGoal.specific}</p>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                         <div className="text-xs font-black text-[#1F3864]">{plan.linkedProjectIds.length}</div>
                         <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Projects</div>
                       </div>
                       <ChevronRight className="text-slate-300" size={18} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Risks & Notifications */}
        <div className="space-y-8">
          <Card title="Critical Risks" subtitle="Action Required">
             <div className="space-y-4 pt-2">
                <div className="flex gap-3 p-3 bg-rose-50 rounded-2xl border border-rose-100">
                  <ShieldAlert className="text-rose-600 flex-shrink-0" size={20} />
                  <div>
                    <h5 className="text-xs font-bold text-rose-900 leading-tight">Regulatory Compliance Delay</h5>
                    <p className="text-[10px] text-rose-700 mt-1">Beneficiary vetting logic pending legal review for Q4 rollout.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-100">
                  <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                  <div>
                    <h5 className="text-xs font-bold text-amber-900 leading-tight">Budget Threshold Exceeded</h5>
                    <p className="text-[10px] text-amber-700 mt-1">Project PROJ-002 reached 90% allocation with 2 milestones remaining.</p>
                  </div>
                </div>
             </div>
          </Card>

          <Card title="Executive Feed" subtitle="Recent Activity">
            <div className="space-y-6 pt-2">
              <div className="flex gap-3 relative">
                <div className="w-px h-full bg-slate-100 absolute left-4 top-8"></div>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 z-10 border border-white">
                  <Plus size={14} />
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-700">James Okafor <span className="font-medium text-slate-400">instantiated</span></p>
                   <p className="text-[10px] text-blue-600 font-bold">PROJ-004: HR Portal Rebuild</p>
                   <p className="text-[9px] text-slate-400 mt-0.5">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3 relative">
                 <div className="w-px h-full bg-slate-100 absolute left-4 top-8"></div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 z-10 border border-white">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-700">Monica Tran <span className="font-medium text-slate-400">completed</span></p>
                   <p className="text-[10px] text-emerald-600 font-bold">PROJ-003: RPA Claims Bot</p>
                   <p className="text-[9px] text-slate-400 mt-0.5">Yesterday</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 z-10 border border-white">
                  <Clock size={14} />
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-700">Priya Nair <span className="font-medium text-slate-400">updated metric</span></p>
                   <p className="text-[10px] text-amber-600 font-bold">Model Accuracy → 89.4%</p>
                   <p className="text-[9px] text-slate-400 mt-0.5">Yesterday</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
