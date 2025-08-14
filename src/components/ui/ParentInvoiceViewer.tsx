"use client";
import { useQuery } from "@tanstack/react-query";
import { listInvoicesByStudent } from "@/lib/mockApi";
import { Card, CardHeader, CardContent, CardTitle } from "./card";

export function ParentInvoiceViewer({ studentId }: { studentId: string }) {
  const { data, isLoading } = useQuery({ queryKey: ["invoices", studentId], queryFn: () => listInvoicesByStudent(studentId) });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-2">
            {(data || []).map((inv) => (
              <div key={inv.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">Term {inv.term} • ${inv.amount}</div>
                  <div className="text-xs text-gray-600">Due {inv.dueDate}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{inv.status}</span>
              </div>
            ))}
            {(data || []).length === 0 && <div className="text-sm text-gray-600">No invoices yet</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 