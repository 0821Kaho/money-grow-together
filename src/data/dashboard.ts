
/**
 * Dashboard data operations
 * 
 * This file contains functions for fetching dashboard statistics from Supabase
 */
import { supabase } from '@/integrations/supabase/client';

export async function getDashboardStats() {
  try {
    // Get total users count from profiles table
    const { count: totalUsers, error: totalError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    if (totalError) throw totalError;
    
    // Get active users count (those with role = 'user')
    const { count: activeUsers, error: activeError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'user');
    
    if (activeError) throw activeError;
    
    // Get completed modules count
    const { count: completedModules, error: completedError } = await supabase
      .from('progress')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');
    
    if (completedError) throw completedError;
    
    // Get unread feedback count
    const { count: unreadFeedback, error: feedbackError } = await supabase
      .from('feedback')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);
    
    if (feedbackError) throw feedbackError;
    
    return {
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      completedModules: completedModules || 0,
      unreadFeedback: unreadFeedback || 0
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}
