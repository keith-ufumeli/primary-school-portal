"use client"
import { useState } from "react";
import { LogOut, User as UserIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";

interface HeaderProps {
  user: {
    name: string;
    role: string;
    classes?: string[];
  };
}

export default function Header({ user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const getRoleDisplay = () => {
    switch (user.role) {
      case "admin":
        return "School Administrator";
      case "teacher":
        return `Teacher (${user.classes?.join(", ") || ""})`;
      case "parent":
        return "Parent";
      default:
        return "User";
    }
  };

  // Check if we should show back button (not on main dashboard)
  const shouldShowBackButton = pathname !== "/dashboard";

  const handleBackClick = () => {
    router.back();
  };
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Breadcrumb Navigation */}
      <div className="px-4 pt-4 pb-2">
        <Breadcrumb />
      </div>
      
      {/* Main Header Content */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {shouldShowBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          )}
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800 truncate">{user.name}</h1>
            <p className="text-gray-600 text-sm truncate">{getRoleDisplay()}</p>
          </div>
        </div>
        
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
              <Avatar>
                <AvatarImage src="/avatars/admin.svg" />
                <AvatarFallback>
                  <UserIcon className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer text-red-600"
              onClick={() => {
                sessionStorage.clear();
                router.push("/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}