
/**
 * User data operations
 * 
 * This file contains functions for fetching and manipulating user data 
 * (mocked for static site)
 */

export interface UserListParams {
  page?: number;
  pageSize?: number;
  query?: string;
}

/**
 * List users with pagination and optional filtering (mocked)
 */
export async function listUsers(page = 1, pageSize = 20, query = '') {
  try {
    // Mock data for static site
    const mockUsers = Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i + 1}`,
      email: `user${i + 1}@example.com`,
      full_name: `ユーザー ${i + 1}`,
      role: i < 3 ? 'admin' : 'user',
      plan: 'free',
      status: 'active',
      created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    }));

    // Apply search filter if provided
    const filteredUsers = query 
      ? mockUsers.filter(user => 
          user.full_name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        )
      : mockUsers;

    // Apply pagination
    const offset = (page - 1) * pageSize;
    const paginatedUsers = filteredUsers.slice(offset, offset + pageSize);
    
    return { 
      users: paginatedUsers, 
      total: filteredUsers.length
    };
  } catch (error) {
    console.error('Error in listUsers:', error);
    throw error;
  }
}

/**
 * Get a single user by ID (mocked)
 */
export async function getUserById(userId: string) {
  try {
    // Mock data for static site
    const user = {
      id: userId,
      email: `user@example.com`,
      full_name: 'サンプルユーザー',
      role: 'user',
      plan: 'free',
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    return user;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
}

/**
 * Update a user (mocked)
 */
export async function updateUser(userId: string, userData: { [key: string]: any }) {
  try {
    // Mock implementation for static site
    console.log('Updating user:', userId, userData);
    return { success: true };
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
}
