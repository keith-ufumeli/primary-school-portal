"use client";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import ParentDashboard from "@/components/dashboard/ParentDashboard";
import { ParentReportCardViewer } from "@/components/ui/ParentReportCardViewer";
import { students } from "@/lib/mockData";

export default function DashboardPage() {
  const userRole = 
    typeof window !== 'undefined' 
      ? sessionStorage.getItem("userRole") || "parent" 
      : "parent";

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