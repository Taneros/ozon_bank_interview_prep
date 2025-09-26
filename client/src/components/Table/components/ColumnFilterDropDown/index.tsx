import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { FC } from "react";

interface IColumnFilterDropDownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export const ColumnFilterDropDown: FC<IColumnFilterDropDownProps> = ({
  label,
  onChange,
  options,
  value,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`filter-${label.toLowerCase()}`}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full" id={`filter-${label.toLowerCase()}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All {label.toLowerCase()}s</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
