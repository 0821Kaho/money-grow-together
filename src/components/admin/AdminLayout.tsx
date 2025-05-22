
/**
 * Admin dashboard layout with sidebar navigation
 * Includes authentication checks and responsive design
 */
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
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
import { MoonIcon, SunIcon, Users, BarChart3, Settings, Menu, Home, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAdminGuard();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if the current path matches exactly
  const isActive = (path: string) => location.pathname === path;
  
  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('ログアウトしました');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('ログアウトに失敗しました');
    }
  };
  
  // Loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-brand-pink border-t-transparent rounded-full"></div>
          <span className="text-muted-foreground">認証を確認中...</span>
        </div>
      </div>
    );
  }
  
  // Only allow admin to access
  if (!isAdmin) {
    return null; // useAdminGuard will handle redirect
  }
  
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navigation = [
    { name: 'ダッシュボード', path: '/admin', icon: Home },
    { name: 'ユーザー管理', path: '/admin/users', icon: Users },
    { name: 'フィードバック', path: '/admin/feedback', icon: MessageSquare },
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
                      ? 'bg-brand-pink text-white'
                      : 'text-sidebar-foreground hover:bg-brand-light hover:text-brand-pink'
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
              <div className="h-8 w-8 rounded-full bg-brand-pink flex items-center justify-center text-white">
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
                    className={isActive(item.path) ? 'bg-brand-pink text-white' : ''}
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
              <div className="hidden md:flex items-center mr-4">
                <span className="text-sm text-muted-foreground mr-2">
                  {user?.email || ''}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                aria-label={theme === 'dark' ? "ライトモードに切り替え" : "ダークモードに切り替え"}
              >
                {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                aria-label="ログアウト"
              >
                <LogOut className="h-5 w-5" />
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
