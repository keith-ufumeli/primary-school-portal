"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "./button";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { ReportCard as ReportCardType } from "@/lib/mockApi";

export function ReportCard({ data }: { data: ReportCardType }) {
  const ref = useRef<HTMLDivElement>(null);

  // Debug logging
  console.log("ReportCard data:", data);
  console.log("Teacher name:", data.teacher);

  const downloadPdf = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`ReportCard_Term${data.term}_${data.studentName}.pdf`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CardTitle>School Report Form - Term {data.term}, {data.year}</CardTitle>
        <Button onClick={downloadPdf}>Download PDF</Button>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="bg-white p-6 rounded-lg border max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-2">School Report Form</h1>
          </div>

          {/* Student Information Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-black mb-3">Student Information</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium w-24">Name:</span>
                <div className="flex-1 border-b-2 border-gray-300 min-h-[20px] ml-2">
                  <span className="text-gray-700">{data.studentName}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Grade:</span>
                <div className="flex-1 border-b-2 border-gray-300 min-h-[20px] ml-2">
                  <span className="text-gray-700">{data.gradeLevel}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Date of Birth:</span>
                <div className="flex-1 border-b-2 border-gray-300 min-h-[20px] ml-2">
                  <span className="text-gray-700">{data.dateOfBirth || "Not specified"}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Teacher:</span>
                <div className="flex-1 border-b-2 border-gray-300 min-h-[20px] ml-2">
                  <span className="text-gray-700">{data.teacher}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Performance Section */}
          <div>
            <h2 className="text-lg font-bold text-black mb-3">Academic Performance</h2>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-purple-800 font-medium">Subject</th>
                    <th className="px-4 py-2 text-left text-purple-800 font-medium">Grade</th>
                    <th className="px-4 py-2 text-left text-purple-800 font-medium">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">{row.subject}</td>
                      <td className="px-4 py-3">
                        <div className="border-b-2 border-gray-300 min-h-[20px]">
                          <span className="text-gray-700">{row.grade}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="border-b-2 border-gray-300 min-h-[20px]">
                          <span className="text-gray-700">{row.comment || "Good performance"}</span>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overall Comment */}
          <div className="mt-6">
            <h3 className="font-medium text-black mb-2">Overall Comment</h3>
            <div className="border-2 border-gray-300 rounded p-3 min-h-[60px]">
              <span className="text-gray-700">{data.overallComment}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 