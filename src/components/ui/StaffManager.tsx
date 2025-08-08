"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addStaff, deleteStaff, listStaff, TeacherProfile, updateStaff } from "@/lib/mockApi";
import { Card, CardHeader, CardContent, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Skeleton } from "./Skeleton";

const StaffSchema = z.object({
  fullName: z.string().min(3),
  subject: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
});

type StaffFormValues = z.infer<typeof StaffSchema>;

export function StaffManager() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["staff"], queryFn: listStaff });
  const [editing, setEditing] = useState<TeacherProfile | null>(null);

  const form = useForm<StaffFormValues>({ resolver: zodResolver(StaffSchema), defaultValues: { fullName: "", subject: "", phone: "", email: "" } });

  const addMutation = useMutation({
    mutationFn: addStaff,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff"] }),
  });
  const updateMutation = useMutation({
    mutationFn: updateStaff,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff"] }),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, ...values });
      setEditing(null);
    } else {
      await addMutation.mutateAsync(values);
    }
    form.reset();
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Staff Management</CardTitle>
        {editing && (
          <Button variant="outline" onClick={() => { setEditing(null); form.reset(); }}>Cancel Edit</Button>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <Input placeholder="Full name" {...form.register("fullName")} />
          <Input placeholder="Subject" {...form.register("subject")} />
          <Input placeholder="Phone" {...form.register("phone")} />
          <Input placeholder="Email" type="email" {...form.register("email")} />
          <Button type="submit">{editing ? "Update" : "Add"}</Button>
        </form>

        {(form.formState.errors.fullName || form.formState.errors.email || form.formState.errors.phone || form.formState.errors.subject) && (
          <div className="text-sm text-red-600 mb-3">Please fill all fields correctly.</div>
        )}

        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data || []).map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.fullName}</TableCell>
                  <TableCell>{t.subject}</TableCell>
                  <TableCell>{t.phone}</TableCell>
                  <TableCell>{t.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditing(t); form.reset({ fullName: t.fullName, subject: t.subject, phone: t.phone, email: t.email }); }}>Edit</Button>
                      <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(t.id)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
} 