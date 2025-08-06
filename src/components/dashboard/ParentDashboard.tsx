import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChildSelector from "@/components/ui/ChildSelector";
import { StatusBadge } from "@/components/ui/StatusBadge";
import AttendanceCalendar from "@/components/ui/AttendanceCalendar";
import { students } from "@/lib/mockData";

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(students[0].id);
  const child = students.find(s => s.id === selectedChild);
  
  if (!child) {
    return <div>Child not found</div>;
  }
  
  // Prepare chart data
  const chartData = child.subjects.map(subject => ({
    subject: subject.name,
    grade: subject.grade
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Parent Dashboard</h1>
        <ChildSelector 
          children={students.filter(s => s.id === selectedChild || s.id === "std-02")} 
          selected={selectedChild} 
          onChange={setSelectedChild} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="grade" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Fee Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {child.fees.map((fee, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">Term {fee.term}</p>
                    <p className="text-sm text-gray-500">Due: {fee.due}</p>
                  </div>
                  <StatusBadge status={fee.status} />
                </div>
              ))}
              <Button className="w-full mt-2">View All Fees</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <p className="font-medium">Sports Day Postponed</p>
                <p className="text-sm text-gray-500">Due to weather conditions...</p>
                <p className="text-xs text-gray-400 mt-1">Oct 5, 2023</p>
              </div>
              <Button variant="outline" className="w-full">
                View All Announcements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <AttendanceCalendar records={child.attendance} />
        </CardContent>
      </Card>
    </div>
  );
}