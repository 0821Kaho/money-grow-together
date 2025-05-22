
/**
 * Admin dashboard layout with sidebar navigation
 * Includes authentication checks and responsive design
 */
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MoonIcon, SunIcon, Users, BarChart3, Settings, Menu, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAdminGuard();
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  // Check if the current path matches exactly
  const isActive = (path: string) => location.pathname === path;
  
  // Loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-2">認証を確認中...</span>
      </div>
    );
  }
  
  // Only allow admin to access
  if (!isAdmin) {
    return null; // useAdminGuard will handle redirect
  }
  
  const toggleDarkMode = () => {
    // In a real app, this would toggle the theme in localStorage and update HTML class
    setIsDarkMode(!isDarkMode);
    // document.documentElement.classList.toggle('dark');
  };

  const navigation = [
    { name: 'ホーム', path: '/admin', icon: Home },
    { name: 'ユーザー管理', path: '/admin/users', icon: Users },
    { name: '分析', path: '/admin/analytics', icon: BarChart3 },
    { name: '設定', path: '/admin/settings', icon: Settings },
  ];
  
  // Mobile sidebar implementation using Sheet
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] p-0">
        <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
          <div className="p-4 border-b border-sidebar-border">
            <h2 className="text-xl font-bold">Pigipe 管理画面</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${
                    isActive(item.path)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex border-r">
          <SidebarHeader className="border-b pb-6">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                P
              </div>
              <span className="text-xl font-bold">Pigipe Admin</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.name}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background border-b h-14 flex items-center px-4">
            <div className="flex items-center gap-4">
              <MobileSidebar />
              <SidebarTrigger className="hidden md:flex" />
              <h1 className="text-xl font-semibold">管理者ダッシュボード</h1>
            </div>
            <div className="flex items-center ml-auto space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"}
              >
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </div>
          </header>
          
          {/* Page content */}
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
