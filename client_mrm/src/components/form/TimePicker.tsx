"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TimeField } from "@/lib/form-generator/types/field-types";

type TimeSelectorProps = {
  field: TimeField;
  value?: string;
  onChange: (val: string) => void;
};

export function TimePicker({ field, value, onChange }: TimeSelectorProps) {
  const [open, setOpen] = React.useState(false);

  // split into [HH,MM,SS]
  const [hours, minutes, seconds] = (value ?? "00:00:00").split(":");
  const is12h = field.timeFormat === "12h";

  // track AM/PM for UI
  const initialPeriod: "AM" | "PM" = Number(hours) >= 12 ? "PM" : "AM";
  const [period, setPeriod] = React.useState<"AM" | "PM">(initialPeriod);

  const updatePart = (part: "h" | "m" | "s" | "p", newVal: string) => {
    let h = hours;
    let m = minutes;
    let s = seconds;
    let p = period;

    if (part === "h") h = newVal;
    if (part === "m") m = newVal;
    if (part === "s") s = newVal;
    if (part === "p") p = newVal as "AM" | "PM";

    let finalH = parseInt(h, 10);

    if (is12h) {
      if (p === "AM" && finalH === 12) finalH = 0;
      if (p === "PM" && finalH < 12) finalH += 12;
    }

    setPeriod(p);

    onChange(
      `${String(finalH).padStart(2, "0")}:${m.padStart(2, "0")}:${s.padStart(
        2,
        "0"
      )}`
    );
  };

  const range = (n: number, start = 0) =>
    Array.from({ length: n }, (_, i) => String(i + start).padStart(2, "0"));

  const hourOptions = is12h ? range(12, 1) : range(24);

  const formattedValue = React.useMemo(() => {
    if (!value) return "Select time";

    let [h, m, s] = value.split(":");
    let H = parseInt(h, 10);

    if (is12h) {
      const p = H >= 12 ? "PM" : "AM";
      let displayH = H % 12 || 12;
      return `${String(displayH).padStart(2, "0")}:${m}:${s} ${p}`;
    }
    return value;
  }, [value, is12h]);

  // helper to render a scrollable command list
  const ScrollableList = ({
    options,
    selected,
    onSelect,
    label,
  }: {
    options: string[];
    selected: string;
    onSelect: (val: string) => void;
    label: string;
  }) => (
    <div className="inline-flex flex-col rounded border w-auto min-w-[3.5rem]">
      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground sticky top-0 bg-background z-10">
        {label}
      </div>
      <ScrollArea className="h-44">
        <Command>
          <CommandGroup>
            {options.map((opt) => {
              const isSelected = opt === selected;
              const ref = React.useRef<HTMLDivElement>(null);

              React.useEffect(() => {
                if (open && isSelected) {
                  ref.current?.scrollIntoView({ block: "center" });
                }
              }, [open, isSelected]);

              return (
                <CommandItem
                  key={opt}
                  ref={ref}
                  onSelect={() => onSelect(opt)}
                  className={isSelected ? "bg-accent text-accent-foreground" : ""}
                >
                  {opt}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        name={field.id}
        value={value ?? ""}
        required={field.required}
        readOnly
        hidden
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-40 justify-between font-normal"
            disabled={field.disabled}
          >
            {formattedValue}
            <Clock className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="inline-flex gap-2 p-2 w-auto"
          align="start"
          side="bottom"
        >
          <ScrollableList
            label="Hours"
            options={hourOptions}
            selected={is12h ? String((parseInt(hours, 10) % 12) || 12).padStart(2, "0") : hours}
            onSelect={(h) => updatePart("h", h)}
          />

          <ScrollableList
            label="Minutes"
            options={range(60)}
            selected={minutes}
            onSelect={(m) => updatePart("m", m)}
          />

          <ScrollableList
            label="Seconds"
            options={range(60)}
            selected={seconds}
            onSelect={(s) => updatePart("s", s)}
          />

          {is12h && (
            <ScrollableList
              label="Period"
              options={["AM", "PM"]}
              selected={period}
              onSelect={(p) => updatePart("p", p)}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
