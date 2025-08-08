"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createReportCard, listReportCards, type ReportCard } from "@/lib/mockApi";
import { students } from "@/lib/mockData";
import { ReportCard as ReportCardComponent } from "@/components/ui/ReportCard";

export function ParentReportCardViewer({ studentId }: { studentId: string }) {
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ["reportCards", studentId],
    queryFn: () => listReportCards(studentId),
  });

  const createMutation = useMutation({
    mutationFn: createReportCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportCards", studentId] });
    },
  });

  // Clear existing report cards for this student (for testing)
  const clearExistingCards = () => {
    const existing = JSON.parse(localStorage.getItem("psp_report_cards") || "[]") as ReportCard[];
    const filtered = existing.filter((card) => card.studentId !== studentId);
    localStorage.setItem("psp_report_cards", JSON.stringify(filtered));
    queryClient.invalidateQueries({ queryKey: ["reportCards", studentId] });
  };

  // Update existing report cards with missing teacher data
  const updateExistingCards = () => {
    const existing = JSON.parse(localStorage.getItem("psp_report_cards") || "[]") as ReportCard[];
    const updated = existing.map((card) => {
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

  // Update existing report cards to include all subjects
  const updateReportCardWithAllSubjects = () => {
    const s = students.find((x) => x.id === studentId) || students[0];
    if (!s) return;

    const teacher = s.subjects[0]?.teacher || "Class Teacher";
    
    // Zimbabwe primary school subjects - comprehensive list
    const allSubjects = [
      "English", "Mathematics", "Science", "Heritage Studies", 
      "Physical Education", "Art", "Music", "Shona", "ICT"
    ];

    const existing = JSON.parse(localStorage.getItem("psp_report_cards") || "[]") as ReportCard[];
    const updated = existing.map((card) => {
      if (card.studentId === studentId) {
        // Check if card has all subjects
        const currentSubjects = card.rows.map((row) => row.subject);
        const missingSubjects = allSubjects.filter(subject => !currentSubjects.includes(subject));
        
        if (missingSubjects.length > 0) {
          console.log(`Updating card for ${s.name} with missing subjects:`, missingSubjects);
          
          // Add missing subjects to the existing rows
          const updatedRows = [...card.rows];
          missingSubjects.forEach(subject => {
            const existingSubject = s.subjects.find(subj => subj.name === subject);
            const grade = existingSubject?.grade || Math.floor(Math.random() * 20) + 75;
            updatedRows.push({
              subject,
              grade,
              teacher: teacher,
              comment: grade >= 80 ? "Excellent performance" : grade >= 70 ? "Good performance" : "Needs improvement",
              improvementNeeded: grade < 70
            });
          });
          
          return { ...card, rows: updatedRows, teacher };
        }
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

    // Zimbabwe primary school subjects - comprehensive list
    const subjects = [
      "English", "Mathematics", "Science", "Heritage Studies", 
      "Physical Education", "Art", "Music", "Shona", "ICT"
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
            This report card was generated before teacher data was added. Click &quot;Update with Teacher Data&quot; to add the teacher name.
          </CardContent>
        </Card>
      )}
      
      {/* Check if report card has all subjects */}
      {latest && (() => {
        const allSubjects = ["English", "Mathematics", "Science", "Heritage Studies", "Physical Education", "Art", "Music", "Shona", "ICT"];
        const currentSubjects = latest.rows.map((row) => row.subject);
        const missingSubjects = allSubjects.filter(subject => !currentSubjects.includes(subject));
        
        if (missingSubjects.length > 0) {
          return (
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Update Report Card Subjects</CardTitle>
                <Button variant="outline" onClick={updateReportCardWithAllSubjects}>
                  Add Missing Subjects ({missingSubjects.length})
                </Button>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                This report card is missing {missingSubjects.length} subject(s): {missingSubjects.join(", ")}. 
                Click &quot;Add Missing Subjects&quot; to include all subjects.
              </CardContent>
            </Card>
          );
        }
        return null;
      })()}
      
      <ReportCardComponent data={latest} />
    </div>
  );
} 