"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { users, students, Student } from "@/lib/mockData";

export default function StudentsPage() {
  const [userRole, setUserRole] = useState("parent");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") || "parent";
    setUserRole(role);
  }, []);

  // Get user-specific students based on role
  const getStudentsForUser = () => {
    if (userRole === "parent") {
      // Parents only see their own children
      const parentUser = users.parent;
      return students.filter(student => 
        parentUser.children.some(child => child.id === student.id)
      );
    } else if (userRole === "teacher") {
      // Teachers see students in their classes
      const teacherUser = users.teacher;
      return students.filter(student => 
        teacherUser.classes?.some(className => student.grade === className)
      );
    } else {
      // Admins see all students
      return students;
    }
  };

  const userStudents = getStudentsForUser();
  const grades = Array.from(new Set(userStudents.map(s => s.grade))).sort();

  // Filter and sort students
  const filteredStudents = userStudents
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.grade.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
      return matchesSearch && matchesGrade;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "grade") return a.grade.localeCompare(b.grade);
      if (sortBy === "performance") {
        const avgA = a.subjects.reduce((sum, sub) => sum + sub.grade, 0) / a.subjects.length;
        const avgB = b.subjects.reduce((sum, sub) => sum + sub.grade, 0) / b.subjects.length;
        return avgB - avgA;
      }
      return 0;
    });

  const getAverageGrade = (student: Student) => {
    const total = student.subjects.reduce((sum: number, subject) => sum + subject.grade, 0);
    return Math.round(total / student.subjects.length);
  };

  const getPerformanceStatus = (avgGrade: number) => {
    if (avgGrade >= 75) return "excellent";
    if (avgGrade >= 50) return "good";
    return "needs-improvement";
  };

  const getPageTitle = () => {
    switch (userRole) {
      case "parent": return "My Children";
      case "teacher": return "My Students";
      case "admin": return "All Students";
      default: return "Students";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
        <div className="flex gap-2">
          {userRole === "admin" && (
            <>
              <Button variant="outline">Import Students</Button>
              <Button>Add Student</Button>
            </>
          )}
          {userRole === "teacher" && (
            <Button variant="outline">Export Class List</Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {filteredStudents.length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Total Students</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {filteredStudents.filter(s => getAverageGrade(s) >= 75).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Excellent Performance</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {filteredStudents.filter(s => {
                  const avg = getAverageGrade(s);
                  return avg >= 50 && avg < 75;
                }).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Good Performance</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {filteredStudents.filter(s => getAverageGrade(s) < 50).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Need Support</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-64"
            />
            
            <div className="flex gap-2">
              <Button
                variant={selectedGrade === "all" ? "default" : "outline"}
                onClick={() => setSelectedGrade("all")}
                size="sm"
              >
                All Grades
              </Button>
              {grades.map((grade) => (
                <Button
                  key={grade}
                  variant={selectedGrade === grade ? "default" : "outline"}
                  onClick={() => setSelectedGrade(grade)}
                  size="sm"
                >
                  Grade {grade}
                </Button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="grade">Sort by Grade</option>
              <option value="performance">Sort by Performance</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const avgGrade = getAverageGrade(student);
          const performanceStatus = getPerformanceStatus(avgGrade);
          
          return (
            <Card key={student.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-gray-400 text-sm">📚</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      Grade {student.grade}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Grade:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{avgGrade}%</span>
                      <StatusBadge status={performanceStatus} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subjects:</span>
                    <span className="text-sm font-medium">{student.subjects.length}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fee Status:</span>
                    <StatusBadge 
                      status={student.fees.some(f => f.status === "overdue") ? "overdue" : 
                             student.fees.some(f => f.status === "pending") ? "pending" : "paid"} 
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Link href={`/dashboard/student/${student.id}`} className="flex-1">
                    <Button variant="default" className="w-full" size="sm">
                      View Profile
                    </Button>
                  </Link>
                  {userRole !== "parent" && (
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-16">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">No students found</h3>
              <p className="text-sm">
                {searchTerm 
                  ? `No students match "${searchTerm}"` 
                  : selectedGrade !== "all"
                    ? `No students in Grade ${selectedGrade}`
                    : "No students available"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}