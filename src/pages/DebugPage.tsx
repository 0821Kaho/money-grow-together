
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DebugPage = () => {
  const [localStorageData, setLocalStorageData] = useState<Array<{key: string, value: string}>>([]);

  useEffect(() => {
    // Get all localStorage data
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        data.push({ key, value: value || '' });
      }
    }
    setLocalStorageData(data);
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const refreshData = () => {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        data.push({ key, value: value || '' });
      }
    }
    setLocalStorageData(data);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Debug: LocalStorage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={clearLocalStorage} variant="destructive">
              Clear LocalStorage
            </Button>
            <Button onClick={refreshData} variant="outline">
              Refresh Data
            </Button>
          </div>
          
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Key</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localStorageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No localStorage data found
                    </TableCell>
                  </TableRow>
                ) : (
                  localStorageData.map(({ key, value }) => (
                    <TableRow key={key}>
                      <TableCell className="font-mono text-sm">{key}</TableCell>
                      <TableCell className="font-mono text-sm max-w-md truncate" title={value}>
                        {value}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Total items: {localStorageData.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebugPage;
