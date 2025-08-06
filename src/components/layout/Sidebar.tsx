import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Bell, Book, Calendar, MessageSquare, CreditCard } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/classes", icon: Book, label: "Classes" },
  { href: "/dashboard/announcements", icon: Bell, label: "Announcements" },
  { href: "/dashboard/timetable", icon: Calendar, label: "Timetable" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/fees", icon: CreditCard, label: "Fees" },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="w-64 bg-blue-800 text-white h-screen p-4">
      <div className="flex items-center mb-8 p-2">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        <div className="ml-3">
          <h1 className="font-bold text-xl">School Portal</h1>
          <p className="text-blue-200 text-sm">Primary Education</p>
        </div>
      </div>
      
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center p-3 rounded-lg mb-1 ${
              pathname === item.href 
                ? "bg-blue-700 font-medium" 
                : "hover:bg-blue-700/50"
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}