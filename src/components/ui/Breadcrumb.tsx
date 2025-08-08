"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, GraduationCap, Users, Calendar, Megaphone, MessageSquare, CreditCard, User } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const getBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];
  
  // Always start with Dashboard
  items.push({
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />
  });

  if (segments.length === 1) {
    return items; // We're on the main dashboard
  }

  // Map route segments to readable labels
  const routeLabels: Record<string, string> = {
    "student": "Students",
    "classes": "Classes", 
    "timetable": "Timetable",
    "announcements": "Announcements",
    "messages": "Messages",
    "fees": "Fees"
  };

  const routeIcons: Record<string, React.ReactNode> = {
    "student": <GraduationCap className="h-4 w-4" />,
    "classes": <Users className="h-4 w-4" />,
    "timetable": <Calendar className="h-4 w-4" />, 
    "announcements": <Megaphone className="h-4 w-4" />,
    "messages": <MessageSquare className="h-4 w-4" />,
    "fees": <CreditCard className="h-4 w-4" />
  };

  let currentPath = "/dashboard";
  
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    
    // Handle dynamic routes (like student/[id])
    if (segment.match(/^[a-f0-9-]+$/)) {
      // This is likely a student ID or similar
      items.push({
        label: "Student Details",
        href: currentPath,
        icon: <User className="h-4 w-4" />
      });
    } else {
      items.push({
        label: routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        icon: routeIcons[segment] || <Home className="h-4 w-4" />
      });
    }
  }

  return items;
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const router = useRouter();
  const items = getBreadcrumbItems(pathname);

  // Don't show breadcrumb on main dashboard
  if (items.length === 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronLeft className="h-4 w-4 mx-2 text-gray-400" />
          )}
          
          {index === items.length - 1 ? (
            // Current page - not clickable
            <span className="flex items-center gap-1 font-medium text-gray-900">
              {item.icon && item.icon}
              {item.label}
            </span>
          ) : (
            // Previous pages - clickable
            <Link href={item.href}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 h-auto p-1 text-gray-600 hover:text-gray-900"
              >
                {item.icon && item.icon}
                {item.label}
              </Button>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
} 