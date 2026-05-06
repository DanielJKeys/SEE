import React, { useState } from 'react';
import { useSEE } from '../../context/SEEContext';
import { Card, Button, ProgressBar } from '../../components/common/UI';
import { 
  TrendingUp, 
  Link as LinkIcon, 
  RefreshCw, 
  Database, 
  Github, 
  Code
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CoupleMetrics() {
  const { state, dispatch } = useSEE();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Notional: Get metrics for project 001
  const metrics = state.projects.flatMap(p => p.metrics.map(m => ({ ...m, projectId: p.id })));

  const handleUpdate = (projectId: string, metric: any, newValue: number) => {
    setUpdatingId(metric.id);
    setTimeout(() => {
      dispatch({
        type: 'UPDATE_METRIC',
        payload: { 
          projectId, 
          metric: { ...metric, currentValue: newValue, lastUpdated: new Date().toISOString().split('T')[0] } 
        }
      });
      setUpdatingId(null);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Metric Coupling</h1>
        <p className="text-slate-500 text-sm font-medium">Link project indicators to notional data sources for real-time strategic alignment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {metrics.map((metric) => (
          <Card 
            key={metric.id}
            title={metric.name}
            subtitle={`Linked to KPI: ${metric.linkedKpiId}`}
            actions={
              <button className="text-blue-600 hover:rotate-180 transition-all duration-500">
                <RefreshCw size={16} />
              </button>
            }
          >
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Current Impact</span>
                     <div className="text-3xl font-black text-[#1F3864]">{metric.currentValue}{metric.unit === 'percent' ? '%' : ''}</div>
                  </div>
                  <div className="text-right space-y-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Target</span>
                     <div className="text-xl font-black text-slate-400">{metric.targetValue}{metric.unit === 'percent' ? '%' : ''}</div>
                  </div>
               </div>

               <ProgressBar value={metric.currentValue} target={metric.targetValue} unit={metric.unit === 'percent' ? '%' : ''} />

               <div className="pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Simulation Input</span>
                  <div className="flex gap-2">
                     <input 
                        type="number" 
                        defaultValue={metric.currentValue}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        id={`input-${metric.id}`}
                     />
                     <Button 
                        size="sm" 
                        isLoading={updatingId === metric.id}
                        onClick={() => {
                          const val = (document.getElementById(`input-${metric.id}`) as HTMLInputElement).value;
                          handleUpdate(metric.projectId, metric, parseFloat(val));
                        }}
                     >
                        Sync Value
                     </Button>
                  </div>
               </div>

               <div className="pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <LinkIcon size={14} className="text-blue-500" />
                     <span className="text-[10px] font-bold text-slate-500 uppercase">Input Source</span>
                  </div>
                  <div className="flex gap-2">
                     <div className="p-1 px-2 bg-slate-100 rounded-lg flex items-center gap-1.5 text-[9px] font-black text-slate-600">
                        <Github size={12} />
                        GITHUB
                     </div>
                     <div className="p-1 px-2 border border-blue-200 rounded-lg flex items-center gap-1.5 text-[9px] font-black text-blue-600">
                        <Code size={12} />
                        INTERNAL API
                     </div>
                  </div>
               </div>
            </div>
          </Card>
        ))}

        <Card className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200">
           <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-2xl flex items-center justify-center mb-4">
              <LinkIcon size={32} />
           </div>
           <h3 className="font-bold text-[#1F3864]">New Data Coupling</h3>
           <p className="text-xs text-slate-400 mt-1 mb-6">Connect a target KPI to an internal system endpoint.</p>
           <Button variant="outline" size="sm">Configure Integration</Button>
        </Card>
      </div>
    </div>
  );
}
