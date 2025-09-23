"use client";

import { useEffect, useState } from "react";
import { fetchLookupOptions } from "@/lib/form-generator/core/lookupOptionsFetcher";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import type { LookupField } from "@/lib/form-generator/types/field-types";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import pluralize from "pluralize";

type Props = {
  field: LookupField;
  value: string;
  onChange: (val: string | number | null) => void;
};

export function LookupInput({ field, value, onChange }: Props) {
  const [options, setOptions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadOptions() {
      try {
        const res = await fetchLookupOptions({
          module: field.module,
          displayField: field.displayField,
          criteria: field.criteria,
          search,
        });

        setOptions(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch lookup data:", error);
      }
    }

    loadOptions();
  }, [field.module, field.displayField, field.criteria, search]);

  const selectedLabel = options.find((item) => item.value === value)?.label;

  return (
    <div className="space-y-1">
      {/* hidden input to preserve form validation */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={() => {}}
        required={field.required}
        style={{
          position: "absolute",
          opacity: 0,
          height: 0,
          pointerEvents: "none",
        }}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between overflow-hidden relative"
            disabled={field.disabled}
          >
            <span className="truncate">
              {selectedLabel || field.placeholder || "Select"}
            </span>

            {/* Show clear button if a value is selected */}
            {value && (
              <span
                className="absolute right-2 flex items-center"
                onClick={(e) => {
                  e.stopPropagation(); // prevent popover opening
                  e.preventDefault(); // prevent triggering PopoverTrigger
                  onChange(null);
                }}
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer" />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[280px] p-2" align="start">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />

          {/* Scrollable list */}
          <ScrollArea className="h-60 flex-1">
            <div className="space-y-1">
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
            </div>
          </ScrollArea>

          {/* Fixed footer button */}
          <div className="pt-2 border-t mt-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate(`/dashboard/${pluralize(field.module)}/new`);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
