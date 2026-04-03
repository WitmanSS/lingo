import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { CheckCircle2, XCircle, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function StoriesPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/stories/reports');
      setReports(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDismiss = async (id: string) => {
    try {
      await api.put(`/admin/stories/reports/${id}/dismiss`);
      toast.success('Report dismissed');
      fetchReports();
    } catch (err) {
      toast.error('Failed to dismiss report');
    }
  };

  const handleUnpublish = async (storyId: string) => {
    try {
      await api.put(`/admin/stories/${storyId}/publish`, { published: false });
      toast.success('Story unpublished');
    } catch (err) {
      toast.error('Failed to unpublish story');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Moderation & Reports</h1>
      
      <Card>
        <CardHeader>
           <CardTitle>Report Queue</CardTitle>
           <CardDescription>Review community reports for stories.</CardDescription>
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
                    <TableCell className="text-right space-x-2">
                       <Button variant="outline" size="sm" onClick={() => handleDismiss(report.id)}>
                         <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Dismiss
                       </Button>
                       <Button variant="destructive" size="sm" onClick={() => handleUnpublish(report.storyId)}>
                         <EyeOff className="w-4 h-4 mr-1" /> Unpublish
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
