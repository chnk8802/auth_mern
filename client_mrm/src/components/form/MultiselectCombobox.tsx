import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { label: string; value: string };

type MultiSelectComboboxProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

export function MultiSelectCombobox({
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled,
  required,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false);

  const toggleSelect = (val: string) => {
    const isSelected = value.includes(val);
    const updated = isSelected
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange(updated);
  };

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <div
      className={cn(
        "flex min-h-9 w-full items-center rounded-md border border-input bg-background pl-3 text-sm ring-offset-background shadow-xs bg-muted/40 dark:bg-input/30 hover:bg-input/50",
        "focus-within:ring-2 focus-within:ring-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "transition-colors placeholder:text-muted-foreground",
        selectedOptions.length > 0 && "break-words py-1"
      )}
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        required={required}
        value={value.length > 0 ? value.join(",") : ""}
        onChange={() => {}}
        style={{
          position: "absolute",
          opacity: 0,
          height: 0,
          pointerEvents: "none",
        }}
      />

      <div className="flex flex-wrap gap-1 flex-1">
        {selectedOptions.length > 0 ? (
          selectedOptions.map(({ label, value: val }) => (
            <span
              key={val}
              className="flex items-center gap-1 border rounded-md px-1 py-[1px] text-sm bg-muted"
            >
              {label}
              <div className="cursor-pointer text-muted-foreground hover:text-destructive">
                <X size={12} onClick={() => toggleSelect(val)} />
              </div>
            </span>
          ))
        ) : (
          <span>{placeholder}</span>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            type="button"
            variant="secondary"
            size="sm"
            className="border-none"
            disabled={disabled}
          >
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command className="max-h-60 overflow-y-auto">
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleSelect(option.value)}
                >
                  <div className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
