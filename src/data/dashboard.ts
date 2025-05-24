
import { supabase } from '@/integrations/supabase/client';

export type DashboardStats = {
  totalUsers: number;
  activeUsers: number;
  completedModules: number;
  unreadFeedback: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // For a real implementation, these would be fetched from your Supabase backend
    // For now, we'll return mock data
    
    // Get total users count
    const { count: totalUsers, error: usersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
      
    if (usersError) throw usersError;
    
    // Get active users (active in the last 30 days)
    // For now we'll use a percentage of total as a mock
    const activeUsers = Math.floor(totalUsers * 0.7);
    
    // Get completed modules
    const { count: completedModules, error: modulesError } = await supabase
      .from('progress')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');
      
    if (modulesError) throw modulesError;
    
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
    // Return default values in case of error
    return {
      totalUsers: 0,
      activeUsers: 0,
      completedModules: 0,
      unreadFeedback: 0
    };
  }
}
