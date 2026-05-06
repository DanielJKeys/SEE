import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Lightbulb, 
  Library, 
  TrendingUp, 
  Briefcase, 
  CheckSquare, 
  Search, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useSEE } from '../../context/SEEContext';
import { Role } from '../../types';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: Role[];
}

const navItems: NavItem[] = [
  // Leadership
  { label: 'Leadership Home', path: '/leadership', icon: LayoutDashboard, roles: ['Leadership'] },
  { label: 'Ideation Agent', path: '/leadership/ideate', icon: Lightbulb, roles: ['Leadership'] },
  { label: 'Plan Library', path: '/leadership/plans', icon: Library, roles: ['Leadership'] },
  { label: 'ROI Dashboard', path: '/leadership/roi', icon: TrendingUp, roles: ['Leadership'] },
  
  // Manager
  { label: 'Manager Home', path: '/manager', icon: LayoutDashboard, roles: ['Manager'] },
  { label: 'Progress Dashboard', path: '/dashboard/progress', icon: TrendingUp, roles: ['Manager', 'Leadership'] },
  
  // Imagineer
  { label: 'Imagineer Home', path: '/imagineer', icon: LayoutDashboard, roles: ['Imagineer'] },
  { label: 'My Tasks', path: '/imagineer/tasks', icon: CheckSquare, roles: ['Imagineer'] },
  { label: 'Couple Metrics', path: '/imagineer/metrics', icon: TrendingUp, roles: ['Imagineer'] },
  { label: 'Discover Solutions', path: '/imagineer/discover', icon: Search, roles: ['Imagineer'] },
];

export default function Sidebar() {
  const { state, dispatch } = useSEE();

  const filteredItems = navItems.filter(item => item.roles.includes(state.role as Role));

  return (
    <aside id="sidebar" className="fixed left-0 top-0 h-full w-64 bg-[#1F3864] text-white flex flex-col z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#1F3864]">S</div>
          SEE
        </h1>
        <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full w-fit">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">{state.role}</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group",
              isActive 
                ? "bg-white/15 text-white shadow-lg" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={cn("transition-transform", "group-hover:scale-110")} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <button
          onClick={() => dispatch({ type: 'SET_ROLE', payload: null })}
          className="flex items-center gap-3 w-full px-3 py-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
