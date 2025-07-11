"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DateTimePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [time, setTime] = React.useState<string>("00:00:00");

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

  // Combine date + time
  const updateCombinedDateTime = (date: Date | undefined, timeStr: string) => {
    if (!date || !timeStr) return;

    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours);
    combined.setMinutes(minutes);
    combined.setSeconds(seconds || 0);

    onChange(combined);
  };

  return (
    <div className="flex gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker"
            className="w-32 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>

      <Input
        type="time"
        step="1"
        value={time}
        onChange={handleTimeChange}
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  );
}
