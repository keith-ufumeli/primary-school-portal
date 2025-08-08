"use client";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listFeeDefaulters, FeeInvoice } from "@/lib/mockApi";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Skeleton } from "./Skeleton";

export function FeeDefaultersTable() {
  const { data, isLoading } = useQuery({ queryKey: ["defaulters"], queryFn: listFeeDefaulters });
  const [sortKey, setSortKey] = useState<keyof FeeInvoice>("amount");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const arr = [...(data || [])];
    arr.sort((a, b) => {
      const va = a[sortKey] as unknown as string | number;
      const vb = b[sortKey] as unknown as string | number;
      if (typeof va === "number" && typeof vb === "number") {
        return direction === "asc" ? va - vb : vb - va;
      }
      const sva = String(va);
      const svb = String(vb);
      return direction === "asc" ? sva.localeCompare(svb) : svb.localeCompare(sva);
    });
    return arr;
  }, [data, sortKey, direction]);

  const onSort = (key: keyof FeeInvoice) => {
    if (key === sortKey) setDirection((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Defaulters</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => onSort("studentId")} className="cursor-pointer">Student ID</TableHead>
                <TableHead onClick={() => onSort("term")} className="cursor-pointer">Term</TableHead>
                <TableHead onClick={() => onSort("amount")} className="cursor-pointer">Amount</TableHead>
                <TableHead onClick={() => onSort("dueDate")} className="cursor-pointer">Due</TableHead>
                <TableHead onClick={() => onSort("status")} className="cursor-pointer">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">{i.studentId}</TableCell>
                  <TableCell>Term {i.term}</TableCell>
                  <TableCell>${i.amount}</TableCell>
                  <TableCell>{i.dueDate}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {i.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
} 