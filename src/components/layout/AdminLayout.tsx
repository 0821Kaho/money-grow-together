
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/admin/AdminLayout";

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAdminGuard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // useAdminGuard handles the redirect
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
