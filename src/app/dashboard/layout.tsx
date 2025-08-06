"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { getUserData } from "@/lib/mockData";
import { useMainLoader } from "@/components/ui/MainLoader";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState("parent");
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);
  const { showLoader, hideLoader } = useMainLoader();
  
  useEffect(() => {
    setMounted(true);
    const role = sessionStorage.getItem("userRole") || "parent";
    const user = sessionStorage.getItem("username") || "";
    setUserRole(role);
    setUsername(user);
  }, []);

  useEffect(() => {
    if (!mounted) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [mounted, showLoader, hideLoader]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  const user = getUserData(username);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      
      {/* Main content area with responsive margin and proper spacing */}
      <div className="transition-all duration-300 pl-0 md:pl-16">
        <div className="pt-16 md:pt-4">
          <Header user={user} />
        </div>
        <main className="p-4 md:p-6 min-h-screen overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}