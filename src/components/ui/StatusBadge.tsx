import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  size?: "default" | "xs";
  className?: string;
}

export function StatusBadge({ status, size = "default", className }: StatusBadgeProps) {
  const statusConfig: Record<string, { text: string; color: string }> = {
    paid: { text: "Paid", color: "bg-green-100 text-green-800" },
    due: { text: "Due", color: "bg-yellow-100 text-yellow-800" },
    overdue: { text: "Overdue", color: "bg-red-100 text-red-800" },
    pending: { text: "Pending", color: "bg-gray-100 text-gray-800" },
    present: { text: "Present", color: "bg-green-100 text-green-800" },
    absent: { text: "Absent", color: "bg-red-100 text-red-800" },
    excellent: { text: "Excellent", color: "bg-green-100 text-green-800" },
    good: { text: "Good", color: "bg-blue-100 text-blue-800" },
    "needs-improvement": { text: "Needs Improvement", color: "bg-yellow-100 text-yellow-800" },
  };

  const config = statusConfig[status] || { text: status, color: "bg-gray-100 text-gray-800" };
  
  const sizeClasses = {
    default: "px-2.5 py-0.5 text-xs",
    xs: "px-1.5 py-0.5 text-[0.6rem]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        config.color,
        sizeClasses[size],
        className
      )}
    >
      {config.text}
    </span>
  );
}