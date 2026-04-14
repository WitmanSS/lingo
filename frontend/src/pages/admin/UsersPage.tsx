import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import api from '@/lib/api';
import { ShieldBan, ShieldAlert, AlertTriangle, UserSearch, History, FileText } from 'lucide-react';
import { toast } from 'sonner';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Drawer state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/users?q=${search}`);
      setUsers(res.data || []);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const loadUserDetails = async (id: string) => {
    setSelectedUserId(id);
    try {
      const res = await api.get(`/admin/users/${id}/details`);
      setUserDetails(res.data);
    } catch (err) {
      toast.error('Failed to load user details');
    }
  };

  const handleBlock = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to block this user?')) return;
    try {
      await api.put(`/admin/users/${userId}/block`, { reason: 'Violated community guidelines' });
      toast.success('User blocked successfully');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to block user');
    }
  };

  const handleWarn = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const reason = prompt('Warning reason:');
    if (!reason) return;
    try {
      await api.put(`/admin/users/${userId}/warn`, { reason });
      toast.success('Warning issued');
    } catch (err) {
      toast.error('Failed to issue warning');
    }
  };

  const columns = useMemo<ColumnDef<any>[]>(() => [
    { accessorKey: 'username', header: 'Username', cell: info => <span className="font-medium">{info.getValue() as string}</span> },
    { accessorKey: 'email', header: 'Email' },
    { 
      accessorKey: 'level', 
      header: 'Gamification',
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
            <Badge variant="secondary">Lvl {row.original.level}</Badge>
            <span className="text-xs text-muted-foreground">{row.original.xp} XP</span>
        </div>
      )
    },
    {
      accessorKey: 'deletedAt',
      header: 'Status',
      cell: ({ row }) => row.original.deletedAt ? 
        <Badge variant="destructive">Blocked</Badge> : 
        <Badge className="bg-green-500">Active</Badge>
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
         <div className="flex justify-end gap-2">
           <Button variant="outline" size="sm" onClick={(e) => handleWarn(row.original.id, e)} disabled={!!row.original.deletedAt}>
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
           </Button>
           <Button variant="destructive" size="sm" onClick={(e) => handleBlock(row.original.id, e)} disabled={!!row.original.deletedAt}>
              <ShieldBan className="w-4 h-4" />
           </Button>
         </div>
      )
    }
  ], []);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportCSV = () => {
    const headers = ['Username', 'Email', 'Level', 'XP', 'Status'];
    const csvContent = [
      headers.join(','),
      ...users.map(u => [u.username, u.email, u.level, u.xp, u.deletedAt ? 'Blocked' : 'Active'].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `linguaread_users_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-3xl font-bold">User Management</h1>
         <Button onClick={exportCSV} variant="outline"><FileText className="w-4 h-4 mr-2" /> Export CSV</Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
           <div>
              <CardTitle>Platform Users</CardTitle>
              <CardDescription>View and moderate registered users.</CardDescription>
           </div>
           <div className="w-72 relative">
              <UserSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
           </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
             {loading && users.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">Loading users...</div>
             ) : (
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b">
                    {table.getHeaderGroups().map(hg => (
                      <tr key={hg.id}>
                        {hg.headers.map(header => (
                          <th key={header.id} className="h-12 px-4 align-middle font-medium text-slate-500 whitespace-nowrap">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="border-b transition-colors hover:bg-slate-50/50 cursor-pointer" onClick={() => loadUserDetails(row.original.id)}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="p-4 align-middle">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
             )}
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
             <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
             <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
          </div>
        </CardContent>
      </Card>

      {/* User Detail Drawer (Timeline) */}
      <Sheet open={!!selectedUserId} onOpenChange={(open) => !open && setSelectedUserId(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>User Details Timeline</SheetTitle>
            <SheetDescription>Comprehensive activity logs and moderation history.</SheetDescription>
          </SheetHeader>
          
          {!userDetails ? (
             <div className="py-8 text-center text-muted-foreground">Loading timeline...</div>
          ) : (
             <div className="mt-8 space-y-8">
               {/* Quick Stats */}
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-xl border">
                   <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Stories</p>
                   <p className="text-2xl font-bold">{userDetails.stories.length}</p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border">
                   <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Warnings</p>
                   <p className="text-2xl font-bold text-yellow-600">{userDetails.warnings?.length || 0}</p>
                 </div>
               </div>

               {/* Timeline */}
               <div>
                 <h4 className="flex items-center gap-2 font-bold mb-4 border-b pb-2"><History className="w-4 h-4" /> Activity Timeline</h4>
                 <div className="space-y-4">
                    {/* Map recent XP actions */}
                    {userDetails.xpLogs?.map((log: any) => (
                      <div key={log.id} className="flex gap-4 items-start">
                         <div className="mt-1 w-2 h-2 rounded-full bg-blue-500" />
                         <div>
                            <p className="text-sm font-medium">{log.reason.replace('_', ' ')} <span className="text-green-600 font-bold">+{log.amount} XP</span></p>
                            <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</p>
                         </div>
                      </div>
                    ))}
                    {userDetails.xpLogs?.length === 0 && <p className="text-sm text-muted-foreground">No recent gamification activity.</p>}
                 </div>
               </div>

               {/* Moderation History */}
               {userDetails.warnings?.length > 0 && (
                 <div>
                   <h4 className="flex items-center gap-2 font-bold mb-4 text-red-600 border-b pb-2"><AlertTriangle className="w-4 h-4" /> Moderation Strikes</h4>
                   <div className="space-y-3">
                      {userDetails.warnings.map((warn: any) => (
                        <div key={warn.id} className="bg-yellow-50 text-yellow-800 p-3 rounded border border-yellow-200 text-sm">
                           <p className="font-bold">System Warning</p>
                           <p>"{warn.reason}"</p>
                           <p className="text-xs mt-1 opacity-70">{new Date(warn.createdAt).toLocaleDateString()}</p>
                        </div>
                      ))}
                   </div>
                 </div>
               )}

               {/* Admin Actions */}
               <div className="pt-6 border-t mt-8 flex flex-col gap-3">
                  <h4 className="font-bold flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-red-600" /> Administrative Actions</h4>
                  <p className="text-sm text-muted-foreground mb-2">Actions taken here will be permanently logged.</p>
                  <div className="flex gap-4">
                     <Button 
                       variant="outline" 
                       className="w-full text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                       onClick={async () => {
                         const reason = prompt('Enter completely descriptive warning reason:');
                         if (reason) {
                            try {
                               await api.put(`/admin/users/${selectedUserId}/warn`, { reason });
                               toast.success('Warning issued successfully.');
                               loadUserDetails(selectedUserId!);
                            } catch(e) { toast.error('Failed to issue warning'); }
                         }
                       }}
                     >
                        Issue Warning
                     </Button>
                     <Button 
                       variant="destructive" 
                       className="w-full"
                       onClick={async () => {
                         const reason = prompt('CONFIRM BLOCK: Enter ban reason:');
                         if (reason) {
                            try {
                               await api.put(`/admin/users/${selectedUserId}/block`, { reason });
                               toast.success('User has been blocked from the platform.');
                               setSelectedUserId(null);
                               fetchUsers();
                            } catch(e) { toast.error('Failed to block user'); }
                         }
                       }}
                     >
                        Block Account
                     </Button>
                  </div>
               </div>

             </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
