"use client";

import { useEffect, useState } from "react";
import { fetchLookupOptions } from "@/lib/form-generator/core/lookupOptionsFetcher";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import type { LookupField } from "@/lib/form-generator/types/field-types";
import { set } from "lodash";

type Props = {
  field: LookupField;
  value: string;
  onChange: (val: string | number) => void;
  disabled?: boolean;
  required?: boolean;
  module: string;
  displayField: string;
  criteria?: string;
};

export function LookupInput({field, value, onChange, disabled, required, module, displayField, criteria }: Props) {
  const [options, setOptions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      try {
        const res = await fetchLookupOptions({module, displayField, criteria, search});
          setOptions(Array.isArray(res) ? res : []); // ✅ ensure it's always an array
      } catch (error) {
        console.error("Failed to fetch lookup data:", error);
      }
    }

    loadOptions();
  }, [module, displayField, criteria, search]);

  const selectedLabel = options.find((item) => item.value === value)?.label;

  return (
    <div className="space-y-1">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={() => {}}
        required={required}
        style={{ position: "absolute", opacity: 0, height: 0, pointerEvents: "none" }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between" disabled={disabled}>
            {selectedLabel || field.placeholder || "Select"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[280px] p-2" align="start">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
          <ScrollArea className="max-h-60">
            {options.map((item) => (
              <div
                key={item.value}
                className="px-3 py-2 hover:bg-muted cursor-pointer rounded-md"
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}
            {options.length === 0 && (
              <div className="text-muted-foreground text-sm px-3 py-2">
                No results found
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}