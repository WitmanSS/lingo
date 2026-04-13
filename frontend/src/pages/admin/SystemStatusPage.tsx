import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Server, ServerCrash, Clock, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

export default function SystemStatusPage() {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const res = await api.get('/health');
      setHealthData(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch system health:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading && !healthData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">System Monitor</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const { details, error, status } = healthData || {};
  const isHealthy = status === 'ok';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
             System Monitor 
             {isHealthy ? <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium shadow-sm animate-pulse">Online</span> 
                        : <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium shadow-sm flex items-center gap-1"><ServerCrash className="w-4 h-4" /> Degraded</span>}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time infrastructure and service metrics. Last ping: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <button onClick={fetchHealth} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-medium rounded-md transition-colors">
           Refresh Ping
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        
        {/* Memory Service (Node.js Heap) */}
        <Card className={details?.memory?.status === 'down' ? 'border-red-500 bg-red-50' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heap Memory V8</CardTitle>
            <Server className={`h-5 w-5 ${details?.memory?.status === 'down' ? 'text-red-500' : 'text-blue-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
               {details?.memory?.heapUsedMB} <span className="text-lg text-muted-foreground">MB</span>
            </div>
            <Progress value={(details?.memory?.heapUsedMB / 512) * 100} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">Total RSS allocated: {details?.memory?.rssUsedMB} MB</p>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card className={details?.database?.status === 'down' ? 'border-red-500 bg-red-50' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PostgreSQL Database</CardTitle>
            <Database className={`h-5 w-5 ${details?.database?.status === 'down' ? 'text-red-500' : 'text-purple-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
               <div className={`w-3 h-3 rounded-full ${details?.database?.status === 'up' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
               <span className="text-2xl font-bold capitalize">{details?.database?.status || 'Unknown'}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Prisma Service Connection Check</p>
          </CardContent>
        </Card>

        {/* Uptime Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Uptime</CardTitle>
            <Clock className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
               {(details?.uptime?.uptimeSeconds / 3600).toFixed(1)} <span className="text-lg text-muted-foreground">hrs</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Continuous operation since last build ({details?.uptime?.uptimeSeconds} secs)</p>
          </CardContent>
        </Card>

      </div>

      {error && Object.keys(error).length > 0 && (
         <Card className="border-red-300 bg-red-50 mt-8">
           <CardHeader>
             <CardTitle className="text-red-800 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Active Incidents</CardTitle>
           </CardHeader>
           <CardContent>
              <pre className="text-sm text-red-700 bg-white/50 p-4 rounded-md overflow-auto border border-red-200">
                 {JSON.stringify(error, null, 2)}
              </pre>
           </CardContent>
         </Card>
      )}
    </div>
  );
}
