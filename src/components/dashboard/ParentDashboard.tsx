"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChildSelector from "@/components/ui/ChildSelector";
import { StatusBadge } from "@/components/ui/StatusBadge";
import AttendanceCalendar from "@/components/ui/AttendanceCalendar";
import { students } from "@/lib/mockData";
import Link from "next/link";

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(students[0].id);
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

  const child = students.find(s => s.id === selectedChild);
  
  if (!child) {
    return <div>Child not found</div>;
  }
  
  // Prepare chart data
  const chartData = child.subjects.map(subject => ({
    subject: subject.name,
    grade: subject.grade
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Parent Dashboard</h1>
        <ChildSelector 
          selected={selectedChild} 
          onChange={setSelectedChild}
        >
          {students.filter(s => s.id === selectedChild || s.id === "std-02")}
        </ChildSelector>
      </div>

      {/* Enhanced Quick Actions Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-blue-600">⚡</span>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/dashboard/fees" className="block">
              <Button className="w-full h-16 flex-col gap-1" variant="outline">
                <span className="text-xl">💳</span>
                <span className="text-xs">Pay Fees</span>
              </Button>
            </Link>
            <Link href="/dashboard/student" className="block">
              <Button className="w-full h-16 flex-col gap-1" variant="outline">
                <span className="text-xl">📄</span>
                <span className="text-xs">Report Cards</span>
              </Button>
            </Link>
            <Link href="/dashboard/messages" className="block">
              <Button className="w-full h-16 flex-col gap-1" variant="outline">
                <span className="text-xl">💬</span>
                <span className="text-xs">Messages</span>
              </Button>
            </Link>
            <Link href="/dashboard/timetable" className="block">
              <Button className="w-full h-16 flex-col gap-1" variant="outline">
                <span className="text-xl">📅</span>
                <span className="text-xs">Timetable</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-blue-600">📊</span>
              Academic Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="grade" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-green-600">💰</span>
              Fee Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {child.fees.map((fee, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">Term {fee.term}</p>
                    <p className="text-sm text-gray-500">Due: {fee.due}</p>
                  </div>
                  <StatusBadge status={fee.status} />
                </div>
              ))}
              <Link href="/dashboard/fees">
                <Button className="w-full mt-2" variant="outline">
                  <span className="mr-2">👁️</span>
                  View All Fees
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-orange-600">📢</span>
              Recent Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="font-medium">Sports Day Postponed</p>
                <p className="text-sm text-gray-500">Due to weather conditions...</p>
                <p className="text-xs text-gray-400 mt-1">Oct 5, 2023</p>
              </div>
              <Link href="/dashboard/announcements">
                <Button variant="outline" className="w-full">
                  <span className="mr-2">📋</span>
                  View All Announcements
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card id="report-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-purple-600">📊</span>
            Attendance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AttendanceCalendar records={child.attendance} />
        </CardContent>
      </Card>
    </div>
  );
}