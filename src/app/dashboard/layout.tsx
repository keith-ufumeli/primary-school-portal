import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { getUserData } from "@/lib/mockData";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Get user role from session storage
  const userRole = 
    typeof window !== 'undefined' 
      ? sessionStorage.getItem("userRole") || "parent" 
      : "parent";
  
  const user = getUserData(userRole);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}