
/**
 * User management data table component
 * Displays users with sorting, filtering and pagination
 */
import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronDown, Search } from 'lucide-react';
import type { User } from '@/types/database.types';

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
}

export function UserTable({
  data,
  onRowClick,
  isLoading,
  pageCount,
  pagination,
  setPagination,
}: UserTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Define columns
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="truncate w-20">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'メールアドレス',
      cell: ({ row }) => <div className="font-medium">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'full_name',
      header: '名前',
      cell: ({ row }) => <div>{row.getValue('full_name') || '-'}</div>,
    },
    {
      accessorKey: 'role',
      header: '権限',
      cell: ({ row }) => {
        const role = row.getValue('role') as string;
        return (
          <div className={role === 'admin' ? 'text-purple-600 font-medium' : ''}>
            {role === 'admin' ? '管理者' : 'ユーザー'}
          </div>
        );
      },
    },
    {
      accessorKey: 'plan',
      header: 'プラン',
      cell: ({ row }) => {
        const plan = row.getValue('plan') as string | null;
        return (
          <div className={plan === 'premium' ? 'text-amber-600 font-medium' : ''}>
            {plan === 'premium' ? 'プレミアム' : 'フリー'}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'ステータス',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <div className="inline-flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${
              status === 'active' ? 'bg-green-500' :
              status === 'paused' ? 'bg-amber-500' : 'bg-red-500'
            }`} />
            {status === 'active' ? '有効' :
             status === 'paused' ? '一時停止' : '削除済み'}
          </div>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: '登録日',
      cell: ({ row }) => {
        const date = new Date(row.getValue('created_at')).toLocaleDateString('ja-JP');
        return <div>{date}</div>;
      },
    },
  ];

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    pageCount,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-4 flex items-center justify-between gap-4 border-b">
        <div className="flex items-center relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="名前、メール、IDで検索..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            合計: {pageCount * pagination.pageSize} ユーザー
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "flex items-center gap-1 cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              header.column.getIsSorted() === "asc" ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton rows
              Array.from({ length: pagination.pageSize }, (_, i) => (
                <TableRow key={`loading-${i}`}>
                  {columns.map((col, j) => (
                    <TableCell key={`loading-cell-${i}-${j}`}>
                      <div className="h-4 bg-muted animate-pulse rounded"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  検索条件に一致するユーザーが見つかりませんでした
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow 
                  key={row.id} 
                  onClick={() => onRowClick(row.original)}
                  className="cursor-pointer hover:bg-muted/50"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onRowClick(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length > 0 && (
            <span>
              {pagination.pageIndex * pagination.pageSize + 1}-
              {Math.min((pagination.pageIndex + 1) * pagination.pageSize, pageCount * pagination.pageSize)} / 
              {pageCount * pagination.pageSize}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            前へ
          </Button>
          <div className="text-sm font-medium">
            {pagination.pageIndex + 1} / {pageCount}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            次へ
          </Button>
        </div>
      </div>
    </div>
  );
}
