import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { ShieldBan, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (userId: string) => {
    if (!confirm('Are you sure you want to block this user?')) return;
    try {
      await api.put(`/admin/users/${userId}/block`, { reason: 'Violated community guidelines' });
      toast.success('User blocked successfully');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to block user');
    }
  };

  const handleWarn = async (userId: string) => {
    const reason = prompt('Warning reason:');
    if (!reason) return;
    try {
      await api.put(`/admin/users/${userId}/warn`, { reason });
      toast.success('Warning issued');
    } catch (err) {
      toast.error('Failed to issue warning');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <Card>
        <CardHeader>
           <CardTitle>Platform Users</CardTitle>
           <CardDescription>View and moderate registered users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Level / XP</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading users...</TableCell>
                  </TableRow>
                ) : users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Lvl {user.level}</Badge> <span className="text-xs text-muted-foreground">{user.xp} XP</span>
                    </TableCell>
                    <TableCell>
                      {user.deletedAt ? (
                         <Badge variant="destructive">Blocked</Badge>
                      ) : (
                         <Badge className="bg-green-500">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button variant="outline" size="sm" onClick={() => handleWarn(user.id)} disabled={!!user.deletedAt}>
                         <AlertTriangle className="w-4 h-4 mr-1 text-yellow-500" /> Warn
                       </Button>
                       <Button variant="destructive" size="sm" onClick={() => handleBlock(user.id)} disabled={!!user.deletedAt}>
                         <ShieldBan className="w-4 h-4 mr-1" /> Block
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
