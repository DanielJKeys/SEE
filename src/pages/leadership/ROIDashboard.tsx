import React from 'react';
import { useSEE } from '../../context/SEEContext';
import { Card, ProgressBar } from '../../components/common/UI';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { TrendingUp, DollarSign, Target, PieChart as PieChartIcon, Zap } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../lib/utils';

export default function ROIDashboard() {
  const { state } = useSEE();

  // Notional calculations for ROI
  const totalInvestment = state.projects.reduce((acc, curr) => acc + curr.budget.spent, 0);
  const totalAllocated = state.projects.reduce((acc, curr) => acc + curr.budget.allocated, 0);
  const estimatedSavings = 2400000; // Notional derived from TDD
  const roiRatio = (estimatedSavings / (totalInvestment || 1)).toFixed(1);
  const paybackPeriod = 2.4; // Notional months

  const kpiSuccessData = [
    { name: 'Achieved', value: 3, color: '#10b981' },
    { name: 'On Track', value: 5, color: '#3b82f6' },
    { name: 'At Risk', value: 1, color: '#f59e0b' },
    { name: 'Delayed', value: 1, color: '#f43f5e' },
  ];

  const investmentData = state.plans.map(plan => ({
    name: plan.title.length > 20 ? plan.title.substring(0, 20) + '...' : plan.title,
    investment: state.projects
      .filter(p => p.parentPlanId === plan.id)
      .reduce((acc, curr) => acc + curr.budget.allocated, 0),
    spent: state.projects
      .filter(p => p.parentPlanId === plan.id)
      .reduce((acc, curr) => acc + curr.budget.spent, 0),
  }));

  const monthlySavingsData = [
    { month: 'Jan', savings: 0, cost: 40000 },
    { month: 'Feb', savings: 15000, cost: 80000 },
    { month: 'Mar', savings: 45000, cost: 120000 },
    { month: 'Apr', savings: 120000, cost: 142000 },
    { month: 'May', savings: 180000, cost: 160000 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">ROI Dashboard</h1>
        <p className="text-slate-500 text-sm font-medium">Aggregated strategic performance and value realization metrics.</p>
      </div>

      {/* Top Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-600">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Annual Savings</p>
              <h2 className="text-2xl font-black text-[#1F3864]">{formatCurrency(estimatedSavings)}</h2>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-emerald-500 font-bold text-xs">
            <TrendingUp size={14} />
            <span>+12.5% vs Last Quarter</span>
          </div>
        </Card>

        <Card className="border-l-4 border-l-indigo-600">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Project Investment</p>
              <h2 className="text-2xl font-black text-[#1F3864]">{formatCurrency(totalInvestment)}</h2>
            </div>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Zap size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs font-bold text-slate-500">
            {formatPercent((totalInvestment/totalAllocated)*100)} of total allocation spent
          </div>
        </Card>

        <Card className="border-l-4 border-l-emerald-600">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">ROI Ratio</p>
              <h2 className="text-2xl font-black text-[#1F3864]">{roiRatio}x</h2>
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs font-bold text-slate-500">
            For every $1 invested
          </div>
        </Card>

        <Card className="border-l-4 border-l-amber-600">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Payback Period</p>
              <h2 className="text-2xl font-black text-[#1F3864]">{paybackPeriod} Months</h2>
            </div>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Target size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs font-bold text-slate-500">
            Targeting full recovery by Q4
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Investment per Plan */}
        <Card title="Investment by Strategic Plan" subtitle="Allocated vs Actual Spent ($)">
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investmentData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" fontSize={10} tickFormatter={(v) => `$${v/1000}k`} />
                <YAxis type="category" dataKey="name" fontSize={10} width={100} />
                <Tooltip 
                   formatter={(v: any) => formatCurrency(v)} 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="investment" fill="#CBD5E1" radius={[0, 4, 4, 0]} barSize={20} name="Allocated" />
                <Bar dataKey="spent" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Value Realization */}
        <Card title="Value Realization Curve" subtitle="Monthly Savings vs Total Spend ($)">
           <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySavingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" fontSize={10} />
                <YAxis fontSize={10} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                   formatter={(v: any) => formatCurrency(v)} 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="savings" stroke="#10B981" fill="#10B981" fillOpacity={0.1} name="Savings" />
                <Area type="monotone" dataKey="cost" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.05} name="Investment Cost" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card title="KPI Achievement Status" subtitle="Portfolio Distribution" className="lg:col-span-1">
           <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={kpiSuccessData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {kpiSuccessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-[#1F3864]">10</span>
                <span className="text-[10px] font-black text-slate-400 uppercase">Total KPIs</span>
              </div>
           </div>
           <div className="space-y-2 pt-4">
             {kpiSuccessData.map((item, i) => (
               <div key={i} className="flex items-center justify-between text-xs font-bold">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                   <span className="text-slate-500">{item.name}</span>
                 </div>
                 <span className="text-[#1F3864]">{item.value}</span>
               </div>
             ))}
           </div>
         </Card>

         <Card title="KPI Progress Tracking" subtitle="Top Active Indicators" className="lg:col-span-2">
           <div className="space-y-6 pt-4">
             {(state.plans[0]?.kpis ?? []).map((kpi, i) => (
               <ProgressBar
                 key={kpi.id}
                 label={kpi.name}
                 value={kpi.current}
                 target={kpi.target}
                 unit={kpi.unit === 'percent' ? '%' : ''}
               />
             ))}
             <ProgressBar 
                 label="Automation Rate"
                 value={12}
                 target={40}
                 unit="%"
               />
           </div>
         </Card>
      </div>
    </div>
  );
}
