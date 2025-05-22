
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import type { Database } from '@/types/database.types';

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Create Supabase admin client with service role key to bypass RLS
const supabaseAdmin = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

// Middleware to check if request is from admin
const isAdminMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is required' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Check if user has admin role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profileError || profile?.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

// Users endpoints
app.get('/api/admin/users', isAdminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const searchQuery = req.query.q as string || '';
    
    // Base query
    let query = supabaseAdmin
      .from('users')
      .select(`
        auth.users!inner (id, email, created_at),
        profiles!inner (name, role)
      `)
      .order('created_at', { foreignTable: 'auth.users', ascending: false });
    
    // Apply search if provided
    if (searchQuery) {
      query = query.or(`email.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`, { foreignTable: 'profiles' });
    }
    
    // Execute with pagination
    const { data, error, count } = await query
      .range(offset, offset + limit - 1);
      
    if (error) throw error;
    
    return res.status(200).json({
      users: data,
      total: count || 0,
      page,
      limit
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/admin/users/:id', isAdminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get user details
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        auth.users!inner (id, email, created_at),
        profiles!inner (name, role)
      `)
      .eq('id', id)
      .single();
      
    if (userError) throw userError;
    
    // Get progress data
    const { data: progress, error: progressError } = await supabaseAdmin
      .from('progress')
      .select('*')
      .eq('user_id', id);
      
    if (progressError) throw progressError;
    
    // Get badges data
    const { data: badges, error: badgesError } = await supabaseAdmin
      .from('badges')
      .select('*')
      .eq('user_id', id);
      
    if (badgesError) throw badgesError;
    
    return res.status(200).json({
      user,
      progress: progress || [],
      badges: badges || []
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

app.patch('/api/admin/users/:id', isAdminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    
    // Update profile
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ name, role })
      .eq('id', id);
      
    if (error) throw error;
    
    return res.status(200).json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Failed to update user' });
  }
});

// Feedback endpoints
app.get('/api/admin/feedback', isAdminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const unreadOnly = req.query.unread === 'true';
    
    // Base query
    let query = supabaseAdmin
      .from('feedback')
      .select(`
        *,
        profiles!inner (email:auth.users!inner(email))
      `)
      .order('created_at', { ascending: false });
    
    // Filter by read status if requested
    if (unreadOnly) {
      query = query.eq('read', false);
    }
    
    // Execute with pagination
    const { data, error, count } = await query
      .range(offset, offset + limit - 1);
      
    if (error) throw error;
    
    return res.status(200).json({
      feedback: data,
      total: count || 0,
      page,
      limit
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

app.patch('/api/admin/feedback/:id/read', isAdminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .update({ read: true })
      .eq('id', id);
      
    if (error) throw error;
    
    return res.status(200).json({
      success: true,
      message: 'Feedback marked as read'
    });
  } catch (error) {
    console.error('Error marking feedback as read:', error);
    return res.status(500).json({ error: 'Failed to update feedback' });
  }
});

// Settings endpoints
app.get('/api/admin/settings', isAdminMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*');
      
    if (error) throw error;
    
    return res.status(200).json({
      settings: data || []
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/admin/settings', isAdminMiddleware, async (req, res) => {
  try {
    const { settings } = req.body;
    
    // Validate settings
    if (!Array.isArray(settings)) {
      return res.status(400).json({ error: 'Settings must be an array' });
    }
    
    // Upsert settings
    const { data, error } = await supabaseAdmin
      .from('settings')
      .upsert(settings, { onConflict: 'key' });
      
    if (error) throw error;
    
    return res.status(200).json({
      success: true,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Admin API server running on port ${PORT}`);
});

export default app;
