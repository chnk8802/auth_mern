import React from "react";
import { type FormField } from "@/lib/form-generator/types/field-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // adjust path as needed
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

interface FieldRendererProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  disabled,
}) => {
  const renderInput = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <Input
            id={field.id}
            placeholder={field.placeholder}
            disabled={disabled}
            type={field.type === "email" ? "email" : "text"}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "number":
        return (
          <Input
            id={field.id}
            placeholder={field.placeholder}
            disabled={disabled}
            type="number"
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            disabled={disabled}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "select":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                disabled={disabled}
              >
                {value
                  ? field.options.find((opt) => opt.value === value)?.label
                  : field.placeholder || "Select an option"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[280px]">
              {field.options.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onSelect={() => onChange(opt.value)}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={field.id}>{field.label}</Label>
      {renderInput()}
      {field.helpText && (
        <p className="text-xs text-muted-foreground">{field.helpText}</p>
      )}
    </div>
  );
};
