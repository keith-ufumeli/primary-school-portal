"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { students, Student } from "@/lib/mockData";

export default function ClassesPage() {
  const [userRole, setUserRole] = useState("parent");
  const [selectedClass, setSelectedClass] = useState("4A");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") || "parent";
    setUserRole(role);
  }, []);

  const classes = ["4A", "4B", "5A", "5B", "6A", "6B"];
  const classStudents = students.filter(student => 
    student.grade === selectedClass && 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAverageGrade = (student: Student) => {
    const total = student.subjects.reduce((sum: number, subject) => sum + subject.grade, 0);
    return Math.round(total / student.subjects.length);
  };

  if (userRole === "parent") {
    return (
      <div className="text-center py-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-yellow-600 text-4xl mb-4">=</div>
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Access Restricted</h2>
          <p className="text-yellow-700">
            Class management is only available to teachers and administrators.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Class Management</h1>
        {userRole === "admin" && (
          <Button>Add New Class</Button>
        )}
      </div>

      {/* Class Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {classes.map((className) => (
              <Button
                key={className}
                variant={selectedClass === className ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedClass(className)}
              >
                Grade {className}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {classStudents.length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Total Students</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {classStudents.filter(s => getAverageGrade(s) >= 75).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Excellent Performance</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {classStudents.filter(s => getAverageGrade(s) < 50).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Need Support</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Grade {selectedClass} Students</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            {userRole === "admin" && (
              <Button variant="outline">Add Student</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Average Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classStudents.map((student) => {
                const avgGrade = getAverageGrade(student);
                const attendanceRate = Math.floor(Math.random() * 20) + 80; // Mock attendance
                
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{avgGrade}%</TableCell>
                    <TableCell>
                      <StatusBadge 
                        status={avgGrade >= 75 ? "excellent" : 
                                avgGrade >= 50 ? "good" : "needs-improvement"} 
                      />
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-sm ${
                        attendanceRate >= 90 ? 'bg-green-100 text-green-800' :
                        attendanceRate >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {attendanceRate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        {userRole === "admin" && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {classStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm 
                ? `No students found matching "${searchTerm}"` 
                : `No students enrolled in Grade ${selectedClass}`
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}