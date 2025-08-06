import { Button } from "@/components/ui/button";

export default function RoleSwitcher({ role, setRole }) {
  const roles = [
    { id: "admin", label: "Admin" },
    { id: "teacher", label: "Teacher" },
    { id: "parent", label: "Parent" },
  ];

  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
      {roles.map((r) => (
        <Button
          key={r.id}
          type="button"
          variant={role === r.id ? "default" : "ghost"}
          className={`flex-1 ${role === r.id ? "bg-blue-600" : ""}`}
          onClick={() => setRole(r.id)}
        >
          {r.label}
        </Button>
      ))}
    </div>
  );
}