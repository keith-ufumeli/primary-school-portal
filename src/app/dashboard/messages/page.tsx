import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      with: "Mr. Ndlovu (Grade 4A Math)",
      lastMessage: "Regarding Tendai's performance...",
      date: "2023-10-05",
      unread: true
    },
    // ... more conversations
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div 
                key={conv.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  conv.unread ? "bg-blue-50 font-medium" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between">
                  <h3 className="truncate">{conv.with}</h3>
                  {conv.unread && (
                    <span className="bg-blue-500 rounded-full h-2 w-2"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                <p className="text-xs text-gray-400 mt-1">{conv.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Message</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 h-96 mb-4 overflow-y-auto">
            {/* Message thread would go here */}
            <div className="text-center text-gray-500 py-16">
              Select a conversation to view messages
            </div>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Type your message..." />
            <Button>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}