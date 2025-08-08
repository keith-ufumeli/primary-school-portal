"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "./button";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { ReportCard as ReportCardType } from "@/lib/mockApi";

export function ReportCard({ data }: { data: ReportCardType }) {
  const ref = useRef<HTMLDivElement>(null);

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
        <CardTitle>Report Card - Term {data.term}, {data.year}</CardTitle>
        <Button onClick={downloadPdf}>Download PDF</Button>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <div>
              <div className="text-lg font-semibold">{data.studentName}</div>
              <div className="text-gray-600 text-sm">Grade {data.gradeLevel}</div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>Term {data.term}</div>
              <div>{data.year}</div>
            </div>
          </div>

          <div className="grid grid-cols-12 font-medium text-gray-700 border-b py-2">
            <div className="col-span-6">Subject</div>
            <div className="col-span-2">Grade</div>
            <div className="col-span-4">Teacher</div>
          </div>
          {data.rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 py-2 border-b last:border-0">
              <div className="col-span-6">{row.subject}</div>
              <div className="col-span-2">{row.grade}%</div>
              <div className="col-span-4">{row.teacher}</div>
            </div>
          ))}

          <div className="mt-4">
            <div className="font-medium">Overall Comment</div>
            <div className="text-gray-700 text-sm mt-1">{data.overallComment}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 