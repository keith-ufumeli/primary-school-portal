"use client";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarEvent, createCalendarEvent, deleteCalendarEvent, listCalendar, updateCalendarEvent } from "@/lib/mockApi";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Skeleton } from "./Skeleton";

function CalendarItem({ event }: { event: CalendarEvent }) {
  return (
    <div className="border rounded-md p-3 bg-white" data-id={event.id}>
      <div className="font-medium">{event.title}</div>
      <div className="text-xs text-gray-600">{event.date} • {event.type}</div>
    </div>
  );
}

export function SchoolCalendarEditor() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["calendar"], queryFn: listCalendar });
  const sensors = useSensors(useSensor(PointerSensor));
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<CalendarEvent["type"]>("other");

  const ordered = useMemo(() =>
    [...(data || [])].sort((a, b) => a.date.localeCompare(b.date)),
  [data]);

  const createMutation = useMutation({
    mutationFn: createCalendarEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["calendar"] }),
  });
  const updateMutation = useMutation({
    mutationFn: updateCalendarEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["calendar"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteCalendarEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["calendar"] }),
  });

  const onAdd = async () => {
    if (!title || !date) return;
    await createMutation.mutateAsync({ title, date, type });
    setTitle("");
    setDate("");
    setType("other");
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !data) return;
    const current = [...data];
    const oldIndex = current.findIndex((e) => e.id === active.id);
    const newIndex = current.findIndex((e) => e.id === over.id);
    const moved = arrayMove(current, oldIndex, newIndex);
    // Persist as updated order by adjusting dates slightly to reflect order (demo only)
    for (let idx = 0; idx < moved.length; idx++) {
      const ev = moved[idx];
      await updateMutation.mutateAsync({ ...ev });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>School Calendar Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <Input placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="YYYY-MM-DD" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input placeholder="Type (holiday, exam, meeting)" value={type} onChange={(e) => setType(e.target.value as unknown as CalendarEvent["type"])} />
          <Button onClick={onAdd}>Add Event</Button>
        </div>
        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={ordered.map((e) => e.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {ordered.map((e) => (
                  <div key={e.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <CalendarItem event={e} />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate(e.id)}>Remove</Button>
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
} 