
export interface Profile {
  id: string;
  role: 'user' | 'admin';
  name?: string | null;
  created_at?: string;
}
