
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { record } = await req.json()
    const { id, email, raw_user_meta_data } = record as { 
      id: string; 
      email: string; 
      raw_user_meta_data?: { displayName?: string } 
    }

    console.log('Creating profile for user:', { id, email })

    // プロファイル作成（既存の場合は無視）
    const { data, error } = await supabase
      .from('profiles')
      .insert({ 
        id, 
        name: raw_user_meta_data?.displayName || email.split('@')[0], 
        role: 'user' 
      })
      .select()

    if (error && error.code !== '23505') { // 23505 は unique constraint violation
      console.error('Error creating profile:', error)
      throw error
    }

    console.log('Profile created successfully:', data)

    return new Response(
      JSON.stringify({ success: true, message: 'Profile created' }), 
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
