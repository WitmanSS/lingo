import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import api from '@/lib/api';
import { Trophy } from 'lucide-react';
import { toast } from 'sonner';

export default function LeaderboardsPage() {
  const [weekly, setWeekly] = useState<any[]>([]);
  const [allTime, setAllTime] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboards() {
      setLoading(true);
      try {
        const [weekRes, allTimeRes] = await Promise.all([
          api.get('/leaderboards/weekly'),
          api.get('/leaderboards/alltime')
        ]);
        setWeekly(weekRes.data);
        setAllTime(allTimeRes.data);
      } catch (err) {
        toast.error('Failed to fetch leaderboards');
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboards();
  }, []);

  const renderTable = (data: any[], metricLabel: string) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="text-right">{metricLabel}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Loading leaderboard...</TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No data available yet.</TableCell>
            </TableRow>
          ) : data.map((entry) => (
            <TableRow key={entry.user.id}>
              <TableCell className="font-bold">
                 {entry.rank === 1 ? <Trophy className="w-5 h-5 text-yellow-500" /> : 
                  entry.rank === 2 ? <Trophy className="w-5 h-5 text-gray-400" /> : 
                  entry.rank === 3 ? <Trophy className="w-5 h-5 text-amber-600" /> : 
                  `#${entry.rank}`}
              </TableCell>
              <TableCell className="flex items-center gap-3 font-medium">
                 <Avatar className="h-8 w-8">
                   <AvatarImage src={entry.user.avatarUrl} />
                   <AvatarFallback>{entry.user.username[0].toUpperCase()}</AvatarFallback>
                 </Avatar>
                 {entry.user.username}
              </TableCell>
              <TableCell>
                 <Badge variant="outline">Lvl {entry.user.level}</Badge>
              </TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">
                 {entry.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Platform Leaderboards</h1>
      <Card>
        <CardHeader>
           <CardTitle>Top Rankings</CardTitle>
           <CardDescription>View top users based on reading activity and gamification XP.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Weekly Readers</TabsTrigger>
              <TabsTrigger value="alltime">All-Time XP Leaders</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly">
               {renderTable(weekly, 'Stories Read (This Week)')}
            </TabsContent>
            <TabsContent value="alltime">
               {renderTable(allTime, 'Total XP')}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
