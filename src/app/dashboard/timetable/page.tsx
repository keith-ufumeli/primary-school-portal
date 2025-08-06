"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TimetableData {
  [grade: string]: {
    [day: string]: string[];
  };
}

export default function TimetablePage() {
  const [userRole, setUserRole] = useState("parent");
  const [selectedGrade, setSelectedGrade] = useState("4A");
  const [selectedView, setSelectedView] = useState("weekly");

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") || "parent";
    setUserRole(role);
  }, []);

  const timeSlots = [
    "08:00 - 08:45",
    "08:45 - 09:30", 
    "09:30 - 10:15",
    "10:15 - 10:30", // Break
    "10:30 - 11:15",
    "11:15 - 12:00",
    "12:00 - 13:00", // Lunch
    "13:00 - 13:45",
    "13:45 - 14:30",
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const timetableData: TimetableData = {
    "4A": {
      "Monday": ["Mathematics", "English", "Science", "Break", "Shona", "History", "Lunch", "Art", "Physical Education"],
      "Tuesday": ["English", "Mathematics", "Geography", "Break", "Science", "Shona", "Lunch", "Music", "Study Hall"],
      "Wednesday": ["Science", "Mathematics", "English", "Break", "Social Studies", "Shona", "Lunch", "Computer Studies", "Library"],
      "Thursday": ["Mathematics", "Science", "English", "Break", "Physical Education", "Geography", "Lunch", "Art", "Shona"],
      "Friday": ["English", "Mathematics", "Science", "Break", "Music", "History", "Lunch", "Assembly", "Free Period"],
    },
    "4B": {
      "Monday": ["English", "Mathematics", "Science", "Break", "Geography", "Shona", "Lunch", "Physical Education", "Art"],
      "Tuesday": ["Mathematics", "Science", "English", "Break", "History", "Geography", "Lunch", "Computer Studies", "Music"],
      "Wednesday": ["Science", "English", "Mathematics", "Break", "Art", "Physical Education", "Lunch", "Shona", "Study Hall"],
      "Thursday": ["Mathematics", "English", "Science", "Break", "Social Studies", "History", "Lunch", "Music", "Library"],
      "Friday": ["English", "Science", "Mathematics", "Break", "Shona", "Art", "Lunch", "Assembly", "Free Period"],
    }
  };

  const grades = Object.keys(timetableData);

  const getSubjectColor = (subject: string) => {
    const colors = {
      "Mathematics": "bg-blue-100 text-blue-800 border-blue-200",
      "English": "bg-green-100 text-green-800 border-green-200",
      "Science": "bg-purple-100 text-purple-800 border-purple-200",
      "Shona": "bg-orange-100 text-orange-800 border-orange-200",
      "Geography": "bg-teal-100 text-teal-800 border-teal-200",
      "History": "bg-amber-100 text-amber-800 border-amber-200",
      "Art": "bg-pink-100 text-pink-800 border-pink-200",
      "Music": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Physical Education": "bg-red-100 text-red-800 border-red-200",
      "Computer Studies": "bg-gray-100 text-gray-800 border-gray-200",
      "Social Studies": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Break": "bg-gray-50 text-gray-600 border-gray-200",
      "Lunch": "bg-gray-50 text-gray-600 border-gray-200",
      "Assembly": "bg-slate-100 text-slate-800 border-slate-200",
      "Study Hall": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Library": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Free Period": "bg-neutral-100 text-neutral-600 border-neutral-200",
    };
    return colors[subject as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">School Timetable</h1>
        <div className="flex gap-2">
          <Button
            variant={selectedView === "weekly" ? "default" : "outline"}
            onClick={() => setSelectedView("weekly")}
            size="sm"
          >
            Weekly View
          </Button>
          <Button
            variant={selectedView === "daily" ? "default" : "outline"}
            onClick={() => setSelectedView("daily")}
            size="sm"
          >
            Daily View
          </Button>
          {userRole === "admin" && (
            <Button variant="outline">
              Edit Timetable
            </Button>
          )}
        </div>
      </div>

      {/* Grade Selector */}
      {(userRole === "admin" || userRole === "teacher") && (
        <Card>
          <CardHeader>
            <CardTitle>Select Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {grades.map((grade) => (
                <Button
                  key={grade}
                  variant={selectedGrade === grade ? "default" : "outline"}
                  onClick={() => setSelectedGrade(grade)}
                  size="sm"
                >
                  Grade {grade}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Timetable */}
      {selectedView === "weekly" && (
        <Card>
          <CardHeader>
            <CardTitle>
              Grade {selectedGrade} - Weekly Schedule
              {userRole === "parent" && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (Your child&apos;s class)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-6 gap-2 min-w-[800px]">
                {/* Header */}
                <div className="font-semibold text-sm p-3 bg-gray-50 rounded border">
                  Time
                </div>
                {days.map((day) => (
                  <div key={day} className="font-semibold text-sm p-3 bg-gray-50 rounded border text-center">
                    {day}
                  </div>
                ))}

                {/* Time slots and subjects */}
                {timeSlots.map((timeSlot, timeIndex) => (
                  <React.Fragment key={timeSlot}>
                    <div className="text-xs p-3 bg-gray-50 rounded border font-medium text-gray-600">
                      {timeSlot}
                    </div>
                    {days.map((day) => {
                      const subject = timetableData[selectedGrade as keyof typeof timetableData]?.[day]?.[timeIndex] || "Free";
                      return (
                        <div key={`${day}-${timeIndex}`} className="p-2 border rounded">
                          <Badge 
                            className={`w-full justify-center py-2 text-xs font-medium border ${getSubjectColor(subject)}`}
                            variant="outline"
                          >
                            {subject}
                          </Badge>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily View */}
      {selectedView === "daily" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map((day) => (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timeSlots.map((timeSlot, timeIndex) => {
                    const subject = timetableData[selectedGrade as keyof typeof timetableData]?.[day]?.[timeIndex] || "Free";
                    return (
                      <div key={timeIndex} className="flex items-center gap-3">
                        <div className="text-xs font-medium text-gray-500 w-20">
                          {timeSlot.split(' - ')[0]}
                        </div>
                        <Badge 
                          className={`flex-1 justify-center py-2 text-xs font-medium border ${getSubjectColor(subject)}`}
                          variant="outline"
                        >
                          {subject}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Subject Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from(new Set(Object.values(timetableData[selectedGrade as keyof typeof timetableData] || {}).flat()))
              .filter(subject => subject !== "Break" && subject !== "Lunch")
              .map((subject) => (
                <Badge 
                  key={subject}
                  className={`justify-center py-2 text-xs font-medium border ${getSubjectColor(subject)}`}
                  variant="outline"
                >
                  {subject}
                </Badge>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for Admin */}
      {userRole === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16">
                <div className="text-center">
                  <div className="text-2xl mb-1">=�</div>
                  <div className="text-sm">Create Schedule</div>
                </div>
              </Button>
              <Button variant="outline" className="h-16">
                <div className="text-center">
                  <div className="text-2xl mb-1">=�</div>
                  <div className="text-sm">Export PDF</div>
                </div>
              </Button>
              <Button variant="outline" className="h-16">
                <div className="text-center">
                  <div className="text-2xl mb-1">=�</div>
                  <div className="text-sm">Send to Parents</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}