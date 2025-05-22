
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { waitlistApi } from '@/lib/api';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

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

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        setLoading(true);
        const countRes = await waitlistApi.getCount();
        const entriesRes = await waitlistApi.getAll();
        
        setCount(countRes.data.count);
        setEntries(entriesRes.data.entries || []);
      } catch (error) {
        console.error('Failed to fetch waitlist:', error);
        toast.error('Failed to fetch waitlist data');
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, []);

  const downloadCSV = () => {
    const header = 'ID,Email,Registration Date,Age\n';
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
        <h2 className="text-xl font-medium">Waitlist Entries</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Total: {count}</div>
          <Button onClick={downloadCSV} size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading waitlist data...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No entries found
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry) => (
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
      )}
    </div>
  );
};

export default WaitlistPage;
