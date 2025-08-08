"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { students } from "@/lib/mockData";
import Link from "next/link";
import { 
  Zap, 
  ClipboardList, 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  Users, 
  FileText, 
  Megaphone, 
  Eye,
  Settings
} from "lucide-react";

export default function TeacherDashboard() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const myStudents = students.filter(s => s.grade === "4A" || s.grade === "4B");
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <Button className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {/* Enhanced Quick Actions Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Teaching Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-1">
              <ClipboardList className="h-6 w-6" />
              <span className="text-xs">Take Attendance</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs">Grade Assignments</span>
            </Button>
            <Link href="/dashboard/messages" className="block">
              <Button variant="outline" className="w-full h-16 flex-col gap-1">
                <MessageSquare className="h-6 w-6" />
                <span className="text-xs">Send Message</span>
              </Button>
            </Link>
            <Link href="/dashboard/timetable" className="block">
              <Button variant="outline" className="w-full h-16 flex-col gap-1">
                <Calendar className="h-6 w-6" />
                <span className="text-xs">My Schedule</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              My Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">4A</span>
                <span className="text-sm text-gray-500">24 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">4B</span>
                <span className="text-sm text-gray-500">22 students</span>
              </div>
              <Link href="/dashboard/classes">
                <Button variant="outline" className="w-full mt-2">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Classes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Math Test 1</p>
                  <p className="text-sm text-gray-500">Due: Oct 15, 2023</p>
                </div>
                <StatusBadge status="pending" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Science Project</p>
                  <p className="text-sm text-gray-500">Due: Oct 20, 2023</p>
                </div>
                <StatusBadge status="pending" />
              </div>
              <Button className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                View All Assignments
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-purple-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <ClipboardList className="mr-2 h-4 w-4" />
                Take Attendance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Grade Assignments
              </Button>
              <Link href="/dashboard/messages">
                <Button variant="outline" className="w-full justify-start">
                  <Megaphone className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Class Roster
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Math</TableHead>
                <TableHead>Science</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    {student.subjects.find(s => s.name === "Mathematics")?.grade || '-'}%
                  </TableCell>
                  <TableCell>
                    {student.subjects.find(s => s.name === "Science")?.grade || '-'}%
                  </TableCell>
                  <TableCell>
                    <StatusBadge 
                      status={student.attendance["2023-10-03"] || "pending"} 
                      size="xs"
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/student/${student.id}`}>
                      <Button variant="link" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        View Profile
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 