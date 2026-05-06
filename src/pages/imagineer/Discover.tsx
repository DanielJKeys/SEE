import React, { useState } from 'react';
import { useSEE } from '../../context/SEEContext';
import { Card, Button, ProgressBar } from '../../components/common/UI';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Code, 
  Cpu, 
  Database, 
  ShieldCheck,
  FolderOpen,
  X,
  Activity,
  Target,
  Clock,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';

export default function Discover() {
  const { state } = useSEE();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const tags = ['All', 'AI/ML', 'Infrastructure', 'Mobile', 'Automation', 'Legacy'];

  const visibleProjects = state.projects.filter(proj => {
    const matchesTag = filter === 'All' || (proj.tags ?? []).includes(filter);
    const q = search.toLowerCase();
    const matchesSearch = !q || proj.title.toLowerCase().includes(q) || proj.manager.toLowerCase().includes(q);
    return matchesTag && matchesSearch;
  });

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
            value={search}
            onChange={e => setSearch(e.target.value)}
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
        {visibleProjects.length === 0 && (
          <div className="col-span-3 py-16 text-center text-slate-400 font-bold text-sm">
            No projects match your search.
          </div>
        )}
        {visibleProjects.map((proj, i) => (
          <Card 
            key={proj.id} 
            className="hover:shadow-xl transition-all border-b-4 border-b-blue-600/10 group cursor-pointer"
            onClick={() => setSelectedProject(proj)}
          >
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className={cn(
                     "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                   )}>
                      {i % 3 === 0 ? <Cpu size={24} /> : i % 3 === 1 ? <Code size={24} /> : <Database size={24} />}
                   </div>
                   <div className="flex gap-2">
                     <div className="flex flex-col items-end">
                       <span className="text-[10px] font-black text-blue-600 uppercase">99.9% Uptime</span>
                       <span className="text-[10px] font-black text-emerald-600 uppercase">94% Accuracy</span>
                     </div>
                   </div>
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
                      {(proj.tags ?? []).map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-blue-50 text-blue-500 text-[9px] font-black rounded uppercase">{tag}</span>
                      ))}
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

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="hidden md:block w-72 bg-slate-50 border-r border-slate-100 p-8 pt-20">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Reliability</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase">
                          <Activity size={14} className="text-emerald-500" /> Uptime
                        </div>
                        <span className="text-emerald-600 font-black text-xs">99.98%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase">
                          <Target size={14} className="text-blue-500" /> Accuracy
                        </div>
                        <span className="text-blue-600 font-black text-xs">94.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase">
                          <Clock size={14} className="text-amber-500" /> Latency
                        </div>
                        <span className="text-amber-600 font-black text-xs">42ms</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Infrastructure</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg group">AWS Cloud</span>
                      <span className="px-2 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg group">Kubernetes</span>
                      <span className="px-2 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg group">Docker</span>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Button variant="secondary" className="w-full justify-between group">
                      Clone Repo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Cpu size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-black text-[#1F3864] tracking-tight">{selectedProject.title}</h3>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded uppercase">Production Ready</span>
                      </div>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter italic">Maintained by {selectedProject.manager} Network Group</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-black text-[#1F3864] text-sm uppercase tracking-widest">Asset Documentation</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        This {selectedProject.title.toLowerCase()} module is designed for high-availability and extreme scalability. 
                        It has been stress-tested under 1.5M requests/second and maintains sub-50ms latency across global clusters.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(selectedProject.tags ?? []).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-[#1F3864] text-white text-[10px] font-bold rounded-lg">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-black text-[#1F3864] text-sm uppercase tracking-widest">Performance Metrics</h4>
                      <div className="space-y-4 pt-2">
                        <ProgressBar value={94} label="System Accuracy" unit="%" target={100} />
                        <ProgressBar value={99.9} label="SLA Compliance" unit="%" target={100} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-black text-[#1F3864] text-sm uppercase tracking-widest">Recent Activity</h4>
                      <span className="text-[10px] font-bold text-blue-600 underline cursor-pointer">View Change Log</span>
                    </div>
                    <div className="space-y-4">
                      {[
                        { event: "Version 2.4.0 deployed to US-EAST", time: "2 hours ago" },
                        { event: "Load balancer capacity increased by 20%", time: "1 day ago" },
                        { event: "Security patch (CVE-2026) applied", time: "3 days ago" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                          <span className="text-xs font-bold text-slate-600">{item.event}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
