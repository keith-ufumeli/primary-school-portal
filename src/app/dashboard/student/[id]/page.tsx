import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { students } from "@/lib/mockData";
import { ParentReportCardViewer } from "@/components/ui/ParentReportCardViewer";

interface StudentProfileProps {
  params: Promise<{ id: string }>;
}

export default async function StudentProfile({ params }: StudentProfileProps) {
  const { id } = await params;
  const student = students.find(s => s.id === id);
  
  if (!student) {
    return notFound();
  }

  return (
    <div>
      <div className="flex items-start mb-6">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
        <div className="ml-6">
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <div className="flex items-center mt-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Grade {student.grade}
            </span>
            <span className="ml-3 text-gray-600">Student ID: {student.id}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.teacher}</TableCell>
                    <TableCell>{subject.grade}%</TableCell>
                    <TableCell>
                      <StatusBadge 
                        status={subject.grade >= 75 ? "excellent" : 
                                subject.grade >= 50 ? "good" : "needs-improvement"} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.fees.map((fee, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <p className="font-medium">Term {fee.term}</p>
                      <p className="text-sm text-gray-500">Due: {fee.due}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-3">USD {fee.amount}</span>
                      <StatusBadge status={fee.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Behavior Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {student.behavior.map((entry, index) => (
                  <div key={index} className="flex">
                    <div className={`${entry.type === "positive" ? "bg-green-500" : "bg-red-500"} w-1 rounded mr-3`}></div>
                    <div>
                      <p className="font-medium">{entry.note}</p>
                      <p className="text-sm text-gray-500">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <ParentReportCardViewer studentId={student.id} />
      </div>
    </div>
  );
}