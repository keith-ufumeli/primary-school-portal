"use client";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import ParentDashboard from "@/components/dashboard/ParentDashboard";

export default function DashboardPage() {
  const userRole = 
    typeof window !== 'undefined' 
      ? sessionStorage.getItem("userRole") || "parent" 
      : "parent";

  return (
    <div>
      {userRole === "admin" && <AdminDashboard />}
      {userRole === "teacher" && <TeacherDashboard />}
      {userRole === "parent" && <ParentDashboard />}
    </div>
  );
}