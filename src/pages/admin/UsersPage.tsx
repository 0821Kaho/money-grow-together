
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
import { DataTable } from '@/components/admin/DataTable';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

type User = {
  id: string;
  email: string;
  created_at: string;
  name?: string;
  role: 'admin' | 'user';
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
  
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="text-xs text-muted-foreground">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "email",
      header: "メールアドレス",
      cell: ({ row }) => <div className="font-medium">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "name",
      header: "名前",
      cell: ({ row }) => <div>{row.getValue("name") || "-"}</div>,
    },
    {
      accessorKey: "role",
      header: "権限",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <Badge
            variant={role === "admin" ? "default" : "outline"}
            className={
              role === "admin" ? "bg-brand-pink text-white" : "bg-transparent"
            }
          >
            {role === "admin" ? "管理者" : "一般ユーザー"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "登録日時",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at") as string);
        return (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(date, { addSuffix: true, locale: ja })}
          </div>
        );
      },
    }
  ];

  // Fetch users data from our admin API
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      
      // Transform the data to match our User type
      const formattedUsers = data.users.map(user => ({
        id: user.auth.users.id,
        email: user.auth.users.email,
        created_at: user.auth.users.created_at,
        name: user.profiles.name,
        role: user.profiles.role,
      }));
      
      setUsers(formattedUsers);
      setPageCount(Math.ceil(data.total / pagination.pageSize) || 1);
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

  const handlePaginationChange = (pageIndex: number, pageSize: number) => {
    setPagination({ pageIndex, pageSize });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">ユーザー管理</h1>
        <p className="text-muted-foreground">
          すべてのユーザー情報を表示、編集できます。行をクリックすると詳細を表示します。
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users}
        onRowClick={handleRowClick}
        isLoading={isLoading}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        searchPlaceholder="メールアドレスまたは名前で検索..."
        searchColumn="email"
      />
    </div>
  );
};

export default UsersPage;
