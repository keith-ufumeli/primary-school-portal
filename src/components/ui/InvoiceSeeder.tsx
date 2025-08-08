"use client";
import { Button } from "./button";
import { useMutation } from "@tanstack/react-query";
import { upsertInvoice, FeeInvoice } from "@/lib/mockApi";
import { students } from "@/lib/mockData";
import { v4 as uuidv4 } from "uuid";

export function InvoiceSeeder() {
  const mutation = useMutation({ mutationFn: upsertInvoice });

  const seed = async () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const demo: FeeInvoice[] = students.flatMap((s) => [
      { id: uuidv4(), studentId: s.id, term: 1, amount: 50, dueDate: `${yyyy}-02-15`, status: "paid" },
      { id: uuidv4(), studentId: s.id, term: 2, amount: 50, dueDate: `${yyyy}-06-10`, status: "due" },
      { id: uuidv4(), studentId: s.id, term: 3, amount: 50, dueDate: `${yyyy}-09-05`, status: "pending" },
    ]);
    for (const inv of demo) {
      await mutation.mutateAsync(inv);
    }
  };

  return (
    <Button variant="outline" onClick={seed}>
      Seed Demo Invoices
    </Button>
  );
} 