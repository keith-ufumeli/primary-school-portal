"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReportCard, listReportCards } from "@/lib/mockApi";
import { students } from "@/lib/mockData";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { Button } from "./button";
import { ReportCard } from "./ReportCard";

export function ParentReportCardViewer({ studentId }: { studentId: string }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["reportCards", studentId], queryFn: () => listReportCards(studentId) });
  const createMutation = useMutation({
    mutationFn: createReportCard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reportCards", studentId] }),
  });

  // Clear existing report cards for this student (for testing)
  const clearExistingCards = () => {
    const existing = JSON.parse(localStorage.getItem("psp_report_cards") || "[]");
    const filtered = existing.filter((card: any) => card.studentId !== studentId);
    localStorage.setItem("psp_report_cards", JSON.stringify(filtered));
    queryClient.invalidateQueries({ queryKey: ["reportCards", studentId] });
  };

  // Update existing report cards with missing teacher data
  const updateExistingCards = () => {
    const existing = JSON.parse(localStorage.getItem("psp_report_cards") || "[]");
    const updated = existing.map((card: any) => {
      if (card.studentId === studentId && !card.teacher) {
        const s = students.find((x) => x.id === studentId);
        const teacher = s?.subjects[0]?.teacher || "Class Teacher";
        console.log(`Updating existing card for ${s?.name} with teacher: ${teacher}`);
        return { ...card, teacher };
      }
      return card;
    });
    localStorage.setItem("psp_report_cards", JSON.stringify(updated));
    queryClient.invalidateQueries({ queryKey: ["reportCards", studentId] });
  };

  const onSeed = async () => {
    const s = students.find((x) => x.id === studentId) || students[0];
    if (!s) return;

    // Get the teacher from the student's existing subject data
    const teacher = s.subjects[0]?.teacher || "Class Teacher";
    console.log(`Student grade: ${s.grade}, Using teacher: ${teacher}`);

    // Zimbabwe primary school subjects
    const subjects = [
      "English", "Mathematics", "Science", "Heritage Studies", 
      "Physical Education", "Art", "Music", "Shona"
    ];

    const reportCardData = {
      studentId: s.id,
      studentName: s.name,
      gradeLevel: s.grade,
      dateOfBirth: "2015-03-15", // Mock DOB
      teacher: teacher,
      term: 3 as const,
      year: new Date().getFullYear(),
      overallComment: "Well done this term. Keep improving in English and Mathematics. Shows good leadership qualities in group activities.",
      rows: subjects.map(subject => {
        const existingSubject = s.subjects.find(subj => subj.name === subject);
        const grade = existingSubject?.grade || Math.floor(Math.random() * 20) + 75;
        return {
          subject,
          grade,
          teacher: teacher,
          comment: grade >= 80 ? "Excellent performance" : grade >= 70 ? "Good performance" : "Needs improvement",
          improvementNeeded: grade < 70
        };
      }),
    };

    console.log("Creating report card with data:", reportCardData);
    console.log("Teacher field value:", reportCardData.teacher);

    await createMutation.mutateAsync(reportCardData);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Report Card</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  const latest = (data || []).slice().sort((a, b) => (a.year === b.year ? a.term - b.term : a.year - b.year)).pop();

  if (!latest) {
    return (
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>School Report Form</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearExistingCards}>Clear Existing</Button>
            <Button onClick={onSeed}>Generate Demo Report</Button>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">No report card found. Generate a demo report to preview the Zimbabwe school template.</CardContent>
      </Card>
    );
  }

  // Check if the existing card has teacher data
  const hasTeacherData = latest.teacher && latest.teacher !== "Class Teacher";

  return (
    <div className="space-y-4">
      {!hasTeacherData && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Update Existing Report</CardTitle>
            <Button variant="outline" onClick={updateExistingCards}>Update with Teacher Data</Button>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            This report card was generated before teacher data was added. Click "Update with Teacher Data" to add the teacher name.
          </CardContent>
        </Card>
      )}
      <ReportCard data={latest} />
    </div>
  );
} 