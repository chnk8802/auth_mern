"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { FieldRenderer } from "@/lib/form-generator/components/FormView/FieldRendrer";
import { type ModuleField } from "@/lib/form-generator/types/field-types";
import { Label } from "../ui/label";

type Props = {
  field: Record<string, any>;
  value: any[];
  onChange: (val: any[]) => void;
  disabled?: boolean;
};

export function SubformInputGrid({
  field,
  value = [],
  onChange,
  disabled,
}: Props) {
  const handleChange = (index: number, fieldId: string, fieldValue: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [fieldId]: fieldValue };
    onChange(updated);
  };

  const addRow = () => {
    if (value.length >= field.maxRows) return;
    onChange([...value, {}]);
  };

  const removeRow = (index: number) => {
    if (value.length <= field.minRows) return;
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {/* Optional label */}
      {field.label && (
        <Label
          htmlFor={field.id}
          className="block text-sm font-medium text-muted-foreground"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {/* Hidden input for HTML validation */}
      {field.required && (
        <input
          type="text"
          name={field.id}
          value={value.length > 0 ? "valid" : ""}
          required
          hidden
          readOnly
        />
      )}

      {/* Rows */}
      <div className="space-y-4">
        {value.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No rows added yet. Click "Add Row" to start.
          </div>
        )}

        {value.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="relative border rounded-md p-4 bg-muted/10"
          >
            {field.layout === "row" ? (
              // Existing horizontal scrollable layout
              <div className="flex gap-4 min-w-fit overflow-x-auto scrollbar-thin">
                {field.fields.map((f: ModuleField) => (
                  <div key={f.id} className="min-w-[200px]">
                    <FieldRenderer
                      field={f}
                      value={row?.[f.id]}
                      onChange={(val) => handleChange(rowIndex, f.id, val)}
                      disabled={disabled}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // New grid layout (2 columns)
              <div className="grid grid-cols-2 gap-4">
                {field.fields.map((f: ModuleField) => (
                  <FieldRenderer
                    key={f.id}
                    field={f}
                    value={row?.[f.id]}
                    onChange={(val) => handleChange(rowIndex, f.id, val)}
                    disabled={disabled}
                  />
                ))}
              </div>
            )}

            {!disabled && (
              <Button
                type="button"
                variant="destructive"
               
                onClick={() => removeRow(rowIndex)}
                disabled={value.length <= field.minRows}
                className="absolute top-2 right-2"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Add Row Button */}
      {!disabled && value.length < field.maxRows && (
        <Button type="button" onClick={addRow} variant="outline" className="">
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      )}
    </div>
  );
}
