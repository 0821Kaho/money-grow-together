
/**
 * Admin Users Management Page
 * 
 * Features:
 * - List all users with pagination and filtering
 * - Edit user role and status
 * - Role-based access control
 * 
 * Uses:
 * - shadcn/ui components
 * - TanStack Table for data display
 * - Supabase for data storage
 */
import React, { useState, useEffect } from 'react';
import { UserTable } from '@/components/admin/UserTable';
import { UserDrawer } from '@/components/admin/UserDrawer';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { listUsers } from '@/data/users';
import { toast } from 'sonner';
import type { User } from '@/types/database.types';

const UsersPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  // Fetch users data
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { users: fetchedUsers, total } = await listUsers(
        pagination.pageIndex + 1,
        pagination.pageSize
      );
      setUsers(fetchedUsers);
      setPageCount(Math.ceil(total / pagination.pageSize) || 1);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('ユーザー情報の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users when pagination changes
  useEffect(() => {
    fetchUsers();
  }, [pagination.pageIndex, pagination.pageSize]);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdated = () => {
    // Refresh data after user updated
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">ユーザー管理</h1>
        <p className="text-muted-foreground">
          すべてのユーザー情報を表示、編集できます。行をクリックすると詳細を表示します。
        </p>
      </div>

      <UserTable
        data={users}
        onRowClick={handleRowClick}
        isLoading={isLoading}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />

      <UserDrawer
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
};

export default UsersPage;
