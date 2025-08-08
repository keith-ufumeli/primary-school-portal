"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

export default function AdminDashboard() {
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

  const data = [
    { name: 'Grade 1', students: 45 },
    { name: 'Grade 2', students: 52 },
    { name: 'Grade 3', students: 48 },
    { name: 'Grade 4', students: 46 },
    { name: 'Grade 5', students: 50 },
    { name: 'Grade 6', students: 55 },
    { name: 'Grade 7', students: 60 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button className="flex items-center gap-2">
          <span>📊</span>
          Generate Report
        </Button>
      </div>

      {/* Enhanced Quick Actions Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-blue-600">⚡</span>
            Administrative Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/dashboard/announcements" className="block">
              <Button variant="outline" className="w-full h-16 flex-col gap-1">
                <span className="text-xl">👥</span>
                <span className="text-xs">Staff Management</span>
              </Button>
            </Link>
            <Link href="/dashboard/fees" className="block">
              <Button variant="outline" className="w-full h-16 flex-col gap-1">
                <span className="text-xl">💰</span>
                <span className="text-xs">Fee Defaulters</span>
              </Button>
            </Link>
            <Link href="/dashboard/announcements" className="block">
              <Button variant="outline" className="w-full h-16 flex-col gap-1">
                <span className="text-xl">📅</span>
                <span className="text-xs">School Calendar</span>
              </Button>
            </Link>
            <Link href="/dashboard/announcements" className="block">
              <Button variant="outline" className="w-full h-16 flex-col gap-1">
                <span className="text-xl">📢</span>
                <span className="text-xs">Announcements</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-green-600">👥</span>
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">356</div>
            <p className="text-sm text-gray-500">+12 from last term</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-blue-600">👨‍🏫</span>
              Teaching Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-gray-500">3 vacancies</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="text-purple-600">💰</span>
              Fee Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-sm text-gray-500">of Term 1 fees collected</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-orange-600">📊</span>
            Enrollment by Grade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-green-600">📈</span>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="font-medium">New student registration</p>
                <p className="text-sm text-gray-500">Tinashe Moyo - Grade 2B</p>
                <p className="text-xs text-gray-400 mt-1">Today, 10:45 AM</p>
              </div>
              <Button variant="outline" className="w-full">
                <span className="mr-2">👁️</span>
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-blue-600">⚙️</span>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard/announcements">
                <Button variant="outline" className="w-full">
                  <span className="mr-2">👥</span>
                  Add Staff
                </Button>
              </Link>
              <Link href="/dashboard/announcements">
                <Button variant="outline" className="w-full">
                  <span className="mr-2">📢</span>
                  Create Notice
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <span className="mr-2">📊</span>
                Generate Reports
              </Button>
              <Button variant="outline" className="w-full">
                <span className="mr-2">⚙️</span>
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}