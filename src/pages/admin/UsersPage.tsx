
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
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserTable } from '@/components/admin/UserTable';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { toast } from 'sonner';
import { listUsers } from '@/data/users';

type User = {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  plan: string;
  status: string;
  created_at: string;
};

const UsersPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  
  // Fetch users data from Supabase
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Use the listUsers function from our data layer
      const { users: fetchedUsers, total } = await listUsers(
        pagination.pageIndex + 1,
        pagination.pageSize,
        ''
      );

      console.log("Fetched users:", fetchedUsers);
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
    navigate(`/admin/users/${user.id}`);
  };

  // Updated to match the expected function signature
  const handlePaginationChange = (paginationValue: { pageIndex: number, pageSize: number }) => {
    setPagination(paginationValue);
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
        setPagination={handlePaginationChange}
      />
    </div>
  );
};

export default UsersPage;
