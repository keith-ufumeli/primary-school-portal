"use client";
import { useEffect, useState } from "react";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import ParentDashboard from "@/components/dashboard/ParentDashboard";
import { ParentReportCardViewer } from "@/components/ui/ParentReportCardViewer";
import { students } from "@/lib/mockData";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState("parent");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const role = sessionStorage.getItem("userRole") || "parent";
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
      {userRole === "admin" && <AdminDashboard />}
      {userRole === "teacher" && <TeacherDashboard />}
      {userRole === "parent" && (
        <>
          <ParentDashboard />
          <ParentReportCardViewer studentId={students[0].id} />
        </>
      )}
    </div>
  );
}