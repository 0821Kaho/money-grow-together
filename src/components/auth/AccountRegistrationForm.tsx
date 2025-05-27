
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります"),
  displayName: z.string().min(2, "ニックネームは2文字以上である必要があります"),
});

type FormValues = z.infer<typeof formSchema>;

type AccountRegistrationFormProps = {
  className?: string;
  onSuccess?: () => void;
  id?: string;
};

const AccountRegistrationForm = ({ className = "", onSuccess, id = "registration-form" }: AccountRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      await signup(values.email, values.password, values.displayName);
      
      toast.success("アカウント作成完了！", {
        description: "Pigipeへようこそ！学習を開始しましょう。",
      });
      
      if (onSuccess) onSuccess();
      
      // Redirect to modules page
      navigate("/modules");
      
    } catch (error: any) {
      if (error.message.includes("already registered")) {
        toast.info("このメールアドレスはすでに登録されています。", {
          description: "ログインページからログインしてください。",
        });
      } else {
        toast.error("アカウント作成に失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className} id={id}>
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-heading font-bold">アカウント作成</h3>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ニックネーム"
                        type="text"
                        className="pl-10"
                        disabled={loading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="メールアドレス"
                        type="email"
                        className="pl-10"
                        disabled={loading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="パスワード（8文字以上）"
                        type="password"
                        className="pl-10"
                        disabled={loading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "作成中..." : "アカウント作成して始める"}
            </Button>
          </form>
        </Form>
        
        <p className="text-[12px] text-gray-500 text-center">
          アカウント作成により利用規約とプライバシーポリシーに同意したものとみなします
        </p>
      </div>
    </div>
  );
};

export default AccountRegistrationForm;
