
/**
 * Supabase client initialization
 * Used for all Supabase interactions in the admin dashboard
 */
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// In a real implementation, these would be environment variables
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// For the mock implementation, we'll use these values
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// This is a mock implementation for demo purposes
// In production, you would use the actual Supabase client
export const supabaseMock = {
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        data: null,
        error: null,
      }),
      order: () => ({
        range: (start: number, end: number) => ({
          data: mockUsers,
          error: null,
        })
      })
    }),
    update: (data: any) => ({
      eq: () => ({
        data: { ...data },
        error: null,
      })
    })
  }),
  auth: {
    getUser: () => Promise.resolve({
      data: { user: { id: '1', email: 'admin@example.com', role: 'admin' } },
      error: null
    })
  }
};

// Mock data for demonstration
const mockUsers = [
  { id: '1', email: 'kahosatoyoshi@gmail.com', full_name: '里吉 果歩', role: 'admin', plan: 'premium', status: 'active', created_at: '2023-01-01T00:00:00.000Z' },
  { id: '2', email: 'user1@example.com', full_name: '山田 太郎', role: 'user', plan: 'free', status: 'active', created_at: '2023-01-02T00:00:00.000Z' },
  { id: '3', email: 'user2@example.com', full_name: '佐藤 花子', role: 'user', plan: 'premium', status: 'paused', created_at: '2023-01-03T00:00:00.000Z' },
  { id: '4', email: 'user3@example.com', full_name: '鈴木 一郎', role: 'user', plan: 'free', status: 'active', created_at: '2023-01-04T00:00:00.000Z' },
  // Add more mock users for pagination testing
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 5}`,
    email: `user${i + 4}@example.com`,
    full_name: `テストユーザー ${i + 4}`,
    role: 'user',
    plan: i % 2 === 0 ? 'free' : 'premium',
    status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'paused' : 'deleted',
    created_at: `2023-02-${(i % 28) + 1}T00:00:00.000Z`
  }))
];

// Export the mock client as default for now, would be the real client in production
export default supabaseMock;
