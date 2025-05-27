
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAdminGuard();

  console.log('AdminLayout render:', { isAdmin, isLoading });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">管理者権限を確認中...</div>
      </div>
    );
  }

  if (!isAdmin) {
    console.log('AdminLayout: Not admin, useAdminGuard should handle redirect');
    return null; // useAdminGuard handles the redirect
  }

  console.log('AdminLayout: Rendering admin interface');

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <Sidebar>
          <SidebarContent>
            {/* Basic sidebar content - can be expanded later */}
            <div className="p-4">
              <h2 className="font-bold text-lg">Admin Panel</h2>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
