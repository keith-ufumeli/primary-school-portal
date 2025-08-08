"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StaffManager } from "@/components/ui/StaffManager";
import { SchoolCalendarEditor } from "@/components/ui/SchoolCalendarEditor";
import BackButton from "@/components/ui/BackButton";
import { Users, Calendar, Megaphone, FileText } from "lucide-react";

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
      {/* Page Header with Back Navigation */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <BackButton href="/dashboard" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Announcements</h1>
            <p className="text-gray-600 mt-1">
              {userRole === 'admin' 
                ? "Manage school announcements and administrative tools" 
                : "View important school notices and updates"
              }
            </p>
          </div>
        </div>
        
        {userRole === 'admin' && (
          <div className="flex gap-2">
            <a href="#staff">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Staff Manager
              </Button>
            </a>
            <a href="#calendar">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar Editor
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* Announcements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-blue-600" />
            Latest Notices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium text-gray-900">Sports Day Postponed</h3>
              <p className="text-sm text-gray-600 mt-1">
                Due to weather conditions, the annual sports day has been postponed to next Friday.
              </p>
              <p className="text-xs text-gray-400 mt-2">Posted: Oct 5, 2023</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-medium text-gray-900">Parent-Teacher Meeting</h3>
              <p className="text-sm text-gray-600 mt-1">
                Parent-teacher meetings will be held on October 15th. Please check your child&apos;s schedule.
              </p>
              <p className="text-xs text-gray-400 mt-2">Posted: Oct 3, 2023</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-medium text-gray-900">Library Week</h3>
              <p className="text-sm text-gray-600 mt-1">
                This week is library week. Students are encouraged to visit the library and participate in reading activities.
              </p>
              <p className="text-xs text-gray-400 mt-2">Posted: Oct 1, 2023</p>
            </div>
            
            <div className="text-center py-4">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View All Announcements
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Tools */}
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