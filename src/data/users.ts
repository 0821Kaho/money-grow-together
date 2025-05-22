
/**
 * API wrapper for user management
 * Handles all interactions with the Supabase users table
 */
import supabase from '@/lib/supabaseClient';
import { toast } from 'sonner';
import type { User, UpdateUser } from '@/types/database.types';

/**
 * Fetches the list of users with pagination
 * @param page Current page number (starting from 1)
 * @param pageSize Number of items per page
 * @returns Object containing users array and total count
 */
export async function listUsers(page: number = 1, pageSize: number = 20) {
  try {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    
    const { data, error } = await supabase
      .from('users')
      .select()
      .order('created_at', { ascending: false })
      .range(start, end);
    
    if (error) {
      handleError(error);
      return { users: [], total: 0 };
    }
    
    return { 
      users: data as User[], 
      total: data.length > 0 ? data.length + end : 0 // Estimate total for mock
    };
  } catch (error) {
    console.error('Failed to list users:', error);
    toast.error('ユーザー一覧の取得に失敗しました');
    return { users: [], total: 0 };
  }
}

/**
 * Updates a user's information
 * @param id User ID
 * @param data User data to update
 * @returns Updated user data or null on failure
 */
export async function updateUser(id: string, data: UpdateUser) {
  try {
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(data)
      .eq('id', id);
    
    if (error) {
      handleError(error);
      return null;
    }
    
    toast.success('ユーザー情報を更新しました');
    return updatedUser;
  } catch (error) {
    console.error('Failed to update user:', error);
    toast.error('ユーザー情報の更新に失敗しました');
    return null;
  }
}

/**
 * Gets a specific user by ID
 * @param id User ID
 * @returns User data or null if not found
 */
export async function getUserById(id: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id);
    
    if (error) {
      handleError(error);
      return null;
    }
    
    return data?.[0] as User | null;
  } catch (error) {
    console.error('Failed to get user:', error);
    toast.error('ユーザー情報の取得に失敗しました');
    return null;
  }
}

/**
 * Handles error responses from Supabase
 */
function handleError(error: any) {
  console.error('Supabase error:', error);
  
  // Check if error is related to permissions
  if (error.code === 'PGRST116' || error.message?.includes('permission')) {
    toast.error('権限がありません');
  } else {
    toast.error(`エラーが発生しました: ${error.message || 'Unknown error'}`);
  }
}
