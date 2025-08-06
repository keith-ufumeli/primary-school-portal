import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Student } from "@/lib/mockData";

interface ChildSelectorProps {
  children: Student[];
  selected: string;
  onChange: (value: string) => void;
}

export default function ChildSelector({ children, selected, onChange }: ChildSelectorProps) {
  return (
    <div className="flex items-center">
      <label className="mr-2 text-sm font-medium">Viewing:</label>
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select child" />
        </SelectTrigger>
        <SelectContent>
          {children.map((child) => (
            <SelectItem key={child.id} value={child.id}>
              {child.name} - {child.grade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}