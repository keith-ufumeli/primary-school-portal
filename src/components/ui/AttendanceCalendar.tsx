import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface AttendanceCalendarProps {
  records: Record<string, string>;
}

export default function AttendanceCalendar({ records }: AttendanceCalendarProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const getStatus = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return records[dateString] || "pending";
  };

  return (
    <div className="mt-4">
      <div className="text-center font-medium mb-2">
        {format(today, "MMMM yyyy")}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day}
          </div>
        ))}
        
        {daysInMonth.map((day) => {
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