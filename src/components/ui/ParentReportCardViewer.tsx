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

  const onSeed = async () => {
    const s = students.find((x) => x.id === studentId) || students[0];
    if (!s) return;
    await createMutation.mutateAsync({
      studentId: s.id,
      studentName: s.name,
      gradeLevel: s.grade,
      term: 3,
      year: new Date().getFullYear(),
      overallComment: "Well done this term. Keep improving in English.",
      rows: s.subjects.map((subj) => ({ subject: subj.name, grade: subj.grade, teacher: subj.teacher })),
    });
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
          <CardTitle>Report Card</CardTitle>
          <Button onClick={onSeed}>Generate Demo Card</Button>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">No report card found. Generate a demo card to preview.</CardContent>
      </Card>
    );
  }

  return <ReportCard data={latest} />;
} 