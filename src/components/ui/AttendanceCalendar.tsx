import { format, eachDayOfInterval, startOfMonth, endOfMonth, getDay } from "date-fns";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface AttendanceCalendarProps {
  records: Record<string, string>;
}

export default function AttendanceCalendar({ records }: AttendanceCalendarProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const allDaysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Filter out weekends (Saturday = 6, Sunday = 0)
  const weekdaysInMonth = allDaysInMonth.filter(day => {
    const dayOfWeek = getDay(day);
    return dayOfWeek !== 0 && dayOfWeek !== 6; // Exclude Sunday (0) and Saturday (6)
  });
  
  const getStatus = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return records[dateString] || "pending";
  };

  return (
    <div className="mt-4">
      <div className="text-center font-medium mb-2">
        {format(today, "MMMM yyyy")} - Weekdays Only
      </div>
      <div className="grid grid-cols-5 gap-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day}
          </div>
        ))}
        
        {weekdaysInMonth.map((day) => {
          const status = getStatus(day);
          const isToday = format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
          
          return (
            <div 
              key={day.toString()}
              className={`h-10 flex items-center justify-center rounded ${
                isToday ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                <span className={`text-xs ${isToday ? "font-bold text-blue-600" : ""}`}>
                  {format(day, "d")}
                </span>
                <StatusBadge 
                  status={status} 
                  size="xs" 
                  className="mt-0.5" 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}