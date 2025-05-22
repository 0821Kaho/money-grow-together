
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { waitlistApi } from '@/lib/api';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
  age?: number;
}

const WaitlistPage = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        setLoading(true);
        const countRes = await waitlistApi.getCount();
        const entriesRes = await waitlistApi.getAll();
        
        setCount(countRes.data.count);
        
        // In a real implementation, we would paginate from the server
        // For now, we'll mock it by slicing the array
        const mockEntries = entriesRes.data.entries || [];
        setEntries(mockEntries);
        setTotalPages(Math.ceil(mockEntries.length / itemsPerPage) || 1);
      } catch (error) {
        console.error('Failed to fetch waitlist:', error);
        toast.error('登録者情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, []);

  const getPaginatedEntries = () => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return entries.slice(start, end);
  };

  const downloadCSV = () => {
    const header = 'ID,メール,登録日,年齢\n';
    const csv = entries.map(entry => {
      return `${entry.id},"${entry.email}","${new Date(entry.createdAt).toLocaleString()}",${entry.age || ''}`
    }).join('\n');
    
    const blob = new Blob([header + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `waitlist-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">登録者一覧</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">合計: {count}人</div>
          <Button onClick={downloadCSV} size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            CSVダウンロード
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">データ読み込み中...</div>
      ) : (
        <>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>メールアドレス</TableHead>
                  <TableHead>登録日</TableHead>
                  <TableHead>年齢</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPaginatedEntries().length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      登録者はまだいません
                    </TableCell>
                  </TableRow>
                ) : (
                  getPaginatedEntries().map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{entry.age || '-'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        onClick={() => setPage(pageNumber)}
                        isActive={page === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && <PaginationEllipsis />}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default WaitlistPage;
