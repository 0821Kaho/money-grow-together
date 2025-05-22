
import React, { useState, useEffect } from 'react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { DataTable } from '@/components/admin/DataTable';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageCircle } from 'lucide-react';

type Feedback = {
  id: string;
  user_id: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
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
      accessorKey: "email",
      header: "送信者",
      cell: ({ row }) => <div className="font-medium">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "subject",
      header: "件名",
      cell: ({ row }) => <div>{row.getValue("subject")}</div>,
    },
    {
      accessorKey: "read",
      header: "状態",
      cell: ({ row }) => {
        const read = row.getValue("read") as boolean;
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

  // Fetch feedback data from our admin API
  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/feedback?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}&unread=${unreadOnly}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      
      const data = await response.json();
      
      // Transform the data to match our Feedback type
      const formattedFeedback = data.feedback.map(item => ({
        id: item.id,
        user_id: item.user_id,
        email: item.profiles.email,
        subject: item.subject,
        message: item.message,
        read: item.read,
        created_at: item.created_at,
      }));
      
      setFeedback(formattedFeedback);
      setPageCount(Math.ceil(data.total / pagination.pageSize) || 1);
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
    if (!feedback.read) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/admin/feedback/${feedback.id}/read`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to mark feedback as read');
        }
        
        // Update the feedback in the state
        setFeedback(prev => prev.map(item => 
          item.id === feedback.id ? { ...item, read: true } : item
        ));
        
        // Update the selected feedback too
        setSelectedFeedback(prev => prev ? { ...prev, read: true } : null);
      } catch (error) {
        console.error('Error marking feedback as read:', error);
        // Don't toast here as it's a background operation
      }
    }
  };

  const handlePaginationChange = (pageIndex: number, pageSize: number) => {
    setPagination({ pageIndex, pageSize });
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
        searchPlaceholder="件名やメールアドレスで検索..."
        searchColumn="subject"
      />
      
      {/* Feedback detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          {selectedFeedback && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-brand-pink" />
                  {selectedFeedback.subject}
                </DialogTitle>
                <DialogDescription>
                  送信者: {selectedFeedback.email}
                </DialogDescription>
              </DialogHeader>
              <div className="p-4 border rounded-md bg-muted/30">
                <p className="whitespace-pre-wrap">{selectedFeedback.message}</p>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <p>{new Date(selectedFeedback.created_at).toLocaleString('ja-JP')}</p>
                <Badge
                  variant={selectedFeedback.read ? "outline" : "default"}
                  className={
                    selectedFeedback.read ? "bg-transparent" : "bg-brand-pink text-white"
                  }
                >
                  {selectedFeedback.read ? "既読" : "未読"}
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
