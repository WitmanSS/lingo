import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, ShieldAlert, BarChart3, Activity, ArrowLeft } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';

const ADMIN_LINKS = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Stories & Content', path: '/admin/stories', icon: BookOpen },
  { name: 'Moderation Queue', path: '/admin/moderation', icon: ShieldAlert },
  { name: 'Leaderboards', path: '/admin/leaderboards', icon: BarChart3 },
  { name: 'System Status', path: '/admin/system', icon: Activity },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-bold py-4 text-primary">LinguaRead Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ADMIN_LINKS.map((link) => {
                  const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
                  return (
                    <SidebarMenuItem key={link.path}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={link.name}>
                        <Link to={link.path} className="flex items-center gap-3 py-2 px-3">
                          <link.icon className="w-5 h-5" />
                          <span>{link.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-auto pb-4">
             <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/" className="flex items-center gap-3 py-2 px-3 text-muted-foreground hover:text-foreground">
                       <ArrowLeft className="w-5 h-5" />
                       <span>Back to App</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="bg-slate-50 w-full overflow-y-auto min-h-screen">
        <main className="flex-1 w-full p-8 max-w-[100vw] overflow-x-hidden">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
