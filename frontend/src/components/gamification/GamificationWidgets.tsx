import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface LevelBadgeProps {
  level: number;
  xp: number;
  className?: string;
}

export function LevelBadge({ level, xp, className }: LevelBadgeProps) {
  // A simple function to generate a color tone based on level
  const getVariantTones = (lvl: number) => {
    if (lvl >= 10) return "bg-purple-100 text-purple-800 border-purple-300";
    if (lvl >= 7) return "bg-amber-100 text-amber-800 border-amber-300";
    if (lvl >= 4) return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-slate-100 text-slate-800 border-slate-300";
  };

  return (
    <div className={`flex flex-col gap-1 items-center ${className}`}>
       <Badge variant="outline" className={`px-2 py-1 font-bold shadow-sm ${getVariantTones(level)}`}>
         Lvl {level}
       </Badge>
       <span className="text-[10px] text-muted-foreground font-mono">{xp} XP</span>
    </div>
  );
}

interface XpProgressBarProps {
  currentXp: number;
  nextLevelXp: number;
}

export function XpProgressBar({ currentXp, nextLevelXp }: XpProgressBarProps) {
  const percentComplete = Math.min(100, Math.max(0, (currentXp / nextLevelXp) * 100));
  
  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-xs font-medium px-1">
        <span className="text-muted-foreground">{currentXp} XP</span>
        <span className="text-muted-foreground">{nextLevelXp} XP required</span>
      </div>
      <Progress value={percentComplete} className="h-2 w-full" />
    </div>
  );
}
