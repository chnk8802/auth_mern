import React from "react";
import { Upload, X } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { FileField } from "@/lib/form-generator/types/field-types";

interface FileInputProps {
  field: FileField;
  value: File[];
  onChange: (files: File[]) => void;
}

export const FileInput: React.FC<FileInputProps> = ({
  field,
  value,
  onChange,
}) => {
  // Set allowed file types
  const acceptedTypes =
    field.fileType === "pdf" ? "application/pdf" : "image/png, image/jpeg, image/jpg";

  return (
    <div className="space-y-2">
      {field.label && (
        <Label htmlFor={field.id} className="text-sm font-medium">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </Label>
      )}

      {/* Upload section */}
      {(!value || value.length === 0) && (
        <div
          className={cn(
            "flex justify-between items-center gap-2 border border-input shadow-xs rounded-md dark:bg-muted/40",
            field.disabled && "opacity-60 cursor-not-allowed"
          )}
        >
          {/* Hidden native input */}
          <input
            id={field.id}
            type="file"
            accept={acceptedTypes} // NEW
            className="hidden"
            onChange={(e) =>
              onChange(e.target.files ? Array.from(e.target.files) : [])
            }
            required={field.required}
            disabled={field.disabled}
          />
          
          <span className="text-sm p-2">Choose File</span>
          <Label
            htmlFor={field.id}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md border-input cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors",
              field.disabled && "pointer-events-none"
            )}
          >
            <Upload className="w-5 h-5" />
          </Label>
        </div>
      )}

      {/* Selected files display */}
      {value && value.length > 0 && (
        <div className="flex items-center justify-between border border-input rounded-md bg-background p-2">
          <span className="text-sm truncate text-muted-foreground">
            {value.map((file) => file.name).join(", ")}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange([])}
            className="h-4 w-4 p-0 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
