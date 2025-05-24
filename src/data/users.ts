
import { supabase } from '@/integrations/supabase/client';

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  plan: string;
  status: string;
  created_at: string;
};

export type UpdateUser = {
  full_name?: string;
  role?: string;
  status?: string;
};

export async function listUsers(
  page: number = 1,
  pageSize: number = 20,
  searchQuery: string = ''
): Promise<{ users: User[]; total: number }> {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `/api/admin/users?page=${page}&limit=${pageSize}&q=${encodeURIComponent(searchQuery)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    
    // Map the response data to the User type
    const users: User[] = data.users.map((user: any) => ({
      id: user.id,
      email: user.email,
      full_name: user.full_name || null,
      role: user.role || 'user',
      plan: user.plan || 'free',
      status: user.status || 'active',
      created_at: user.created_at,
    }));

    return {
      users,
      total: data.total,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    
    return {
      id: data.user.id,
      email: data.user.email,
      full_name: data.user.full_name || null,
      role: data.user.role || 'user',
      plan: data.user.plan || 'free',
      status: data.user.status || 'active',
      created_at: data.user.created_at,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function updateUser(id: string, updates: UpdateUser): Promise<boolean> {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
