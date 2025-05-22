
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { waitlistApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { DownloadIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
}

const AdminWaitlistPage = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin (simplified check - in production use proper role checks)
  const isAdmin = user?.email === "admin@pigipe.com"; // Replace with actual admin check

  useEffect(() => {
    // Redirect non-admins to homepage
    if (isAuthenticated && !isAdmin) {
      toast.error("管理者権限が必要です");
      navigate("/");
      return;
    }

    // Fetch waitlist entries
    const fetchEntries = async () => {
      try {
        const response = await waitlistApi.getAllEntries();
        setEntries(response.data.entries);
      } catch (error) {
        console.error("Failed to fetch waitlist entries:", error);
        toast.error("事前登録者の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && isAdmin) {
      fetchEntries();
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleDownloadCSV = () => {
    // Create CSV content
    const csvContent = [
      "ID,Email,Registration Date",
      ...entries.map(entry => `${entry.id},${entry.email},${format(new Date(entry.createdAt), "yyyy/MM/dd HH:mm")}`),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pigipe-waitlist-${format(new Date(), "yyyyMMdd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>認証が必要です</CardTitle>
            <CardDescription>このページを表示するには、ログインしてください。</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/login")}>ログイン</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // The useEffect will redirect, this prevents flash of content
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/")}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        戻る
      </Button>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">事前登録者リスト</CardTitle>
            <CardDescription>
              Pigipeに登録した全ユーザー ({entries.length}人)
            </CardDescription>
          </div>
          <Button onClick={handleDownloadCSV}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            CSVダウンロード
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>読み込み中...</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>メールアドレス</TableHead>
                    <TableHead>登録日時</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
                        事前登録者はまだいません
                      </TableCell>
                    </TableRow>
                  ) : (
                    entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.id}</TableCell>
                        <TableCell>{entry.email}</TableCell>
                        <TableCell>
                          {format(new Date(entry.createdAt), "yyyy/MM/dd HH:mm")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWaitlistPage;
