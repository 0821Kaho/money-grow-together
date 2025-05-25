import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  Settings,
  MessageSquare,
  LogOut,
  BarChart3,
  Clock,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAdmin, isLoading } = useAdminGuard();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("ログアウトしました");
      navigate("/login");
    } catch (error) {
      toast.error("ログアウトに失敗しました");
      console.error("Logout error:", error);
    }
  };

  // Show loading while checking admin status
  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-white border-r">
          <div className="p-4 border-b">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="p-3">
            {Array(7).fill(null).map((_, i) => (
              <div key={i} className="mb-2">
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array(4).fill(null).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If not admin, this will have been handled by useAdminGuard (redirect)
  if (!isAdmin) {
    return null;
  }

  const navItems = [
    {
      label: "ダッシュボード",
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "ユーザー管理",
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "フィードバック",
      href: "/admin/feedback",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      label: "待機リスト",
      href: "/admin/waitlist",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      label: "分析",
      href: "/admin/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "学習モジュール",
      href: "/modules",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: "設定",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-white border-r transition-all duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div 
              className={`font-bold text-xl ${isCollapsed ? "opacity-0" : "opacity-100"} transition-opacity`}
              style={{ display: isCollapsed ? "none" : "block" }}
            >
              Pigipe Admin
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-500 hover:text-gray-800 absolute top-4 right-4"
            >
              {isCollapsed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`${
                        pathname === item.href
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-700 hover:bg-gray-100"
                      } flex items-center px-3 py-2 rounded-md transition-colors`}
                    >
                      <span>{item.icon}</span>
                      {!isCollapsed && (
                        <span className="ml-3 whitespace-nowrap transition-opacity">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="p-3 border-t">
            <Button
              variant="ghost"
              className="w-full flex items-center text-left"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">ログアウト</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
