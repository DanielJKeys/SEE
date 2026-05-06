import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onClick?: any;
  key?: any;
  [key: string]: any;
}

export function Card({ children, className, title, subtitle, actions, ...props }: CardProps) {
  return (
    <div className={cn("bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden", className)} {...props}>
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="font-bold text-[#1F3864] tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: any;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className, 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all rounded-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#1F3864] text-white hover:bg-[#2c4d8a] shadow-lg shadow-blue-900/10",
    secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/10",
    outline: "border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-900/10"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}

interface ProgressBarProps {
  value: number;
  target?: number;
  label?: string;
  unit?: string;
  className?: string;
  key?: any;
}

export function ProgressBar({ 
  value, 
  target = 100, 
  label, 
  unit = '%',
  className,
  ...props
}: ProgressBarProps) {
  const progress = Math.min(Math.max((value / target) * 100, 0), 100);
  
  return (
    <div className={cn("space-y-1.5", className)} {...props}>
      {(label || unit) && (
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
          <span className="text-slate-500">{label}</span>
          <span className="text-[#1F3864]">{value}{unit} / {target}{unit}</span>
        </div>
      )}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            progress >= 100 ? "bg-emerald-500" : "bg-blue-500"
          )}
        />
      </div>
    </div>
  );
}
