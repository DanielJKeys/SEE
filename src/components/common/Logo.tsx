import React from 'react';
import { Aperture } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  size?: number;
}

export default function Logo({ className, iconClassName, size = 24 }: LogoProps) {
  return (
    <div className={cn(
      "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1F3864] to-blue-600 text-white shadow-sm ring-1 ring-white/20",
      className
    )}>
      <Aperture size={size} className={cn("text-white drop-shadow-sm", iconClassName)} />
    </div>
  );
}
