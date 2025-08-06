"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAnnouncements } from "@/lib/mockData";
import { FileIcon } from "lucide-react";

export default function AnnouncementsPage() {
  const announcements = getAnnouncements("parent"); // Would get from session in real app
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button>New Announcement</Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{announcement.title}</h3>
                    <p className="text-gray-600 mt-1">{announcement.content}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {announcement.date}
                  </span>
                </div>
                {announcement.attachment && (
                  <div className="mt-3 flex items-center text-sm text-blue-600">
                    <FileIcon className="mr-1 h-4 w-4" />
                    {announcement.attachment}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}