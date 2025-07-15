"use client";
import { Input } from "@/components/ui/input";

type TimeInputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
};

export function TimeInput({
  id,
  placeholder,
  value,
  onChange,
  disabled,
  required
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
      required={required}
      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
  );
}
