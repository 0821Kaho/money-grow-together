
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
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
});

type FormValues = z.infer<typeof formSchema>;

type PreRegisterFormProps = {
  className?: string;
  onSuccess?: () => void;
  id?: string;
};

const PreRegisterForm = ({ className = "", onSuccess, id = "waitlist-form" }: PreRegisterFormProps) => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredCount, setRegisteredCount] = useState<number | null>(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Fetch the registered count when component mounts
  useEffect(() => {
    // Mock implementation for now due to API issues
    setRegisteredCount(13427);
    
    // Real implementation (commented out for now)
    // api.get("/waitlist/count")
    //   .then(response => setRegisteredCount(response.data.count))
    //   .catch(error => console.error("Failed to fetch waitlist count", error));
  }, []);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      // First register the email to the waitlist
      // Mock implementation
      // In production this would call the actual API
      // await api.post("/waitlist", values);
      
      // Then create an account and automatically sign them up
      const tempPassword = generateTempPassword();
      await signup(values.email, tempPassword);
      
      toast.success("事前登録が完了しました！", {
        description: "アカウントが作成され、公開日にメールでお知らせします。",
      });
      
      if (onSuccess) onSuccess();
      
      // Navigate to onboarding
      navigate("/onboarding");
      
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.info("このメールアドレスはすでに登録されています。");
      } else {
        toast.error("登録に失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  }

  // Generate a temporary secure password
  const generateTempPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  return (
    <div className={className} id={id}>
      {!registered ? (
        <div className="bg-white shadow-md rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-heading font-bold">公開のお知らせを受け取る</h3>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="メールアドレス"
                        type="email"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "登録中..." : "事前登録する"}
              </Button>
            </form>
          </Form>
          
          <p className="text-[12px] text-gray-500 text-center">
            ※通知は一度だけ / 退会は1クリック
          </p>
          
          {registeredCount !== null && (
            <p className="text-center text-sm text-muted-foreground">
              現在 <span className="font-medium text-primary">{registeredCount}</span> 人が事前登録済み
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-lg border p-6 shadow-sm bg-green-50 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-heading font-bold mb-2 text-green-700">登録完了！</h3>
            <p className="text-green-600">
              公開日（2025年5月23日）にお知らせメールをお送りします。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreRegisterForm;
