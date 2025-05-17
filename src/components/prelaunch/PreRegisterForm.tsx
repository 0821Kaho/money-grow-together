
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
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
};

const PreRegisterForm = ({ className = "", onSuccess }: PreRegisterFormProps) => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredCount, setRegisteredCount] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Fetch the registered count when component mounts
  useState(() => {
    api.get("/waitlist/count")
      .then(response => setRegisteredCount(response.data.count))
      .catch(error => console.error("Failed to fetch waitlist count", error));
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      await api.post("/waitlist", values);
      setRegistered(true);
      toast.success("事前登録が完了しました！", {
        description: "公開日にメールでお知らせします。",
      });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.info("このメールアドレスはすでに登録されています。");
        setRegistered(true);
      } else {
        toast.error("登録に失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className} id="waitlist-form">
      {!registered ? (
        <div className="rounded-lg border p-6 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-heading font-bold">公開のお知らせを受け取る</h3>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <p className="text-[12px] text-gray-500 text-center">
                ※メールは公開通知のみに使用します
              </p>
            </form>
          </Form>
          
          {registeredCount !== null && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              現在 <span className="font-medium text-primary">{registeredCount}</span> 人が事前登録済み
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-lg border p-6 shadow-sm bg-green-50">
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
