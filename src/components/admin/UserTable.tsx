
import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  plan: string;
  status: string;
  created_at: string;
}

interface UserTableProps {
  data: User[];
  onRowClick: (user: User) => void;
  isLoading: boolean;
  pageCount: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSearch: (query: string) => void;
}

export function UserTable({
  data,
  onRowClick,
  isLoading,
  pageCount,
  pagination,
  setPagination,
  onSearch,
}: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return <div className="font-mono text-xs">{(row.getValue("id") as string).slice(0, 8)}...</div>;
      },
    },
    {
      accessorKey: "email",
      header: "メールアドレス",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "権限",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <Badge variant={role === "admin" ? "default" : "outline"} className={role === "admin" ? "bg-brand-pink" : ""}>
            {role === "admin" ? "管理者" : "ユーザー"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "ステータス",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant="outline" className={
            status === "active" ? "border-green-500 text-green-600" :
            status === "paused" ? "border-orange-500 text-orange-600" :
            "border-red-500 text-red-600"
          }>
            {status === "active" ? "有効" : status === "paused" ? "停止中" : "削除済み"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "登録日",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at") as string);
        return (
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(date, { addSuffix: true, locale: ja })}
          </div>
        );
      },
    },
  ];

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      onRowClick={onRowClick}
      isLoading={isLoading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      searchPlaceholder="メールまたは名前で検索..."
      searchColumn="email"
    />
  );
}
