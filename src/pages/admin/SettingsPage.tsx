
/**
 * Admin Settings Page 
 * 
 * Features:
 * - Edit application settings stored in Supabase
 * - Uses service role to bypass RLS policies
 */
import React, { useState, useEffect } from 'react';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@/components/ui/switch';

type Setting = {
  key: string;
  value: string;
  description?: string;
  type?: 'string' | 'boolean' | 'number';
};

// Define initial settings if no settings are found in the database
const defaultSettings: Setting[] = [
  { 
    key: 'app.name', 
    value: 'Pigipe', 
    description: 'アプリケーション名',
    type: 'string'
  },
  { 
    key: 'app.maintenance_mode', 
    value: 'false', 
    description: 'メンテナンスモード (true/false)',
    type: 'boolean'
  },
  {
    key: 'app.version',
    value: '1.0.0',
    description: 'アプリケーションのバージョン',
    type: 'string'
  },
  {
    key: 'features.achievements',
    value: 'true',
    description: '実績機能の有効化 (true/false)',
    type: 'boolean'
  },
  {
    key: 'features.social_sharing',
    value: 'true',
    description: 'ソーシャルシェア機能の有効化 (true/false)',
    type: 'boolean'
  }
];

const formSchema = z.object({
  settings: z.array(z.object({
    key: z.string(),
    value: z.string(),
    description: z.string().optional(),
    type: z.enum(['string', 'boolean', 'number']).optional()
  }))
});

type FormData = z.infer<typeof formSchema>;

const SettingsPage = () => {
  // Guards this page to admin-only access
  useAdminGuard();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Initialize the form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      settings: defaultSettings
    }
  });
  
  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/admin/settings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        
        const data = await response.json();
        
        // If there are settings in the database, use them, otherwise use defaults
        if (data.settings && data.settings.length > 0) {
          form.reset({ settings: data.settings });
        } else {
          form.reset({ settings: defaultSettings });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('設定の取得に失敗しました');
        // If there's an error, use default settings
        form.reset({ settings: defaultSettings });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          settings: data.settings
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update settings');
      }
      
      toast.success('設定を保存しました');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('設定の保存に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-4 w-full max-w-md" />
          </CardHeader>
          <CardContent className="space-y-6">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">アプリケーション設定</h1>
        <p className="text-muted-foreground">
          アプリケーションの基本設定を管理します。
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>システム設定</CardTitle>
              <CardDescription>
                アプリケーションの動作に関する設定を行います。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {form.watch('settings').map((setting, index) => (
                <FormField
                  key={setting.key}
                  control={form.control}
                  name={`settings.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row justify-between items-center">
                        <FormLabel>{setting.key}</FormLabel>
                        {setting.type === 'boolean' && (
                          <Switch
                            checked={field.value === 'true'}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? 'true' : 'false');
                            }}
                          />
                        )}
                      </div>
                      {setting.type !== 'boolean' && (
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      )}
                      {setting.description && (
                        <FormDescription>
                          {setting.description}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? '保存中...' : '変更を保存'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
