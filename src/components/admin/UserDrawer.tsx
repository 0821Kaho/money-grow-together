
/**
 * User detail drawer component
 * Used for viewing and editing user details
 */
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateUser } from '@/data/users';
import { Loader2 } from 'lucide-react';
import type { User, UpdateUser } from '@/types/database.types';

interface UserDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export function UserDrawer({ user, isOpen, onClose, onUserUpdated }: UserDrawerProps) {
  const [updating, setUpdating] = useState(false);
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [status, setStatus] = useState<'active' | 'paused' | 'deleted'>('active');

  // Reset form when user changes
  React.useEffect(() => {
    if (user) {
      setRole(user.role || 'user');
      setStatus(user.status || 'active');
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setUpdating(true);
    try {
      // Only update fields that have changed
      const updates: UpdateUser = {};
      if (role !== user.role) updates.role = role;
      if (status !== user.status) updates.status = status;
      
      // Skip API call if nothing has changed
      if (Object.keys(updates).length === 0) {
        onClose();
        return;
      }

      const result = await updateUser(user.id, updates);
      if (result) {
        onUserUpdated();
        onClose();
      }
    } finally {
      setUpdating(false);
    }
  };

  // Format date to local format
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>ユーザー詳細</SheetTitle>
        </SheetHeader>

        {user ? (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">ID</h3>
              <p className="text-sm font-mono">{user.id}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">メールアドレス</h3>
              <p>{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">名前</h3>
              <p>{user.full_name || '未設定'}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">登録日</h3>
              <p>{formatDate(user.created_at)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">プラン</h3>
              <p>{user.plan === 'premium' ? 'プレミアム' : 'フリー'}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">権限</h3>
              <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'user')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="権限を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">管理者</SelectItem>
                  <SelectItem value="user">ユーザー</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">ステータス</h3>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as 'active' | 'paused' | 'deleted')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">有効</SelectItem>
                  <SelectItem value="paused">一時停止</SelectItem>
                  <SelectItem value="deleted">削除済み</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            <p>ユーザーデータを読み込み中...</p>
          </div>
        )}

        <SheetFooter className="mt-6">
          <Button
            type="submit"
            onClick={handleSave}
            disabled={updating || !user}
            className="flex-1 sm:flex-initial"
          >
            {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            保存
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-initial"
          >
            キャンセル
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
