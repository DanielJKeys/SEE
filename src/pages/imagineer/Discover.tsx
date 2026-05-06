import React, { useState } from 'react';
import { useSEE } from '../../context/SEEContext';
import { Card, Button } from '../../components/common/UI';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Code, 
  Cpu, 
  Database, 
  ShieldCheck,
  FolderOpen
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Discover() {
  const { state } = useSEE();
  const [filter, setFilter] = useState('All');

  const tags = ['All', 'AI/ML', 'Infrastructure', 'Mobile', 'Automation', 'Legacy'];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1F3864] tracking-tight">Solution Marketplace</h1>
          <p className="text-slate-500 text-sm font-medium">Discover and repurpose cross-functional modules across the enterprise network.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search documentation, tech stacks, or project tags..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-3 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold mr-2">
           <Filter size={14} /> FILTER
        </div>
        {tags.map(tag => (
          <button 
            key={tag}
            onClick={() => setFilter(tag)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
              filter === tag 
                ? "bg-[#1F3864] text-white shadow-lg" 
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.projects.map((proj, i) => (
          <Card 
            key={proj.id} 
            className="hover:shadow-xl transition-all border-b-4 border-b-blue-600/10 group cursor-pointer"
          >
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className={cn(
                     "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                   )}>
                      {i % 3 === 0 ? <Cpu size={24} /> : i % 3 === 1 ? <Code size={24} /> : <Database size={24} />}
                   </div>
                   <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">
                     {proj.status}
                   </span>
                </div>

                <div>
                   <h3 className="font-bold text-[#1F3864] line-clamp-1">{proj.title}</h3>
                   <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">Owning Team: {proj.manager}</p>
                </div>

                <div className="space-y-2">
                   <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                     This project provides a hardened {proj.title.toLowerCase()} for enterprise integration. Built using standard React and Node.js.
                   </p>
                   <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-500 text-[9px] font-black rounded uppercase">React</span>
                      <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-500 text-[9px] font-black rounded uppercase">TypeScript</span>
                      <span className="px-1.5 py-0.5 bg-slate-50 text-slate-500 text-[9px] font-black rounded uppercase">Jira Linked</span>
                   </div>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold">
                      <FolderOpen size={14} />
                      <span>View Asset Hub</span>
                   </div>
                   <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
             </div>
          </Card>
        ))}
      </div>

      <div className="bg-[#1F3864] rounded-3xl p-12 text-white flex flex-col md:flex-row items-center gap-12 mt-12 overflow-hidden relative">
         <div className="flex-1 space-y-6 relative z-10">
            <h2 className="text-4xl font-black tracking-tight leading-none">Don't reinvent the wheel.</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Our AI engines automatically index every project milestone and metric point. 
              Search for existing solutions before starting any new development work.
            </p>
            <div className="flex gap-4">
               <Button variant="secondary" size="lg">Submit New Asset</Button>
               <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">Browse Documentation</Button>
            </div>
         </div>
         <div className="hidden md:block absolute -right-20 -top-20 opacity-10">
            <ShieldCheck size={400} />
         </div>
      </div>
    </div>
  );
}
