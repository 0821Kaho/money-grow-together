
/**
 * User data operations
 * 
 * This file contains functions for fetching and manipulating user data 
 * from the Supabase database.
 */
import { supabase } from '@/integrations/supabase/client';

export interface UserListParams {
  page?: number;
  pageSize?: number;
  query?: string;
}

/**
 * List users with pagination and optional filtering
 */
export async function listUsers(page = 1, pageSize = 20, query = '') {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;
    
    // Start base query - use profiles table which references auth.users
    let userQuery = supabase.from('profiles')
      .select('id, name, role, created_at', { count: 'exact' });
    
    // Apply search filter if provided
    if (query) {
      userQuery = userQuery.or(`name.ilike.%${query}%`);
    }
    
    // Execute query with pagination
    const { data: users, error, count } = await userQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);
    
    if (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
    
    // Transform the data to match the expected User type
    const transformedUsers = users?.map(profile => ({
      id: profile.id,
      email: '', // We don't have access to email from profiles table
      full_name: profile.name || '',
      role: profile.role,
      plan: 'free', // Default plan value
      status: 'active', // Default status value
      created_at: profile.created_at
    })) || [];
    
    return { 
      users: transformedUsers, 
      total: count || 0
    };
  } catch (error) {
    console.error('Error in listUsers:', error);
    throw error;
  }
}

/**
 * Get a single user by ID
 */
export async function getUserById(userId: string) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
    
    if (!profile) {
      throw new Error('User not found');
    }
    
    // Transform to match expected User type
    const user = {
      id: profile.id,
      email: '', // We don't have access to email from profiles table
      full_name: profile.name || '',
      role: profile.role,
      plan: 'free', // Default plan value
      status: 'active', // Default status value
      created_at: profile.created_at
    };
    
    return user;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
}

/**
 * Update a user
 */
export async function updateUser(userId: string, userData: { [key: string]: any }) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(userData)
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
    
    return data;
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
}
