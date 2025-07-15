"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { FieldRenderer } from "@/lib/form-generator/components/FieldRendrer";
import { type FormField } from "@/lib/form-generator/types/field-types";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  id?: string;
  label?: string;
  fields: FormField[];
  value: any[];
  onChange: (val: any[]) => void;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
};

export function SubformInput({
  id,
  label,
  fields,
  value = [],
  onChange,
  minRows = 0,
  maxRows = Infinity,
  disabled,
}: Props) {
  const handleChange = (index: number, fieldId: string, fieldValue: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [fieldId]: fieldValue };
    onChange(updated);
  };

  const addRow = () => {
    if (value.length >= maxRows) return;
    onChange([...value, {}]);
  };

  const removeRow = (index: number) => {
    if (value.length <= minRows) return;
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {/* {label && <Label htmlFor={id}>{label}</Label>} */}
      <div className="space-y-4">
        {value.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-end gap-2 border rounded-md p-4 bg-muted/10 relative overflow-x-auto scrollbar-thin"
          >
            
            <div className="flex gap-4 min-w-fit">
              {fields.map((field) => (
                <div key={field.id} className="min-w-[200px]">
                  <FieldRenderer
                    field={field}
                    value={row?.[field.id]}
                    onChange={(val) => handleChange(rowIndex, field.id, val)}
                    disabled={disabled}
                  />
                </div>
              ))}
            </div>
            {!disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeRow(rowIndex)}
                  disabled={value.length <= minRows}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              
          </div>
        ))}
      </div>

      {!disabled && value.length < maxRows && (
        <Button
          type="button"
          onClick={addRow}
          variant="outline"
          size="sm"
          className="mt-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      )}
    </div>
  );
}
