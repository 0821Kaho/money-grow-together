import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bell, User, Lock, Shield, Globe } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAuth } from "@/contexts/AuthContext";
import GameLayout from "@/components/layout/GameLayout";

const accountFormSchema = z.object({
  name: z.string().min(2, {
    message: "名前は2文字以上で入力してください。",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
});

const notificationsFormSchema = z.object({
  newAchievements: z.boolean().default(true),
  moduleUpdates: z.boolean().default(true),
  emailNotifications: z.boolean().default(false),
});

const displayFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  language: z.enum(["ja", "en"]).default("ja"),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "現在のパスワードを入力してください。",
  }),
  newPassword: z.string().min(8, {
    message: "パスワードは8文字以上で入力してください。",
  }),
  confirmPassword: z.string().min(8, {
    message: "パスワードは8文字以上で入力してください。",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "パスワードが一致しません。",
  path: ["confirmPassword"],
});

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  // Get user display name from metadata
  const userDisplayName = user?.user_metadata?.displayName || '';
  const userEmail = user?.email || '';

  // Account Form
  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: userDisplayName,
      email: userEmail,
    },
  });

  // Notifications Form
  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      newAchievements: true,
      moduleUpdates: true,
      emailNotifications: false,
    },
  });

  // Display Form
  const displayForm = useForm<z.infer<typeof displayFormSchema>>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: {
      theme: "system",
      language: "ja",
    },
  });

  // Security Form
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Submit handlers
  const onAccountSubmit = (data: z.infer<typeof accountFormSchema>) => {
    toast.success("アカウント情報を更新しました");
  };

  const onNotificationsSubmit = (data: z.infer<typeof notificationsFormSchema>) => {
    toast.success("通知設定を更新しました");
  };

  const onDisplaySubmit = (data: z.infer<typeof displayFormSchema>) => {
    toast.success("表示設定を更新しました");
  };

  const onSecuritySubmit = (data: z.infer<typeof securityFormSchema>) => {
    toast.success("パスワードを変更しました");
    securityForm.reset();
  };

  return (
    <GameLayout>
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">設定</h1>
        
        <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account" className="flex flex-col items-center gap-1 py-2">
              <User className="h-4 w-4" />
              <span className="text-xs">アカウント</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col items-center gap-1 py-2">
              <Bell className="h-4 w-4" />
              <span className="text-xs">通知</span>
            </TabsTrigger>
            <TabsTrigger value="display" className="flex flex-col items-center gap-1 py-2">
              <Globe className="h-4 w-4" />
              <span className="text-xs">表示</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col items-center gap-1 py-2">
              <Lock className="h-4 w-4" />
              <span className="text-xs">セキュリティ</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>アカウント設定</CardTitle>
                <CardDescription>アカウント情報を変更します。</CardDescription>
              </CardHeader>
              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={accountForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>名前</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>メールアドレス</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">保存</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
                <CardDescription>通知の受け取り方を設定します。</CardDescription>
              </CardHeader>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="newAchievements"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>新しい実績</FormLabel>
                            <FormDescription>新しい実績達成時に通知を受け取る</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="moduleUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>モジュール更新</FormLabel>
                            <FormDescription>新しいモジュール追加時に通知を受け取る</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>メール通知</FormLabel>
                            <FormDescription>メールでも通知を受け取る</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">保存</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="display">
            <Card>
              <CardHeader>
                <CardTitle>表示設定</CardTitle>
                <CardDescription>表示に関する設定を変更します。</CardDescription>
              </CardHeader>
              <Form {...displayForm}>
                <form onSubmit={displayForm.handleSubmit(onDisplaySubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={displayForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>テーマ</FormLabel>
                          <FormControl>
                            <ToggleGroup
                              type="single"
                              value={field.value}
                              onValueChange={(value) => {
                                if (value) field.onChange(value);
                              }}
                              className="justify-start"
                            >
                              <ToggleGroupItem value="light">ライト</ToggleGroupItem>
                              <ToggleGroupItem value="dark">ダーク</ToggleGroupItem>
                              <ToggleGroupItem value="system">システム</ToggleGroupItem>
                            </ToggleGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={displayForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>言語</FormLabel>
                          <FormControl>
                            <ToggleGroup
                              type="single"
                              value={field.value}
                              onValueChange={(value) => {
                                if (value) field.onChange(value);
                              }}
                              className="justify-start"
                            >
                              <ToggleGroupItem value="ja">日本語</ToggleGroupItem>
                              <ToggleGroupItem value="en">English</ToggleGroupItem>
                            </ToggleGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">保存</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>セキュリティ設定</CardTitle>
                <CardDescription>パスワードを変更します。</CardDescription>
              </CardHeader>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>現在のパスワード</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>新しいパスワード</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>パスワードの確認</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">パスワードを変更</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </GameLayout>
  );
};

export default SettingsPage;
