
/**
 * Dashboard data operations
 * 
 * This file contains functions for fetching dashboard statistics (mocked for static site)
 */

export async function getDashboardStats() {
  try {
    // Mock data for static site - in a real implementation this would fetch from a database
    return {
      totalUsers: 1250,
      activeUsers: 890,
      completedModules: 3420,
      unreadFeedback: 12
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}
