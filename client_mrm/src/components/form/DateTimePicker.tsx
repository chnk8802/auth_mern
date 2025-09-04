"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/form/TimePicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateTimeField } from "@/lib/form-generator/types/field-types";
import { formatTime, toDate } from "@/lib/utils";

type DateTimePickerProps = {
  field: DateTimeField;
  value: string;
};

export function DateTimePicker({ field, value }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(value ? toDate(value) : undefined);
  const [time, setTime] = React.useState(value ? formatTime(value) : "00:00:00");

  // Handle date select
  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;
    setDate(newDate);
    setOpen(false);
    updateCombinedDateTime(newDate, time);
  };

  // Handle time select
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    updateCombinedDateTime(date, newTime);
  };

  // // Combine date + time
  const updateCombinedDateTime = (date: Date | undefined, timeStr: string) => {
    if (!date || !timeStr) return;

    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours);
    combined.setMinutes(minutes);
    combined.setSeconds(seconds || 0);
  };

  return (
    <div className="flex gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-32 justify-between font-normal"
            disabled={field.disabled}
          >
            {date ? date.toLocaleDateString("en-IN") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            timeZone="IST"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>

      <TimePicker
        field={{
          type: "time",
          id: `${field.id}-time`,
          label: field.label,
          timeFormat: field.timeFormat,
          disabled: field.disabled,
          required: field.required,
        }}
        value={time}
        onChange={(val) => handleTimeChange({ target: { value: val } } as any)}
      />
    </div>
  );
}
