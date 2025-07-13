"use client";
import { Input } from "@/components/ui/input";

type TimeInputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function TimeInput({
  id,
  placeholder = "00:00:00",
  value,
  onChange,
  disabled,
}: TimeInputProps) {
  return (
    <Input
      id={id}
      type="time"
      step="1"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-48 bg-background appearance-none"
    />
  );
}
