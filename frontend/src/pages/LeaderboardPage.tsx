import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@/lib/api';
import { LevelBadge } from '@/components/gamification/GamificationWidgets';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LeaderboardPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('weekly');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const route = activeTab === 'alltime' ? '/leaderboards/alltime' : '/leaderboards/weekly';
        const res = await api.get(route);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [activeTab]);

  const top3 = data.slice(0, 3);
  const remainingList = data.slice(3);

  const renderPodiumEntry = (entry: any, position: 1 | 2 | 3) => {
    if (!entry) return <div className="w-1/3 flex flex-col items-center justify-end h-64 opacity-50" />;

    const isFirst = position === 1;
    const height = isFirst ? 'h-48' : position === 2 ? 'h-40' : 'h-32';
    const bgClass = isFirst ? 'bg-gradient-to-t from-yellow-100 to-yellow-50 border-yellow-200' 
                   : position === 2 ? 'bg-gradient-to-t from-gray-100 to-gray-50 border-gray-200' 
                   : 'bg-gradient-to-t from-amber-100 to-amber-50 border-amber-200';
    
    const icon = isFirst ? <Trophy className="w-10 h-10 text-yellow-500 mb-2 drop-shadow-md" /> 
                : position === 2 ? <Medal className="w-8 h-8 text-gray-400 mb-2" /> 
                : <Medal className="w-8 h-8 text-amber-600 mb-2" />;

    return (
      <div className={`w-1/3 flex flex-col items-center justify-end h-64 ${isFirst ? 'z-10 -mt-8' : ''}`}>
        <Avatar className={`border-4 ${isFirst ? 'border-yellow-400 w-24 h-24 shadow-xl shadow-yellow-500/20' : position === 2 ? 'border-gray-300 w-20 h-20 shadow-md' : 'border-amber-500 w-16 h-16 shadow-md'} mb-4 relative`}>
          <AvatarImage src={entry.user.avatarUrl} />
          <AvatarFallback className="text-xl font-bold bg-white text-slate-800">{entry.user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="text-center mb-4">
          <p className={`font-bold ${isFirst ? 'text-xl' : 'text-lg'}`}>{entry.user.username}</p>
          <div className="flex justify-center mt-1">
             <LevelBadge level={entry.user.level} xp={entry.score || 0} />
          </div>
        </div>

        <div className={`w-full rounded-t-xl border-t border-x border-b-0 shadow-inner flex flex-col items-center justify-start pt-4 relative overflow-hidden ${height} ${bgClass}`}>
          {isFirst && <div className="absolute inset-0 bg-yellow-400/10 animate-pulse" />}
          {icon}
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-slate-800 shadow-sm mt-2 relative z-10">
            {entry.score} {activeTab === 'alltime' ? 'XP' : 'Reads'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t('leaderboards.title', 'Hall of Fame')}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('leaderboards.desc', 'Discover our most dedicated readers and language masters. Climb the ranks by reading stories and maintaining your daily streak!')}
          </p>
        </div>

        <div className="flex justify-center mb-12">
           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
             <TabsList className="grid w-full grid-cols-2">
               <TabsTrigger value="weekly">Weekly Readers</TabsTrigger>
               <TabsTrigger value="alltime">Global XP Leaders</TabsTrigger>
             </TabsList>
           </Tabs>
        </div>

        {loading ? (
           <div className="space-y-8">
             <div className="flex items-end justify-center h-64 gap-2 mb-16">
               <Skeleton className="w-[30%] h-40 rounded-t-xl" />
               <Skeleton className="w-[30%] h-56 rounded-t-xl" />
               <Skeleton className="w-[30%] h-32 rounded-t-xl" />
             </div>
           </div>
        ) : data.length === 0 ? (
           <div className="text-center py-20 text-slate-500">
             <Star className="w-16 h-16 mx-auto mb-4 text-slate-300" />
             <p className="text-xl">The leaderboards are currently empty.</p>
             <p className="mt-2 text-sm">Read a story to become the first champion!</p>
           </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
             
             {/* PODIUM UI */}
             <div className="pt-16 px-6 sm:px-12 bg-slate-50 border-b border-slate-100">
               <div className="flex items-end justify-center w-full max-w-2xl mx-auto h-[320px]">
                 {renderPodiumEntry(top3[1], 2)}
                 {renderPodiumEntry(top3[0], 1)}
                 {renderPodiumEntry(top3[2], 3)}
               </div>
             </div>

             {/* LIST UI */}
             {remainingList.length > 0 && (
               <div className="p-0">
                 <table className="w-full text-left">
                   <thead className="bg-slate-50/50 text-slate-500 text-sm border-b">
                     <tr>
                       <th className="py-4 px-6 font-medium">Rank</th>
                       <th className="py-4 px-6 font-medium">Reader</th>
                       <th className="py-4 px-6 font-medium text-right">Score</th>
                     </tr>
                   </thead>
                   <tbody>
                     {remainingList.map((entry, idx) => (
                       <tr key={entry.user.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                         <td className="py-4 px-6">
                           <span className="font-bold text-slate-400 w-8 inline-block">{idx + 4}</span>
                         </td>
                         <td className="py-4 px-6">
                           <div className="flex items-center gap-4">
                             <Avatar className="w-10 h-10 shadow-sm border border-slate-200">
                               <AvatarImage src={entry.user.avatarUrl} />
                               <AvatarFallback>{entry.user.username[0].toUpperCase()}</AvatarFallback>
                             </Avatar>
                             <div>
                               <p className="font-bold text-slate-900">{entry.user.username}</p>
                               <div className="mt-0.5">
                                 <LevelBadge level={entry.user.level} xp={0} className="items-start" />
                               </div>
                             </div>
                           </div>
                         </td>
                         <td className="py-4 px-6 text-right">
                           <span className="inline-block bg-slate-100 text-slate-800 font-mono font-bold px-3 py-1 rounded-full text-sm">
                             {entry.score}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             )}
          </div>
        )}

      </div>
    </div>
  );
}
