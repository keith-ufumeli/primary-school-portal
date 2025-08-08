"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { StaffManager } from "@/components/ui/StaffManager";
import { SchoolCalendarEditor } from "@/components/ui/SchoolCalendarEditor";

export default function AnnouncementsPage() {
  const userRole = typeof window !== 'undefined' ? sessionStorage.getItem('userRole') || 'parent' : 'parent';

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