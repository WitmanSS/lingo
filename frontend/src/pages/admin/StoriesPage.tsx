import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from '@/lib/api';
import { CheckCircle2, EyeOff, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export default function StoriesPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reportsRes, storiesRes] = await Promise.all([
         api.get('/admin/stories/reports'),
         api.get(`/admin/stories?q=${search}&take=30`)
      ]);
      setReports(reportsRes.data || []);
      setStories(storiesRes.data || []);
    } catch (err) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleDismiss = async (id: string) => {
    try {
      await api.put(`/admin/stories/reports/${id}/dismiss`);
      toast.success('Report dismissed');
      fetchData();
    } catch (err) {
      toast.error('Failed to dismiss report');
    }
  };

  const handlePublishToggle = async (storyId: string, currentStatus: boolean) => {
    try {
      await api.put(`/admin/stories/${storyId}/publish`, { published: !currentStatus });
      toast.success(!currentStatus ? 'Story approved and published!' : 'Story unpublished');
      fetchData();
    } catch (err) {
      toast.error('Failed to update story status');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Library & Moderation</h1>

      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="stories">All Stories</TabsTrigger>
          <TabsTrigger value="moderation">Moderation Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="mt-6">
          <Card>
            <CardHeader>
               <CardTitle>Platform Stories</CardTitle>
               <CardDescription>View and manage all stories across the reading platform.</CardDescription>
               <div className="relative mt-4 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search stories by title..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
               </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                    ) : stories.length === 0 ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-8">No stories found.</TableCell></TableRow>
                    ) : stories.map(story => (
                      <TableRow key={story.id}>
                         <TableCell className="font-medium">{story.title}</TableCell>
                         <TableCell>{story.author?.username}</TableCell>
                         <TableCell><Badge variant="secondary">{story.language?.code?.toUpperCase() || 'EN'}</Badge></TableCell>
                         <TableCell>
                            {story.published 
                               ? <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge> 
                               : <Badge variant="destructive">Unpublished / Flagged</Badge>}
                         </TableCell>
                         <TableCell className="text-right space-x-2">
                            <Button 
                               variant={story.published ? "destructive" : "default"} 
                               size="sm" 
                               onClick={() => handlePublishToggle(story.id, story.published)}>
                               {story.published ? 'Revoke' : 'Approve'}
                            </Button>
                         </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="mt-6">
          <Card>
            <CardHeader>
               <CardTitle>Report Queue</CardTitle>
               <CardDescription>Review community reports and flagged items.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Story Title</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading reports...</TableCell>
                      </TableRow>
                    ) : reports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No pending reports! 🎉</TableCell>
                      </TableRow>
                    ) : reports.map(report => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.story.title}</TableCell>
                        <TableCell>{report.reporter.username}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.reason}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                           {new Date(report.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex items-center justify-end gap-2">
                           <Button variant="outline" size="sm" onClick={() => handleDismiss(report.id)}>
                             <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Dismiss
                           </Button>
                           <Button variant="destructive" size="sm" onClick={() => handlePublishToggle(report.storyId, true)}>
                             <EyeOff className="w-4 h-4 mr-1" /> Remove
                           </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
