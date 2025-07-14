"use client";

import { useEffect, useState } from "react";
import { fetchLookupData } from "@/lib/form-generator/api/lookupApi";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LookupField } from "@/lib/form-generator/types/field-types";

type Props = {
  field: LookupField;
  value: string;
  onChange: (val: string | number) => void;
  disabled?: boolean;
};

export function LookupInput({ field, value, onChange, disabled }: Props) {
  const [options, setOptions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
  async function loadOptions() {
    try {
      const res = await fetchLookupData(field.module);
      let fetchedOptions = res.data || [];

      const hasSelected = fetchedOptions.some((item) => item._id === value);

      // If not, optionally fetch the selected value individually and add it
      if (value && !hasSelected) {
        const selected = await fetchLookupData(field.module, value); // assume this fetches by ID if second param is used
        if (selected?.data) {
          fetchedOptions = [...fetchedOptions, selected.data];
        }
      }

      setOptions([{ id: "", [field.displayField]: "None" }, ...fetchedOptions]);
    } catch (error) {
      console.error("Failed to fetch lookup data:", error);
    }
  }

  loadOptions();
}, [field.module, value]);


  const filtered = options.filter((item) =>
  item._id === "" || item[field.displayField]?.toLowerCase().includes(search.toLowerCase())
);

  const selectedLabel = options.find((item) => item._id === value)?.[
    field.displayField
  ];

  return (
    <div className="space-y-1">
      {/* <Label htmlFor={field.id}>{field.label}</Label> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            disabled={disabled}
          >
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
            {filtered.map((item) => (
              <div
                key={item._id}
                className="px-3 py-2 hover:bg-muted cursor-pointer rounded-md"
                onClick={() => {
                  onChange(item._id);
                  setOpen(false);
                }}
              >
                {item[field.displayField]}
              </div>
            ))}
            {filtered.length === 0 && (
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
