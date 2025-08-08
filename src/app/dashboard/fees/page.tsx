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
import BackButton from "@/components/ui/BackButton";
import { ChevronLeft, ChevronRight, Search, FileText, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";

export default function FeesPage() {
  const [userRole, setUserRole] = useState("parent");
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") || "parent";
    setUserRole(role);
  }, []);

  // Mock fee data for different scenarios with years
  const allFeeRecords = students.flatMap(student => 
    student.fees.map(fee => ({
      studentId: student.id,
      studentName: student.name,
      grade: student.grade,
      year: 2023, // Mock year
      ...fee
    }))
  );

  // Group fees by year
  const feesByYear = allFeeRecords.reduce((acc, fee) => {
    const year = fee.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(fee);
    return acc;
  }, {} as Record<number, typeof allFeeRecords>);

  const filteredFees = allFeeRecords.filter(fee => {
    const matchesTerm = selectedTerm === "all" || fee.term.toString() === selectedTerm;
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTerm && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFees = filteredFees.slice(startIndex, endIndex);

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
          <div className="mt-4">
            <BackButton href="/dashboard" label="Back to Dashboard" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header with Back Navigation */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <BackButton href="/dashboard" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {userRole === "parent" ? "My Child's Fees" : "Fee Management"}
            </h1>
            <p className="text-gray-600 mt-1">
              {userRole === "parent" 
                ? "View and manage your child's school fees" 
                : "Monitor and manage all student fee payments"
              }
            </p>
          </div>
        </div>
        
        {userRole === "admin" && (
          <div className="flex gap-2">
            <InvoiceSeeder />
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Send Reminders
            </Button>
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
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Filter Fees
          </CardTitle>
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search student..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md:w-64 pl-10"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fee Records Grouped by Year */}
      <div className="space-y-6">
        {Object.entries(feesByYear)
          .sort(([a], [b]) => Number(b) - Number(a)) // Sort years descending
          .map(([year, yearFees]) => {
            const filteredYearFees = yearFees.filter(fee => {
              const matchesTerm = selectedTerm === "all" || fee.term.toString() === selectedTerm;
              const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase());
              return matchesTerm && matchesSearch;
            });

            if (filteredYearFees.length === 0) return null;

            return (
              <Card key={year}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    {year} Fee History
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({filteredYearFees.length} records)
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
                      {filteredYearFees.map((fee, index) => (
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
                                  <FileText className="mr-1 h-3 w-3" />
                                  Receipt
                                </Button>
                              ) : (
                                <>
                                  {userRole === "parent" && (
                                    <Button variant="default" size="sm">
                                      <DollarSign className="mr-1 h-3 w-3" />
                                      Pay Now
                                    </Button>
                                  )}
                                  {userRole === "admin" && (
                                    <>
                                      <Button variant="outline" size="sm">
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Mark Paid
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <AlertTriangle className="mr-1 h-3 w-3" />
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
                </CardContent>
              </Card>
            );
          })}
      </div>

      {/* Pagination */}
      {filteredFees.length > itemsPerPage && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredFees.length)} of {filteredFees.length} records
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredFees.length === 0 && (
        <Card>
          <CardContent className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">📭</div>
            <p>No fee records found</p>
            {searchTerm && <p>for "{searchTerm}"</p>}
            {selectedTerm !== "all" && <p>in Term {selectedTerm}</p>}
          </CardContent>
        </Card>
      )}

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