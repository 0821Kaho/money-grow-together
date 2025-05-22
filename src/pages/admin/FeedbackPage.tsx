
import React, { useState, useEffect } from 'react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { DataTable } from '@/components/admin/DataTable';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Updated type definition to match Supabase schema
type Feedback = {
  id: number; // Changed from string to number to match the Supabase schema
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

const FeedbackPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const columns: ColumnDef<Feedback>[] = [
    {
      accessorKey: "user_id",
      header: "ユーザーID",
      cell: ({ row }) => <div className="truncate w-32">{row.getValue("user_id")}</div>,
    },
    {
      accessorKey: "message",
      header: "メッセージ",
      cell: ({ row }) => <div className="truncate max-w-md">{row.getValue("message")}</div>,
    },
    {
      accessorKey: "is_read",
      header: "状態",
      cell: ({ row }) => {
        const read = row.getValue("is_read") as boolean;
        return (
          <Badge
            variant={read ? "outline" : "default"}
            className={
              read ? "bg-transparent" : "bg-brand-pink text-white"
            }
          >
            {read ? "既読" : "未読"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "受信日時",
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

  // Fetch feedback data from Supabase
  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const offset = pagination.pageIndex * pagination.pageSize;
      
      let query = supabase
        .from('feedback')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      
      // Filter by read status if requested
      if (unreadOnly) {
        query = query.eq('is_read', false);
      }
      
      const { data, error, count } = await query
        .range(offset, offset + pagination.pageSize - 1);
      
      if (error) throw error;
      
      setFeedback(data || []);
      setPageCount(Math.ceil((count || 0) / pagination.pageSize) || 1);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error('フィードバックの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch feedback when pagination or unreadOnly changes
  useEffect(() => {
    fetchFeedback();
  }, [pagination.pageIndex, pagination.pageSize, unreadOnly]);

  const handleRowClick = async (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsDialogOpen(true);
    
    // If feedback is unread, mark it as read
    if (!feedback.is_read) {
      try {
        const { error } = await supabase
          .from('feedback')
          .update({ is_read: true })
          .eq('id', feedback.id);
        
        if (error) throw error;
        
        // Update the feedback in the state
        setFeedback(prev => prev.map(item => 
          item.id === feedback.id ? { ...item, is_read: true } : item
        ));
        
        // Update the selected feedback too
        setSelectedFeedback(prev => prev ? { ...prev, is_read: true } : null);
      } catch (error) {
        console.error('Error marking feedback as read:', error);
        // Don't toast here as it's a background operation
      }
    }
  };

  // Fix the parameter types to match what DataTable component expects
  const handlePaginationChange = (paginationConfig: { pageIndex: number, pageSize: number }) => {
    setPagination(paginationConfig);
  };

  const handleUnreadFilterChange = (checked: boolean) => {
    setUnreadOnly(checked);
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">フィードバック管理</h1>
        <p className="text-muted-foreground">
          ユーザーから寄せられたフィードバックを表示します。行をクリックすると詳細を表示します。
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="unread" 
          checked={unreadOnly} 
          onCheckedChange={handleUnreadFilterChange}
        />
        <label
          htmlFor="unread"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          未読のみ表示
        </label>
      </div>

      <DataTable
        columns={columns}
        data={feedback}
        onRowClick={handleRowClick}
        isLoading={isLoading}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        searchPlaceholder="メッセージで検索..."
        searchColumn="message"
      />
      
      {/* Feedback detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          {selectedFeedback && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-brand-pink" />
                  フィードバック詳細
                </DialogTitle>
                <DialogDescription>
                  ユーザーID: {selectedFeedback.user_id}
                </DialogDescription>
              </DialogHeader>
              <div className="p-4 border rounded-md bg-muted/30">
                <p className="whitespace-pre-wrap">{selectedFeedback.message}</p>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <p>{new Date(selectedFeedback.created_at).toLocaleString('ja-JP')}</p>
                <Badge
                  variant={selectedFeedback.is_read ? "outline" : "default"}
                  className={
                    selectedFeedback.is_read ? "bg-transparent" : "bg-brand-pink text-white"
                  }
                >
                  {selectedFeedback.is_read ? "既読" : "未読"}
                </Badge>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackPage;
