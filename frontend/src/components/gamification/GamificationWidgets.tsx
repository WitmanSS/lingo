
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface LevelBadgeProps {
  level: number;
  xp: number;
  className?: string;
}

export function LevelBadge({ level, xp, className }: LevelBadgeProps) {
  const getVariantTones = (lvl: number) => {
    if (lvl >= 10) return "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent animate-pulse shadow-lg shadow-purple-500/50";
    if (lvl >= 9) return "bg-gradient-to-r from-amber-200 to-yellow-500 text-yellow-900 border-yellow-400 shadow-md";
    if (lvl >= 7) return "bg-amber-100 text-amber-800 border-amber-400 shadow-sm";
    if (lvl >= 5) return "bg-purple-100 text-purple-800 border-purple-300";
    if (lvl >= 3) return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-emerald-50 text-emerald-800 border-emerald-200";
  };

  return (
    <div className={`flex flex-col gap-1 items-center ${className}`}>
       <Badge variant="outline" className={`px-2 py-1 font-bold ${getVariantTones(level)}`}>
         Lvl {level}
       </Badge>
       {xp > 0 && <span className="text-[10px] text-muted-foreground font-mono">{xp} XP</span>}
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
