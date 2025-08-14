"use client";
import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "./button";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { listInvoicesByStudent, makePayment, PaymentMethod, listReceipts, PaymentReceipt } from "@/lib/mockApi";
import { Skeleton } from "./Skeleton";

export function FeePaymentFlow({ studentId }: { studentId: string }) {
  const queryClient = useQueryClient();
  const [method, setMethod] = useState<PaymentMethod>("Ecocash");
  const receiptRef = useRef<HTMLDivElement>(null);

  const { data: invoices, isLoading: loadingInvoices } = useQuery({
    queryKey: ["invoices", studentId],
    queryFn: () => listInvoicesByStudent(studentId),
  });

  const pendingInvoices = useMemo(() =>
    (invoices || []).filter((i) => i.status !== "paid"),
  [invoices]);

  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const { data: receipts } = useQuery({
    queryKey: ["receipts", studentId],
    queryFn: () => listReceipts(studentId),
  });

  const payMutation = useMutation({
    mutationFn: (invoiceId: string) => makePayment(invoiceId, method),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["invoices", studentId] }),
        queryClient.invalidateQueries({ queryKey: ["receipts", studentId] }),
      ]);
    },
  });

  const selectedInvoice = useMemo(() =>
    invoices?.find((i) => i.id === selectedInvoiceId) || null,
  [invoices, selectedInvoiceId]);

  const onDownloadReceipt = async (receipt: PaymentReceipt) => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = 210 - 20;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, width, height);
    pdf.save(`Receipt_${receipt.reference}.pdf`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay School Fees</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loadingInvoices && <Skeleton className="h-10 w-full" />}

        {!loadingInvoices && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select onValueChange={(v) => setSelectedInvoiceId(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Invoice" />
                </SelectTrigger>
                <SelectContent>
                  {pendingInvoices.map((i) => (
                    <SelectItem key={i.id} value={i.id}>
                      Term {i.term} - ${i.amount} (Due {i.dueDate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={method} onValueChange={(v) => setMethod(v as PaymentMethod)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Ecocash", "Bank Transfer", "Swipe", "Cash"] as PaymentMethod[]).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                disabled={!selectedInvoiceId || payMutation.isPending}
                onClick={() => selectedInvoiceId && payMutation.mutate(selectedInvoiceId)}
              >
                {payMutation.isPending ? "Processing..." : "Pay Now"}
              </Button>
            </div>

            {selectedInvoice && (
              <div className="p-3 rounded-md bg-blue-50 text-blue-700 text-sm">
                Invoice: Term {selectedInvoice.term}, Amount ${selectedInvoice.amount}, Due {selectedInvoice.dueDate}
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <div className="font-medium mb-2">Receipts</div>
          <div className="space-y-3">
            {(receipts || []).map((r) => (
              <div key={r.id} className="border rounded-md p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.method} • ${r.amount}</div>
                  <div className="text-xs text-gray-600">{new Date(r.paidAt).toLocaleString()} • Ref: {r.reference}</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => onDownloadReceipt(r)}>Download PDF</Button>
              </div>
            ))}
            {(receipts || []).length === 0 && (
              <div className="text-sm text-gray-500">No receipts yet</div>
            )}
          </div>
        </div>

        <div className="sr-only" aria-hidden ref={receiptRef}>
          <div className="p-6 border rounded-md w-[700px]">
            <div className="text-xl font-semibold mb-2">Payment Receipt</div>
            <div className="text-sm text-gray-600">This section is used only for PDF generation.</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 