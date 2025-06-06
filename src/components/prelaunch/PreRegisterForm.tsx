
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, Lock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
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
  age: z.coerce.number().min(12, "12歳以上である必要があります").max(120, "有効な年齢を入力してください"),
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
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      age: undefined,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      // Mock registration - in a real implementation this would save to a database
      console.log('Registration attempt:', { email: values.email, age: values.age });
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success("事前登録が完了しました！", {
        description: "アカウントが作成され、公開日にメールでお知らせします。",
      });
      
      setRegistered(true);
      
      if (onSuccess) onSuccess();
      
    } catch (error: any) {
      toast.error("登録に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }

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
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="年齢"
                          type="number"
                          className="pl-10"
                          min={12}
                          max={120}
                          disabled={loading}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value === "" ? undefined : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </div>
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
        </div>
      ) : (
        <div className="rounded-lg border p-6 shadow-sm bg-green-50 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-heading font-bold mb-2 text-green-700">登録完了！</h3>
            <p className="text-green-600">
              公開日（2025年5月23日）にアプリが利用可能になります。
            </p>
            <p className="text-green-600 mt-2">
              お知らせメールをお送りしますので、公開後にログインしてご利用ください。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreRegisterForm;
