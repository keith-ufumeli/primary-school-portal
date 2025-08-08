"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { students } from "@/lib/mockData";
import { FeePaymentFlow } from "@/components/ui/FeePaymentFlow";
import { FeeDefaultersTable } from "@/components/ui/FeeDefaultersTable";
import { InvoiceSeeder } from "@/components/ui/InvoiceSeeder";

export default function FeesPage() {
  const [userRole, setUserRole] = useState("parent");
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") || "parent";
    setUserRole(role);
  }, []);

  // Mock fee data for different scenarios
  const allFeeRecords = students.flatMap(student => 
    student.fees.map(fee => ({
      studentId: student.id,
      studentName: student.name,
      grade: student.grade,
      ...fee
    }))
  );

  const filteredFees = allFeeRecords.filter(fee => {
    const matchesTerm = selectedTerm === "all" || fee.term.toString() === selectedTerm;
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTerm && matchesSearch;
  });

  const feeStats = {
    total: allFeeRecords.reduce((sum, fee) => sum + fee.amount, 0),
    paid: allFeeRecords.filter(f => f.status === "paid").reduce((sum, fee) => sum + fee.amount, 0),
    pending: allFeeRecords.filter(f => f.status === "pending").reduce((sum, fee) => sum + fee.amount, 0),
    overdue: allFeeRecords.filter(f => f.status === "overdue").reduce((sum, fee) => sum + fee.amount, 0),
  };

  if (userRole === "teacher") {
    return (
      <div className="text-center py-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-yellow-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Access Restricted</h2>
          <p className="text-yellow-700">
            Fee management is only available to administrators and parents.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">
          {userRole === "parent" ? "My Child's Fees" : "Fee Management"}
        </h1>
        {userRole === "admin" && (
          <div className="flex gap-2">
            <InvoiceSeeder />
            <Button variant="outline">Generate Report</Button>
            <Button>Send Reminders</Button>
          </div>
        )}
      </div>

      {/* Fee Statistics - Admin only */}
      {userRole === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  ${feeStats.total}
                </div>
                <p className="text-sm text-gray-600 mt-1">Total Expected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  ${feeStats.paid}
                </div>
                <p className="text-sm text-gray-600 mt-1">Collected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  ${feeStats.pending}
                </div>
                <p className="text-sm text-gray-600 mt-1">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  ${feeStats.overdue}
                </div>
                <p className="text-sm text-gray-600 mt-1">Overdue</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              {["all", "1", "2", "3"].map((term) => (
                <Button
                  key={term}
                  variant={selectedTerm === term ? "default" : "outline"}
                  onClick={() => setSelectedTerm(term)}
                  size="sm"
                >
                  {term === "all" ? "All Terms" : `Term ${term}`}
                </Button>
              ))}
            </div>
            {userRole === "admin" && (
              <Input
                placeholder="Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:w-64"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fee Records */}
      <Card>
        <CardHeader>
          <CardTitle>
            {userRole === "parent" ? "Fee History" : "Fee Records"}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredFees.length} records)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {userRole === "admin" && <TableHead>Student</TableHead>}
                {userRole === "admin" && <TableHead>Grade</TableHead>}
                <TableHead>Term</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFees.map((fee, index) => (
                <TableRow key={index}>
                  {userRole === "admin" && (
                    <TableCell className="font-medium">{fee.studentName}</TableCell>
                  )}
                  {userRole === "admin" && (
                    <TableCell>Grade {fee.grade}</TableCell>
                  )}
                  <TableCell>Term {fee.term}</TableCell>
                  <TableCell className="font-medium">${fee.amount}</TableCell>
                  <TableCell>{fee.due}</TableCell>
                  <TableCell>
                    <StatusBadge status={fee.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {fee.status === "paid" ? (
                        <Button variant="outline" size="sm" disabled>
                          Receipt
                        </Button>
                      ) : (
                        <>
                          {userRole === "parent" && (
                            <Button variant="default" size="sm">
                              Pay Now
                            </Button>
                          )}
                          {userRole === "admin" && (
                            <>
                              <Button variant="outline" size="sm">
                                Mark Paid
                              </Button>
                              <Button variant="outline" size="sm">
                                Remind
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredFees.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No fee records found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedTerm !== "all" && ` in Term ${selectedTerm}`}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parent payment flow and Admin defaulters */}
      {userRole === "parent" && (
        <FeePaymentFlow studentId={students[0].id} />
      )}

      {userRole === "admin" && (
        <FeeDefaultersTable />
      )}

    </div>
  );
}