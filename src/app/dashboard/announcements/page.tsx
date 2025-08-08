"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { StaffManager } from "@/components/ui/StaffManager";
import { SchoolCalendarEditor } from "@/components/ui/SchoolCalendarEditor";

export default function AnnouncementsPage() {
  const [userRole, setUserRole] = useState("parent");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const role = sessionStorage.getItem('userRole') || 'parent';
    setUserRole(role);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Announcements</h1>
        {userRole === 'admin' && (
          <div className="flex gap-2">
            <a href="#staff"><Button variant="outline">Staff Manager</Button></a>
            <a href="#calendar"><Button variant="outline">Calendar Editor</Button></a>
          </div>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Latest Notices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">Demo notices appear on dashboards.</div>
        </CardContent>
      </Card>

      {userRole === 'admin' && (
        <>
          <div id="staff">
            <StaffManager />
          </div>
          <div id="calendar">
            <SchoolCalendarEditor />
          </div>
        </>
      )}
    </div>
  );
}