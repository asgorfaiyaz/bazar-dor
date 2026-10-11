"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { value: string; label: string };

type SelectDropdownProps = {
  label: string;
  options: readonly Option[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function SelectDropdown({
  label,
  options,
  defaultValue,
  onValueChange,
}: SelectDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}</span>
      <Select
        items={[...options]}
        defaultValue={defaultValue}
        onValueChange={(value) => value && onValueChange?.(value)}
      >
        <SelectTrigger aria-label={label} className="h-10 min-w-48 bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
