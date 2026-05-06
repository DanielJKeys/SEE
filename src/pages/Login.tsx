import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEE } from '../context/SEEContext';
import { Role } from '../types';
import { ShieldCheck, UserCog, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const { dispatch } = useSEE();
  const navigate = useNavigate();

  const handleRoleSelect = (role: Role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
    const paths = {
      'Leadership': '/leadership',
      'Manager': '/manager',
      'Imagineer': '/imagineer'
    };
    navigate(paths[role]);
  };

  const roles: { type: Role; icon: React.ElementType; description: string; color: string }[] = [
    { 
      type: 'Leadership', 
      icon: ShieldCheck, 
      description: 'Generate, evaluate, and manage strategic plans through AI ideation.',
      color: 'bg-blue-600'
    },
    { 
      type: 'Manager', 
      icon: UserCog, 
      description: 'Translate strategic plans into structured projects and manage operational execution.',
      color: 'bg-indigo-600'
    },
    { 
      type: 'Imagineer', 
      icon: Code2, 
      description: 'Execute projects, track metrics, and discover organizational solutions.',
      color: 'bg-emerald-600'
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-8"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-[#1F3864] rounded-xl flex items-center justify-center text-white text-xl font-bold">S</div>
            <span className="font-bold text-[#1F3864] text-xl tracking-tight">SEE Platform</span>
          </div>
          <h1 className="text-5xl font-black text-[#1F3864] tracking-tight">
            Strategic Executive Engine
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Choose your role to enter the enterprise strategy platform. 
            Experience the synergy between AI-powered ideation and operational execution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {roles.map((role, i) => (
            <motion.button
              key={role.type}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleRoleSelect(role.type)}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:border-blue-400 transition-all group"
            >
              <div className={`${role.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <role.icon size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#1F3864]">{role.type}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                {role.description}
              </p>
              <div className="pt-4 flex items-center text-sm font-bold text-blue-600 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Enter Portal <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">→</div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="pt-12 text-slate-400 text-sm">
          <p>© 2026 Pathward Financial • Strategic Executive Engine v1.0 Prototype</p>
        </div>
      </motion.div>
    </div>
  );
}
