"use client"
import { useState } from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HeaderProps {
  user: {
    name: string;
    role: string;
    classes?: string[];
  };
}

export default function Header({ user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Welcome, {user.name}</h1>
        <p className="text-gray-600 text-sm">
          {user.role === "admin" && "School Administrator"}
          {user.role === "teacher" && `Teacher (${user.classes?.join(", ") || ""})`}
          {user.role === "parent" && "Parent"}
        </p>
      </div>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
            <Avatar>
              <AvatarImage src="/avatars/admin.jpg" />
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
          <DropdownMenuItem className="flex items-center cursor-pointer text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}