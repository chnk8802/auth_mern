"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateField } from "@/lib/form-generator/types/field-types";

type DateInputProps = {
  field: DateField;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export function DateInput({ field, value, onChange }: DateInputProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        required={field.required}
        value={value ? value.toISOString() : ""}
        onChange={() => {}}
        style={{
          position: "absolute",
          opacity: 0,
          height: 0,
          pointerEvents: "none",
        }}
        tabIndex={-1}
        autoComplete="off"
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={field.id}
            disabled={field.disabled}
            className="sm:w-64 sm:min-w-64 w-full justify-between font-normal"
          >
            {value ? value.toLocaleDateString() : field.placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
